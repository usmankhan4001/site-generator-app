import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
try {
  execSync('npx tsc --noEmit 2>&1', { timeout: 90000 });
  writeFileSync('_tsc-result.txt', 'NO_ERRORS');
} catch (e) {
  writeFileSync('_tsc-result.txt', (e.stdout || Buffer.alloc(0)).toString());
}
