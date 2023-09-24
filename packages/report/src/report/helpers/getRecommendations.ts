import { allRules, Severity } from '@sls-mentor/rules';
import { Recommendation } from '../types';
import { PassingResourcesByRule } from '@sls-mentor/core';

const severityToMultiplier: Record<Severity, number> = {
  low: 1,
  medium: 3,
  high: 5,
  critical: 10,
};

const getRuleImportanceLevel = (
  failingResources: number,
  easyToFix: boolean,
  severity: Severity,
): number => {
  const multiplier = severityToMultiplier[severity];

  return failingResources * multiplier * (easyToFix ? 1.5 : 1);
};

export const getRecommendations = (
  results: PassingResourcesByRule,
): Recommendation[] => {
  const mappedResults = Object.entries(results).map(
    ([ruleName, { passingResourcesAmount, totalResourcesAmount }]) => {
      const failingResources = totalResourcesAmount - passingResourcesAmount;
      const rule = allRules.find(({ fileName }) => fileName === ruleName);

      if (rule === undefined) {
        throw new Error('Unexpected ruleName encountered');
      }

      const { service, easyToFix, severity } = rule;

      const ruleImportanceLevel = getRuleImportanceLevel(
        failingResources,
        easyToFix,
        severity,
      );

      return {
        ruleName,
        service,
        tags: [severity, ...(easyToFix ? ['quick-fix' as const] : [])],
        importance: ruleImportanceLevel,
      };
    },
  );

  return mappedResults
    .filter(({ importance }) => importance > 0)
    .sort(
      ({ importance: importanceA }, { importance: importanceB }) =>
        importanceB - importanceA,
    )
    .slice(0, 3);
};
