import { CustomARN, S3BucketARN } from '@sls-mentor/arn';
import { fetchAllS3BucketSizes } from '@sls-mentor/aws-api';

import { S3BucketConfigurationStats, S3BucketStats } from './types';

const mapConfigurationStats = (
  s3BucketConfiguration: Awaited<
    ReturnType<typeof fetchAllS3BucketSizes>
  >[number]['policy'],
): S3BucketConfigurationStats | undefined => {
  if (
    s3BucketConfiguration === undefined ||
    s3BucketConfiguration[0] === undefined
  ) {
    return undefined;
  }
  const { Average } = s3BucketConfiguration[0];

  if (Average === undefined) {
    return undefined;
  }

  return {
    size: Average,
  };
};

export const getDynamoDBTableNodes = async (
  arns: CustomARN[],
): Promise<
  Record<
    string,
    {
      arn: S3BucketARN;
      stats: S3BucketStats;
    }
  >
> => {
  const tableConfigurations = await fetchAllS3BucketSizes(arns);

  return Object.fromEntries(
    tableConfigurations.map(({ arn, policy }) => {
      return [
        arn.toString(),
        {
          arn,
          stats: {
            configuration: mapConfigurationStats(policy),
          },
        },
      ];
    }),
  );
};
