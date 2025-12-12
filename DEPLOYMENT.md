# Deployment Guide

## Cloud Execution Server Setup

### Option 1: Deploy to Netlify (Recommended - Already Set Up!)

The code execution function is already set up at `netlify/functions/execute.ts`.

**Deployment:**
1. Push code to GitHub/GitLab
2. Connect to Netlify
3. Deploy automatically

**Usage:**
- The function is available at: `/.netlify/functions/execute`
- The component automatically detects if running on Netlify

### Option 2: Deploy Standalone Server

**Using Heroku:**
```bash
cd server_executor
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

**Using Railway:**
```bash
cd server_executor
railway init
railway up
```

**Using Render:**
1. Connect GitHub repo
2. Set root directory to `server_executor`
3. Build command: `npm install`
4. Start command: `npm start`

**Update Component:**
After deployment, update the server URL in `ApiTestButton.tsx`:
```typescript
const serverUrl = 'https://your-server-url.com/api/execute';
```

### Option 3: Deploy to Vercel

Create `api/execute.js`:
```javascript
export default async function handler(req, res) {
  // Similar to Netlify function implementation
}
```

---

## Extension Deployment

### Chrome Web Store

1. **Prepare Extension:**
   - Add icons (16x16, 48x48, 128x128 PNG)
   - Update manifest.json with proper permissions
   - Test thoroughly

2. **Create Zip:**
   ```bash
   cd extension_no_native
   zip -r ../extension.zip .
   ```

3. **Submit to Chrome Web Store:**
   - Go to Chrome Web Store Developer Dashboard
   - Upload zip file
   - Fill out store listing
   - Submit for review

### Edge Add-ons

1. Same process as Chrome
2. Submit to Microsoft Edge Add-ons store

---

## Environment Variables

For cloud execution server, you may want to add:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (production/development)
- `MAX_EXECUTION_TIME` - Max code execution time in ms

---

## Security Considerations

⚠️ **Important Security Notes:**

1. **Code Execution Server:**
   - Set timeout limits (already set to 10 seconds)
   - Rate limit requests
   - Validate/sanitize input
   - Use sandboxed environment if possible
   - Monitor for abuse

2. **Extension:**
   - Only load from trusted sources
   - Review permissions requested
   - Regular security updates

3. **CORS:**
   - Configure CORS properly on server
   - Only allow trusted origins

---

## Testing Deployment

1. **Test Netlify Function:**
   ```bash
   npm run dev  # Starts Netlify dev server
   # Test at http://localhost:8888/.netlify/functions/execute
   ```

2. **Test Standalone Server:**
   ```bash
   cd server_executor
   npm start
   # Test at http://localhost:3001/api/execute
   ```

3. **Test Extension:**
   - Load unpacked extension
   - Test on your deployed site

---

## Monitoring

Monitor your execution server:
- Log all executions
- Track error rates
- Monitor resource usage
- Set up alerts for unusual activity

