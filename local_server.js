const WebSocket = require('ws');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const PORT = 8765;
const wss = new WebSocket.Server({ port: PORT });

console.log('========================================');
console.log('JavaScript Runner Server');
console.log(`WebSocket server started on ws://localhost:${PORT}`);
console.log('Waiting for connections...');
console.log('========================================\n');

wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    console.log(`[${new Date().toLocaleTimeString()}] Client connected from ${clientIP}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            if (data.action === 'execute' && data.code) {
                const code = data.code;
                const tempFile = path.join(os.tmpdir(), `execute_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.js`);

                console.log(`[${new Date().toLocaleTimeString()}] Executing code...`);

                try {
                    // Write code to temp file
                    fs.writeFileSync(tempFile, code, 'utf8');
                    
                    // Execute with Node.js
                    const output = execSync(`node "${tempFile}"`, {
                        encoding: 'utf8',
                        timeout: 30000, // 30 second timeout
                        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
                    });

                    console.log(`[${new Date().toLocaleTimeString()}] Execution successful`);

                    // Send result back
                    ws.send(JSON.stringify({
                        success: true,
                        output: output.toString()
                    }));

                } catch (error) {
                    console.error(`[${new Date().toLocaleTimeString()}] Execution error:`, error.message);
                    
                    // Send error back
                    const errorOutput = error.message + 
                        (error.stdout ? '\n--- STDOUT ---\n' + error.stdout : '') + 
                        (error.stderr ? '\n--- STDERR ---\n' + error.stderr : '');
                    
                    ws.send(JSON.stringify({
                        success: false,
                        output: errorOutput
                    }));
                } finally {
                    // Clean up temp file
                    if (fs.existsSync(tempFile)) {
                        fs.unlinkSync(tempFile);
                    }
                }
            } else {
                ws.send(JSON.stringify({
                    success: false,
                    output: 'Invalid request format'
                }));
            }
        } catch (error) {
            console.error(`[${new Date().toLocaleTimeString()}] Parse error:`, error.message);
            ws.send(JSON.stringify({
                success: false,
                output: `Parse error: ${error.message}`
            }));
        }
    });

    ws.on('close', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Client disconnected`);
    });

    ws.on('error', (error) => {
        console.error(`[${new Date().toLocaleTimeString()}] WebSocket error:`, error.message);
    });
});

wss.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
        console.error('Please close the other application using this port or change the port number.\n');
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\nShutting down server...');
    wss.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

