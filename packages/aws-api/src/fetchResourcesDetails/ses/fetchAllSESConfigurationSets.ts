import type { GetConfigurationSetCommandOutput } from '@aws-sdk/client-sesv2';
import { GetConfigurationSetCommand } from '@aws-sdk/client-sesv2';

import { CustomARN, SESConfigurationSetARN } from '@sls-mentor/arn';

import { sesClient } from 'clients';

const fetchSESConfigurationSets = async (
  arn: SESConfigurationSetARN,
): Promise<{
  arn: SESConfigurationSetARN;
  configurationSet: GetConfigurationSetCommandOutput;
}> => ({
  arn,
  configurationSet: await sesClient.send(
    new GetConfigurationSetCommand({
      ConfigurationSetName: arn.getConfigurationSetName(),
    }),
  ),
});

export const fetchAllSESConfigurationSets = async (
  resources: CustomARN[],
): Promise<
  {
    arn: SESConfigurationSetARN;
    configurationSet: GetConfigurationSetCommandOutput;
  }[]
> => {
  const sesArns = CustomARN.filterArns(resources, SESConfigurationSetARN);

  return await Promise.all(sesArns.map(arn => fetchSESConfigurationSets(arn)));
};
