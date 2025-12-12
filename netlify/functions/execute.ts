import type { Handler } from '@netlify/functions';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { code, browserInfo } = body;

    if (!code) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'No code provided' }),
      };
    }

    // Log browser info (optional - you can store in database)
    if (browserInfo) {
      console.log('Browser Info:', browserInfo);
    }

    // Create temporary file
    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `execute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.js`);

    try {
      // Write code to temp file
      fs.writeFileSync(tempFile, code, 'utf8');

      // Execute with Node.js (with timeout for security)
      const { stdout, stderr } = await execAsync(`node "${tempFile}"`, {
        timeout: 10000, // 10 second timeout
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      // Clean up temp file
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          output: stdout || stderr || 'Code executed (no output)',
          browserInfo: browserInfo,
          timestamp: new Date().toISOString(),
        }),
      };
    } catch (error: any) {
      // Clean up on error
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          output: `Error: ${error.message}${error.stderr ? '\n' + error.stderr : ''}`,
          browserInfo: browserInfo,
          timestamp: new Date().toISOString(),
        }),
      };
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        output: `Server error: ${error.message}`,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

