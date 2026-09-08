import { spawn } from 'child_process';
import { writeFileSync, openSync, closeSync } from 'fs';

const fd = openSync('_typecheck.txt', 'w');
const child = spawn('node_modules/.bin/tsc', ['--noEmit', '--pretty', 'false'], {
  stdio: ['ignore', fd, fd],
  detached: true,
  cwd: '.',
});
child.unref();
process.exit(0);
