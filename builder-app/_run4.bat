@echo off
cd /d "%~dp0"
start /b cmd /c "node_modules\.bin\tsc --noEmit --pretty false > _typecheck.txt 2>&1"
timeout /t 90 /nobreak > nul
echo DONE
