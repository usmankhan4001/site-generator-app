@echo off
node run-tsc.mjs
type _tsc-result.txt | more /c
