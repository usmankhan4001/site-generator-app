const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tscBin = path.join('node_modules', 'typescript', 'bin', 'tsc');

const child = spawn('node', [tscBin, '--noEmit', '--pretty', 'false'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  cwd: '.',
});

const results = [];
let allErrorCount = 0;

function processLine(line) {
  if (/error TS\d+/.test(line)) {
    allErrorCount++;
    if (line.includes('OnboardingFlow') || line.includes('CreateFlow')) {
      results.push(line.trim());
    }
  }
}

const rl = readline.createInterface({ input: child.stdout, terminal: false });
rl.on('line', processLine);

const rl2 = readline.createInterface({ input: child.stderr, terminal: false });
rl2.on('line', processLine);

child.on('close', (code) => {
  const output = `Total project errors: ${allErrorCount}\nErrors in target files: ${results.length}\n\n${results.join('\n')}`;
  fs.writeFileSync('_typecheck_result.txt', output);
  // NO console.log - just exit
  process.exit(0);
});

child.on('error', (err) => {
  fs.writeFileSync('_typecheck_result.txt', 'ERROR: ' + err.message);
  process.exit(1);
});

setTimeout(() => {
  fs.writeFileSync('_typecheck_result.txt', 'TIMEOUT after 90s');
  process.exit(1);
}, 90000);
