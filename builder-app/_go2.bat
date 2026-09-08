@echo off
cd /d "%~dp0"
node -e "require('child_process').execSync('npx tsc --noEmit --pretty false',{timeout:90000,stdio:'pipe'})" > _typecheck.txt 2>&1
if %ERRORLEVEL% NEQ 0 (
  node -e "try{require('child_process').execSync('npx tsc --noEmit --pretty false',{timeout:90000,stdio:'pipe'})}catch(e){require('fs').writeFileSync('_typecheck.txt',(e.stdout||'').toString())}"
)
echo DONE
