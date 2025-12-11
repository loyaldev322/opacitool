# JavaScript Execution Methods Setup Guide

This project implements 4 different methods to execute JavaScript code locally from a web browser.

## Prerequisites

- Node.js installed on your local machine
- Modern web browser (Chrome, Edge, Firefox)

---

## Method 1: Custom Protocol Handler ⚡

**Best for:** Permanent setup, Windows users

### Setup:

1. Navigate to `method1_setup` folder
2. Run `setup_method1.bat` (double-click or run as administrator)
3. This will register the `js-run:` protocol handler

### How it works:

- When you click "Method 1" button, it triggers `js-run:encoded-code`
- Windows opens the registered handler (Node.js runner)
- Code is executed locally

### To uninstall:

Run `uninstall_method1.bat`

---

## Method 2: Browser Extension + Native Messaging 🔌

**Best for:** Secure, production-ready solution

### Setup:

1. **Load Extension:**
   - Open Chrome: `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `method2_extension` folder
   - Copy the Extension ID shown

2. **Install Native Host:**
   - Edit `method2_extension/native_host/com.yourcompany.jsrunner.json`
   - Replace `YOUR_EXTENSION_ID_HERE` with your extension ID
   - Update `path` to absolute path of `js_native_host.js`
   - Copy the JSON file to:
     - **Windows:** `%LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts\`
     - **Mac:** `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/`
     - **Linux:** `~/.config/google-chrome/NativeMessagingHosts/`

3. **Reload extension**

### How it works:

- Extension receives message from web page
- Extension forwards to native host via native messaging
- Native host executes code with Node.js
- Results sent back to extension → web page

---

## Method 3: WebSocket Server 🌐

**Best for:** Development, testing, tech-savvy users

### Setup:

1. **Start the server:**
   ```bash
   node local_server.js
   ```

2. **Keep it running** while testing Method 3

3. Server will listen on `ws://localhost:8765`

### How it works:

- Web page connects to local WebSocket server
- Sends JavaScript code to server
- Server executes code with Node.js
- Results sent back via WebSocket

### Note:

Server must be running before using Method 3 button.

---

## Method 4: PowerShell Auto-Execute ⚡

**Best for:** Quick testing on Windows

### Setup:

**No setup required!** Just click the button.

### How it works:

- Downloads JavaScript code
- Uses PowerShell to create temp file
- Executes with Node.js
- Cleans up temp file

### Limitations:

- **Windows only**
- User will see PowerShell security prompt (must allow)
- Requires PowerShell execution policy to allow scripts

### If blocked:

Run PowerShell as administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Testing All Methods

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **For Method 3, start WebSocket server in another terminal:**
   ```bash
   node local_server.js
   ```

3. **Open browser and navigate to your app**

4. **Click each method button to test**

---

## Security Notes

⚠️ **Important:** All methods execute arbitrary JavaScript code on your local machine. Only use with trusted sources!

- Method 1: Requires registry modification (admin rights)
- Method 2: Requires extension and native host installation
- Method 3: Requires local server running (no external security risk)
- Method 4: Uses PowerShell (may trigger security warnings)

---

## Troubleshooting

### Method 1 doesn't work:
- Check if protocol handler is registered: `reg query "HKCU\Software\Classes\js-run"`
- Verify path in registry points to correct `js_runner.js` location
- Run setup script as administrator

### Method 2 doesn't work:
- Check if extension is loaded and enabled
- Verify native host JSON is in correct location
- Check Extension ID matches in JSON file
- Check path in JSON file is correct
- Look for errors in extension console

### Method 3 doesn't work:
- Verify `local_server.js` is running
- Check port 8765 is not in use
- Check firewall isn't blocking localhost connection
- Look for errors in server console

### Method 4 doesn't work:
- Verify you're on Windows
- Check PowerShell execution policy
- Check if Node.js is in PATH
- Try running manually: `node execute.js`

---

## File Structure

```
project/
├── src/
│   └── components/
│       └── ApiTestButton.tsx    # Component with all 4 methods
├── method1_setup/
│   ├── js_runner.js              # Protocol handler runner
│   ├── setup_method1.bat         # Windows setup script
│   └── uninstall_method1.bat     # Uninstall script
├── method2_extension/
│   ├── manifest.json             # Extension manifest
│   ├── background.js             # Extension background script
│   └── native_host/
│       ├── js_native_host.js     # Native host application
│       └── com.yourcompany.jsrunner.json  # Native host manifest
├── local_server.js               # WebSocket server for Method 3
└── METHODS_SETUP.md              # This file
```

