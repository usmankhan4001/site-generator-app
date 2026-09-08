import { writeFileSync, existsSync } from 'fs';

// Use child_process.exec to run tsc in a way that captures all output
const { execSync } = require('child_process');

try {
  const result = execSync(
    'node_modules\\.bin\\tsc --project _tscheck.json --noEmit --pretty false 2>&1',
    { 
      timeout: 90000, 
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
    }
  );
  writeFileSync('_typecheck.txt', 'CLEAN\n' + result);
} catch (e) {
  const stdout = e.stdout || '';
  const stderr = e.stderr || '';
  writeFileSync('_typecheck.txt', stdout + stderr);
}
