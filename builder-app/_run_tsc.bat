@echo off
cd /d "%~dp0"
node_modules\.bin\tsc --project _tscheck.json --noEmit --pretty false > _typecheck.txt 2>&1
echo DONE
