# Quick Start Guide

## Testing JavaScript Execution Methods

### Prerequisites
- Node.js installed
- Modern web browser

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Test Each Method

#### Method 1: Protocol Handler (One-time setup)
1. Navigate to `method1_setup` folder
2. Run `setup_method1.bat` (Windows)
3. Click "Method 1" button in the web app

#### Method 2: Browser Extension
1. Load extension from `method2_extension` folder (see setup instructions)
2. Click "Method 2" button

#### Method 3: WebSocket Server (Recommended for testing)
1. In a separate terminal, run:
   ```bash
   npm run server
   ```
2. Keep server running
3. Click "Method 3" button

#### Method 4: PowerShell (Windows only, no setup)
1. Just click "Method 4" button
2. Allow PowerShell execution when prompted

---

## Quick Test

The fastest way to test:

1. **Start WebSocket server:**
   ```bash
   npm run server
   ```

2. **Start dev server (in another terminal):**
   ```bash
   npm run dev
   ```

3. **Open browser** and click "Method 3: WebSocket Server"

That's it! No additional setup needed.

---

## What Happens?

When you click a method button:
1. Fetches JavaScript code from `https://nest-react.netlify.app/api`
2. Executes the code locally using Node.js
3. Shows results in alert/console

See `METHODS_SETUP.md` for detailed setup instructions.

