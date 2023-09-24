import {
  FunctionConfiguration,
  ListVersionsByFunctionCommand,
} from '@aws-sdk/client-lambda';

import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

const fetchLambdaVersionsByArn = async (
  arn: LambdaFunctionARN,
): Promise<FunctionConfiguration[]> => {
  const { Versions: versions } = await lambdaClient.send(
    new ListVersionsByFunctionCommand({ FunctionName: arn.getFunctionName() }),
  );

  return versions ?? [];
};

export const fetchAllLambdaVersions = async (
  resources: CustomARN[],
): Promise<{ arn: LambdaFunctionARN; versions: FunctionConfiguration[] }[]> => {
  const lambdaResources = CustomARN.filterArns(resources, LambdaFunctionARN);

  const lambdaVersions = await Promise.all(
    lambdaResources.map(async arn => ({
      arn,
      versions: await fetchLambdaVersionsByArn(arn),
    })),
  );

  return lambdaVersions;
};
