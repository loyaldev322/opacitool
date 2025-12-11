const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// Native Messaging Protocol Implementation
// Messages are JSON objects prefixed with 32-bit length (little-endian)

const readMessage = () => {
    const stdin = process.stdin;
    
    // Read 4 bytes for length
    const lengthBuffer = stdin.read(4);
    if (!lengthBuffer || lengthBuffer.length !== 4) {
        return null;
    }
    
    const length = lengthBuffer.readUInt32LE(0);
    
    // Read the message
    const messageBuffer = stdin.read(length);
    if (!messageBuffer || messageBuffer.length !== length) {
        return null;
    }
    
    return JSON.parse(messageBuffer.toString('utf8'));
};

const sendMessage = (message) => {
    const json = JSON.stringify(message);
    const jsonBuffer = Buffer.from(json, 'utf8');
    const lengthBuffer = Buffer.allocUnsafe(4);
    lengthBuffer.writeUInt32LE(jsonBuffer.length, 0);
    
    process.stdout.write(lengthBuffer);
    process.stdout.write(jsonBuffer);
};

// Main message loop
process.stdin.on('readable', () => {
    const message = readMessage();
    if (message && message.code) {
        const code = message.code;
        const tempFile = path.join(os.tmpdir(), `execute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.js`);
        
        try {
            // Write code to temp file
            fs.writeFileSync(tempFile, code, 'utf8');
            
            // Execute with Node.js
            const output = execSync(`node "${tempFile}"`, { 
                encoding: 'utf8',
                timeout: 30000 // 30 second timeout
            });
            
            // Send success response
            sendMessage({ output: output.toString() });
        } catch (error) {
            // Send error response
            const errorOutput = error.message + 
                (error.stdout ? '\n--- STDOUT ---\n' + error.stdout : '') + 
                (error.stderr ? '\n--- STDERR ---\n' + error.stderr : '');
            sendMessage({ output: `Error: ${errorOutput}` });
        } finally {
            // Clean up temp file
            if (fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile);
            }
        }
    }
});

// Handle errors
process.stdin.on('error', (error) => {
    process.stderr.write(`Native host error: ${error.message}\n`);
});

