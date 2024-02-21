import {
  paginateGetResources,
  ResourceGroupsTaggingAPIClient,
  ResourceTagMapping,
  Tag,
} from '@aws-sdk/client-resource-groups-tagging-api';

import { CustomARN } from '@sls-mentor/arn';

export const listAllResourcesFromTags = async (
  tagsToFilter: {
    Key?: string;
    Value?: string;
  }[],
): Promise<{ arn: CustomARN; tags: Tag[] }[]> => {
  const tagClient = new ResourceGroupsTaggingAPIClient({});

  const taggedResources: ResourceTagMapping[] = [];
  for await (const page of paginateGetResources(
    { client: tagClient },
    {
      TagFilters:
        tagsToFilter.length > 0
          ? tagsToFilter.map(({ Key, Value }) => {
              return { Key, Values: [Value ?? ''] };
            })
          : undefined,
    },
  )) {
    taggedResources.push(...(page.ResourceTagMappingList ?? []));
  }

  return taggedResources
    .map(({ ResourceARN, Tags }) => ({
      arn: ResourceARN,
      tags: Tags,
    }))
    .filter(
      (
        resourceArn,
      ): resourceArn is {
        arn: string;
        tags: Tag[];
      } => resourceArn.arn !== undefined && resourceArn.tags !== undefined,
    )
    .map(({ arn, tags }) => ({ arn: CustomARN.fromArnString(arn), tags }))
    .filter(
      (resource): resource is { arn: CustomARN; tags: Tag[] } =>
        resource.arn !== undefined,
    );
};
