const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outFd = fs.openSync('_typecheck.txt', 'w');
const errFd = fs.openSync('_typecheck_err.txt', 'w');

const child = spawn(path.join('node_modules', '.bin', 'tsc'), 
  ['--project', '_tscheck.json', '--noEmit', '--pretty', 'false'], {
  stdio: ['ignore', outFd, errFd],
  detached: true,
  cwd: '.',
});

child.unref();
fs.closeSync(outFd);
fs.closeSync(errFd);

// Write PID so we can check later
fs.writeFileSync('_tsc_pid.txt', String(child.pid));
console.log('Launched tsc with PID ' + child.pid);
