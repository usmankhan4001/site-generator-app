@echo off
cd /d "D:\GCC Startup\Airwallex-Cloner-Package\builder-app"
npx tsc --noEmit > _tsc-result.txt 2>&1
echo DONE
