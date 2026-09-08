@echo off
cd /d "%~dp0"
start "" /b cmd /c "node_modules\.bin\tsc --noEmit --pretty false 1>_typecheck.txt 2>&1"
