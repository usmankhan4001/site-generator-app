@echo off
setlocal
cd /d "%~dp0"
set "PATH=%cd%\node_modules\.bin;%PATH%"
tsc --noEmit --pretty false > _typecheck.txt 2>&1
echo EXITCODE=%ERRORLEVEL% >> _typecheck.txt
