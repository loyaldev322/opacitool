# Method 2 Setup Instructions

## Step 1: Get Extension ID

1. Load the extension in Chrome (chrome://extensions/)
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `method2_extension` folder
4. Copy the Extension ID (you'll need this)

## Step 2: Update Extension ID

1. Edit `method2_extension/native_host/com.yourcompany.jsrunner.json`
2. Replace `YOUR_EXTENSION_ID_HERE` with your actual extension ID
3. Update the `path` to the absolute path of `js_native_host.js`

## Step 3: Install Native Host

### Windows:

1. Create directory: `%LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts\`
2. Copy `com.yourcompany.jsrunner.json` to that directory
3. Update the path in the JSON file to point to `js_native_host.js`

### Alternative (Auto-install script):

```batch
@echo off
set EXTENSION_DIR=%~dp0
set HOST_DIR=%LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts
mkdir "%HOST_DIR%" 2>nul
copy "%EXTENSION_DIR%native_host\com.yourcompany.jsrunner.json" "%HOST_DIR%"
echo Native host installed! Update the path in the JSON file.
pause
```

## Step 4: Test

1. Reload the extension
2. Try Method 2 from the web interface

