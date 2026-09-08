const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const tscBin = path.join('node_modules', 'typescript', 'bin', 'tsc');

const child = spawn('node', [tscBin, '--noEmit', '--pretty', 'false'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  cwd: '.',
});

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => { stdout += data.toString(); });
child.stderr.on('data', (data) => { stderr += data.toString(); });

child.on('close', (code) => {
  fs.writeFileSync('_typecheck_full.txt', stdout);
  fs.writeFileSync('_typecheck_full_err.txt', stderr);
  fs.writeFileSync('_tsc_exit_code.txt', String(code));
  console.log('DONE code=' + code + ' stdout=' + stdout.length + ' stderr=' + stderr.length);
});

child.on('error', (err) => {
  fs.writeFileSync('_typecheck_full.txt', 'ERROR: ' + err.message);
  console.log('ERROR: ' + err.message);
});
