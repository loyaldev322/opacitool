# Method 2: Browser Extension Setup

## Quick Setup

1. **Load Extension:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `method2_extension` folder
   - **Copy the Extension ID** (you'll need this!)

2. **Install Native Host:**
   - Edit `native_host/com.yourcompany.jsrunner.json`
   - Replace `YOUR_EXTENSION_ID_HERE` with your Extension ID
   - Update the `path` to the **absolute path** of `js_native_host.js`
     - Example: `C:\\Users\\YourName\\projects\\opacitool\\method2_extension\\native_host\\js_native_host.js`
   - Copy the JSON file to:
     - **Windows:** `%LOCALAPPDATA%\\Google\\Chrome\\User Data\\NativeMessagingHosts\\`
     - **Mac:** `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/`
     - **Linux:** `~/.config/google-chrome/NativeMessagingHosts/`

3. **Test:**
   - Reload the extension
   - Go to your web app and click "Method 2: Browser Extension"

## Creating Icons (Optional)

If you want icons for the extension, create these files:
- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

Or use any PNG files - the extension will work without them.

## Troubleshooting

- **"Native host not found"**: Check that the JSON file is in the correct NativeMessagingHosts folder
- **"Extension ID mismatch"**: Make sure the Extension ID in the JSON matches your actual extension ID
- **"Path not found"**: Verify the absolute path in the JSON file is correct and uses double backslashes (`\\`)

