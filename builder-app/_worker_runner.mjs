import { Worker } from 'worker_threads';
import { writeFileSync } from 'fs';
import { join } from 'path';

const script = `
const ts = require('typescript');
const path = require('path');
const fs = require('fs');

const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');

const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);

const results = diagnostics
  .filter(d => d.file && (d.file.fileName.includes('OnboardingFlow') || d.file.fileName.includes('CreateFlow')))
  .map(d => {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, '\\n');
    if (d.file && d.start !== undefined) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
      return d.file.fileName + '(' + (line+1) + ',' + (character+1) + '): error TS' + d.code + ': ' + msg;
    }
    return 'error TS' + d.code + ': ' + msg;
  });

const allCount = diagnostics.length;
const targetCount = results.length;
fs.writeFileSync('_typecheck.txt', 'Total project errors: ' + allCount + '\\nErrors in target files: ' + targetCount + '\\n\\n' + results.join('\\n'));
process.exit(0);
`;

writeFileSync('_worker.js', script);

const worker = new Worker('_worker.js', { eval: true, cwd: process.cwd() });
worker.on('message', () => {});
worker.on('error', (e) => {
  writeFileSync('_typecheck.txt', 'Worker error: ' + e.message);
  process.exit(1);
});
worker.on('exit', (code) => {
  if (code !== 0) {
    writeFileSync('_typecheck.txt', 'Worker exited with code ' + code);
  }
});

// Timeout after 80 seconds
setTimeout(() => {
  writeFileSync('_typecheck.txt', 'TIMEOUT');
  process.exit(1);
}, 80000);
