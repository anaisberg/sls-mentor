import { Construct } from 'constructs';

import { enableReputationMetrics as enableReputationMetricsRule } from '@sls-mentor/rules';

import { DefaultConfigurationSet } from '../defaultConstructs';

type EnableReputationMetricsProps = {
  enableReputationMetrics: boolean;
};

export class EnableReputationMetrics extends Construct {
  static passTestCases: Record<string, EnableReputationMetricsProps> = {
    Enabled: {
      enableReputationMetrics: true,
    },
  };
  static failTestCases: Record<string, EnableReputationMetricsProps> = {
    'Not enabled': { enableReputationMetrics: false },
  };

  constructor(
    scope: Construct,
    id: string,
    { enableReputationMetrics }: EnableReputationMetricsProps,
  ) {
    super(scope, id);
    const configSet = new DefaultConfigurationSet(this, 'ConfigurationSet', {
      reputationMetrics: enableReputationMetrics,
    });
    configSet.tagRule(enableReputationMetricsRule);
  }
}
