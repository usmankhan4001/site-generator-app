import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const tsc = join('node_modules', '.bin', 'tsc');
if (!existsSync(tsc)) {
  writeFileSync('_typecheck.txt', 'tsc binary not found at ' + tsc);
  process.exit(0);
}

try {
  execFileSync(tsc, ['--noEmit', '--pretty', 'false'], {
    timeout: 90000,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  writeFileSync('_typecheck.txt', 'CLEAN');
} catch (e) {
  const raw = (e.stdout || '') + (e.stderr || '');
  const lines = raw.split('\n');
  const filtered = lines.filter(l =>
    l.includes('OnboardingFlow') || l.includes('CreateFlow')
  );
  const allErrors = lines.filter(l => /error TS\d+/.test(l));
  const header = `Total TS errors: ${allErrors.length}\n`;
  const body = filtered.length
    ? `Errors in target files:\n${filtered.join('\n')}`
    : `\nFirst 40 errors:\n${allErrors.slice(0, 40).join('\n')}`;
  writeFileSync('_typecheck.txt', header + body);
}
