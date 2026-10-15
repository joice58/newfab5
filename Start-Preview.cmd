@echo off
cd /d "%~dp0"
echo Starting Repose Residence...
echo Your browser will open automatically when the server is ready.
echo Keep this window open while you view the website.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js and run this launcher again.
  pause
  exit /b 1
)
node "%~dp0preview-server.cjs" --open
pause
