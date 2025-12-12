# JavaScript Code Runner Extension

A browser extension that executes JavaScript code from web pages. **No native host required** - runs entirely in the browser!

## Installation

### Option 1: Load Unpacked (Development)

1. Open Chrome/Edge: `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `extension_no_native` folder
5. Done! Extension is now active

### Option 2: Chrome Web Store (Production)

1. Zip the `extension_no_native` folder
2. Go to Chrome Web Store Developer Dashboard
3. Upload the extension
4. Publish

## How It Works

1. **Content Script** injects `window.jsRunnerExtension` into every page
2. **Background Script** receives execution requests
3. Code is executed in extension context (more permissions than regular page)
4. Results are sent back to the page

## Usage

From any web page:

```javascript
// Check if extension is available
if (window.jsRunnerExtension) {
  // Execute code
  const result = await window.jsRunnerExtension.execute('console.log("Hello!"); 2 + 2');
  console.log(result); // "4"
}
```

## Permissions

- `activeTab`: Access to current tab
- `storage`: Store settings
- `scripting`: Inject scripts if needed
- `host_permissions`: Access to specified domains

## Security

⚠️ **Warning:** This extension executes arbitrary JavaScript code. Only install from trusted sources!

The extension runs code in its own context, which has more permissions than regular web pages, but still cannot:
- Access file system directly
- Run system commands
- Access other browser tabs (without explicit permission)

## Files

- `manifest.json` - Extension configuration
- `background.js` - Service worker (runs in background)
- `content.js` - Content script (runs on every page)
- `popup.html/js` - Extension popup UI

## Testing

1. Load the extension
2. Visit your web app
3. Check browser console for `window.jsRunnerExtension`
4. Try executing code from your app

