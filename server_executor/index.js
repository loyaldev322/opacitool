// Cloud-based code execution server
// This runs on your cloud backend and executes JavaScript code server-side

const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const os = require('os');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint to execute JavaScript code
app.post('/api/execute', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // Create temporary file
  const tempFile = path.join(os.tmpdir(), `execute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.js`);

  try {
    // Write code to temp file
    fs.writeFileSync(tempFile, code, 'utf8');

    // Execute with Node.js (with timeout)
    const { stdout, stderr } = await execAsync(`node "${tempFile}"`, {
      timeout: 10000, // 10 second timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });

    // Clean up
    fs.unlinkSync(tempFile);

    res.json({
      success: true,
      output: stdout || stderr || 'Code executed (no output)',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Clean up on error
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    res.json({
      success: false,
      output: `Error: ${error.message}`,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint to collect browser info and execute
app.post('/api/execute-with-info', async (req, res) => {
  const { code, browserInfo } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // Log browser info (can store in database)
  console.log('Browser Info:', browserInfo);

  // Execute code (same as above)
  const tempFile = path.join(os.tmpdir(), `execute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.js`);

  try {
    fs.writeFileSync(tempFile, code, 'utf8');
    const { stdout, stderr } = await execAsync(`node "${tempFile}"`, {
      timeout: 10000,
      maxBuffer: 1024 * 1024 * 10
    });

    fs.unlinkSync(tempFile);

    res.json({
      success: true,
      output: stdout || stderr || 'Code executed (no output)',
      browserInfo: browserInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    res.json({
      success: false,
      output: `Error: ${error.message}`,
      browserInfo: browserInfo,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Code execution server running on port ${PORT}`);
});

