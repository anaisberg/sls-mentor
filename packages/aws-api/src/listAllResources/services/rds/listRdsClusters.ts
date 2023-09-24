import { DBCluster, paginateDescribeDBClusters } from '@aws-sdk/client-rds';

import { RdsClusterARN } from '@sls-mentor/arn';

import { rdsClient } from 'clients';

export const listRdsClusters = async (): Promise<RdsClusterARN[]> => {
  const rdsClusters: DBCluster[] = [];
  for await (const resources of paginateDescribeDBClusters(
    { client: rdsClient },
    {},
  )) {
    rdsClusters.push(...(resources.DBClusters ?? []));
  }

  return rdsClusters
    .map(({ DBClusterIdentifier }) => DBClusterIdentifier)
    .filter(
      (DBClusterIdentifier): DBClusterIdentifier is string =>
        DBClusterIdentifier !== undefined,
    )
    .map(RdsClusterARN.fromRdsClusterName);
};
