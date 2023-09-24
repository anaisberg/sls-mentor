import {
  GetPublicAccessBlockCommand,
  PublicAccessBlockConfiguration,
} from '@aws-sdk/client-s3';

import { CustomARN, S3BucketARN } from '@sls-mentor/arn';

import { s3Client } from 'clients';

export const fetchAllPublicAccessBlockConfiguration = async (
  resources: CustomARN[],
): Promise<
  {
    arn: S3BucketARN;
    configuration: PublicAccessBlockConfiguration | undefined;
  }[]
> => {
  const bucketsRessources = CustomARN.filterArns(resources, S3BucketARN);

  return await Promise.all(
    bucketsRessources.map(arn => fetchPublicAccesBlockByArn(arn)),
  );
};

export const fetchPublicAccesBlockByArn = async (
  arn: S3BucketARN,
): Promise<{
  arn: S3BucketARN;
  configuration: PublicAccessBlockConfiguration | undefined;
}> => {
  try {
    const command = new GetPublicAccessBlockCommand({
      Bucket: arn.resource,
    });
    const response = await s3Client.send(command);

    return {
      arn,
      configuration: response.PublicAccessBlockConfiguration,
    };
  } catch (error) {
    return {
      arn,
      configuration: undefined,
    };
  }
};
