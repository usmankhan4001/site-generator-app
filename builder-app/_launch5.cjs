const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const tscBin = path.join('node_modules', 'typescript', 'bin', 'tsc');
const outFd = fs.openSync('_typecheck_full.txt', 'w');
const errFd = fs.openSync('_typecheck_full_err.txt', 'w');

const child = spawn('node', [tscBin, '--noEmit', '--pretty', 'false'], {
  stdio: ['ignore', outFd, errFd],
  detached: true,
  cwd: '.',
});

child.unref();
fs.closeSync(outFd);
fs.closeSync(errFd);
fs.writeFileSync('_tsc_full_pid.txt', String(child.pid));
console.log('Launched tsc PID=' + child.pid);
