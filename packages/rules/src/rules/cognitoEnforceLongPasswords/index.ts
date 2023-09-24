import { fetchAllUserPoolConfigurations } from '@sls-mentor/aws-api';

import { Rule } from '../../types';

const enforcesLongPasswords = (
  userPool: Awaited<
    ReturnType<typeof fetchAllUserPoolConfigurations>
  >[number]['configuration'],
): boolean => {
  const passwordPolicy = userPool.Policies?.PasswordPolicy;
  const minimalPasswordLength = passwordPolicy?.MinimumLength ?? 0;

  return minimalPasswordLength >= 10;
};

const run: Rule['run'] = async resourceArns => {
  const userPools = await fetchAllUserPoolConfigurations(resourceArns);

  const results = userPools.map(({ arn, configuration }) => ({
    arn,
    success: enforcesLongPasswords(configuration),
  }));

  return { results };
};

export const cognitoEnforceLongPasswords: Rule = {
  ruleName: 'User Pools enforce passwords of at least 10 characters',
  errorMessage:
    'This User Pool does not enforce passwords of at least 10 characters',
  run,
  fileName: 'cognitoEnforceLongPasswords',
  categories: ['Security'],
  level: 3,
  service: 'Cognito',
  easyToFix: true,
  severity: 'high',
};
