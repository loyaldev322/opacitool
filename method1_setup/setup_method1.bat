@echo off
echo Setting up Method 1: Custom Protocol Handler
echo.

REM Get the current directory (where this script is located)
set SCRIPT_DIR=%~dp0
set RUNNER_PATH=%SCRIPT_DIR%js_runner.js

REM Convert to absolute path with forward slashes for registry
for %%F in ("%RUNNER_PATH%") do set RUNNER_PATH=%%~fF
set RUNNER_PATH=%RUNNER_PATH:\=/%
set RUNNER_PATH=%RUNNER_PATH:/=\%

echo Runner path: %RUNNER_PATH%
echo.

REM Register protocol handler
echo Registering js-run: protocol...
reg add "HKCU\Software\Classes\js-run" /ve /d "URL:JavaScript Runner" /f
reg add "HKCU\Software\Classes\js-run" /v "URL Protocol" /d "" /f
reg add "HKCU\Software\Classes\js-run\DefaultIcon" /ve /d "node.exe" /f
reg add "HKCU\Software\Classes\js-run\shell\open\command" /ve /d "node \"%RUNNER_PATH%\" \"%%1\"" /f

echo.
echo Setup complete!
echo You can now use Method 1 from the web interface.
echo.
pause

