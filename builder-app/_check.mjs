import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe', timeout: 90000 });
  writeFileSync('_tsc-result.txt', 'NO_ERRORS');
} catch (e) {
  const out = (e.stdout || '').toString();
  const lines = out.split('\n').filter(l => l.trim());
  const filtered = lines.filter(l =>
    l.includes('OnboardingFlow') || l.includes('CreateFlow')
  );
  const allErrors = lines.filter(l => l.includes('error TS'));
  const header = `Total errors: ${allErrors.length}\n`;
  const body = filtered.length
    ? `Errors in target files:\n${filtered.join('\n')}`
    : allErrors.slice(0, 30).join('\n');
  writeFileSync('_tsc-result.txt', header + body);
}
