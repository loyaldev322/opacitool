@echo off
echo Uninstalling Method 1: Custom Protocol Handler
echo.

REM Remove protocol handler from registry
reg delete "HKCU\Software\Classes\js-run" /f

echo.
echo Uninstall complete!
echo.
pause

