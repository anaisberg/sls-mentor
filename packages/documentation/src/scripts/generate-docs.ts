import fs from 'fs';
import path from 'path';

import { allRules } from '@sls-mentor/rules';

if (fs.existsSync(path.join(__dirname, '../../docs/rules'))) {
  fs.rmSync(path.join(__dirname, '../../docs/rules'), { recursive: true });
}

fs.mkdirSync(path.join(__dirname, '../../docs/rules'));

let tableOfRuleNames = `| Rule | Name for configuration file |
  | :- | :- |`;

allRules.forEach(({ fileName, ruleName }) => {
  fs.copyFileSync(
    path.join(__dirname, '../../../rules/src/rules', fileName, 'doc.md'),
    path.join(__dirname, '../../docs/rules', fileName + '.md'),
  );
  tableOfRuleNames = `${tableOfRuleNames}
  | ${ruleName} | ${fileName} |`;
});

const data = fs.readFileSync(
  path.join(__dirname, './templates/configure-sls-mentor.md'),
  'utf-8',
);
const result = data.replace(
  /<!-- Rule table will appear here -->/g,
  tableOfRuleNames,
);
fs.writeFileSync(
  path.join(__dirname, '../../docs/set-up-sls-mentor/configure-sls-mentor.md'),
  result,
  'utf8',
);
