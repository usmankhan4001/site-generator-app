import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
try {
  const result = execFileSync('npx', ['tsc', '--noEmit', '--pretty', 'false'], {
    timeout: 90000,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  writeFileSync('_result.txt', 'CLEAN\n' + result);
} catch (e) {
  writeFileSync('_result.txt', (e.stdout || '') + (e.stderr || ''));
}
