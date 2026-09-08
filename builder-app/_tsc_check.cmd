@echo off
cd /d "%~dp0"
node_modules\.bin\tsc --noEmit --pretty false 1>_typecheck.txt 2>&1
echo %ERRORLEVEL% > _exitcode.txt
