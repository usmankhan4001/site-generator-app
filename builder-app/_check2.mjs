import * as ts from 'typescript';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');

// Override to only check our two files
parsed.fileNames = [
  resolve('src/components/onboarding/OnboardingFlow.tsx'),
  resolve('src/components/dashboard/CreateFlow.tsx'),
];

const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);

const results = diagnostics
  .filter(d => d.file && (d.file.fileName.includes('OnboardingFlow') || d.file.fileName.includes('CreateFlow')))
  .map(d => {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (d.file && d.start !== undefined) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
      return `${d.file.fileName}(${line + 1},${character + 1}): error TS${d.code}: ${msg}`;
    }
    return `error TS${d.code}: ${msg}`;
  });

const allCount = diagnostics.length;
const targetCount = results.length;
writeFileSync('_typecheck.txt', `Total project errors: ${allCount}\nErrors in target files: ${targetCount}\n\n${results.join('\n')}`);
