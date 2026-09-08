import { writeFileSync } from 'fs';
import { execFileSync } from 'child_process';

// Run in a completely separate node process, capturing all output
try {
  execFileSync(process.execPath, ['_worker.js'], {
    timeout: 90000,
    encoding: 'utf8',
    stdio: ['ignore', 'ignore', 'ignore'],
    detached: true,
  });
} catch(e) {
  // Ignore - we just want _typecheck.txt to be written
}

// Wait for file to appear
import { existsSync } from 'fs';
let waited = 0;
while (!existsSync('_typecheck.txt') && waited < 85000) {
  await new Promise(r => setTimeout(r, 1000));
  waited += 1000;
}

if (existsSync('_typecheck.txt')) {
  const content = writeFileSync('_typecheck_done.txt', '1');
} else {
  writeFileSync('_typecheck_done.txt', '0');
}
