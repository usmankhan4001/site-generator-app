import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
try {
  execSync('npx tsc --noEmit --pretty false 2>&1', { timeout: 90000 });
  writeFileSync('_result.txt', 'CLEAN');
} catch (e) {
  const raw = (e.stdout || Buffer.alloc(0)).toString();
  writeFileSync('_result.txt', raw);
}
