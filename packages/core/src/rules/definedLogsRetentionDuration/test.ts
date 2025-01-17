import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { DefaultLogGroup } from '../../../tests/constructs';
import { definedLogsRetentionDuration as DefinedLogsRetentionDurationRule } from './index';

interface DefinedLogsRetentionDurationProps {
  logRetention: RetentionDays;
}

export class DefinedLogsRetentionDuration extends Construct {
  static passTestCases: Record<string, DefinedLogsRetentionDurationProps> = {
    'One month retention': { logRetention: RetentionDays.ONE_MONTH },
  };

  static failTestCases: Record<string, DefinedLogsRetentionDurationProps> = {
    'Infinite retention': { logRetention: RetentionDays.INFINITE },
  };

  constructor(
    scope: Construct,
    id: string,
    { logRetention }: DefinedLogsRetentionDurationProps,
  ) {
    super(scope, id);
    const cloudwatchLogGroup = new DefaultLogGroup(this, 'CloudwatchLogGroup', {
      retention: logRetention,
    });
    cloudwatchLogGroup.tagRule(DefinedLogsRetentionDurationRule);
  }
}
