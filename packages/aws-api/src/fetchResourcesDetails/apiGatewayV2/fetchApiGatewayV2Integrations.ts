import {
  GetIntegrationCommand,
  GetRoutesCommand,
  Route,
} from '@aws-sdk/client-apigatewayv2';

import { ApiGatewayHttpApiARN, CustomARN } from '@sls-mentor/arn';

import { apiGatewayV2Client } from 'clients';

const fetchApiGatewayV2RoutesByArn = async (
  arn: ApiGatewayHttpApiARN,
): Promise<Route[]> => {
  const { Items } = await apiGatewayV2Client.send(
    new GetRoutesCommand({ ApiId: arn.getApiId() }),
  );

  return Items ?? [];
};

export const fetchAllApiGatewayV2Integrations = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: ApiGatewayHttpApiARN;
    targets: {
      uri: string;
      timeoutMs: number;
    }[];
  }[]
> => {
  const apiGatewaysV2 = CustomARN.filterArns(
    resourceArns,
    ApiGatewayHttpApiARN,
  );

  return Promise.all(
    apiGatewaysV2.map(async arn => {
      const routes = await fetchApiGatewayV2RoutesByArn(arn);

      const targets = await Promise.all(
        routes.map(async ({ Target }) => {
          const integration = await apiGatewayV2Client.send(
            new GetIntegrationCommand({
              ApiId: arn.getApiId(),
              IntegrationId: (Target ?? '').split('/')[1],
            }),
          );

          return {
            uri: integration.IntegrationUri ?? '',
            timeoutMs: integration.TimeoutInMillis ?? 0,
          };
        }),
      );

      return {
        arn,
        targets,
      };
    }),
  );
};