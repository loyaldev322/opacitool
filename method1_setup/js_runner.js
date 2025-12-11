const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// Get code from protocol argument
const protocolArg = process.argv[2] || '';
const encodedCode = protocolArg.replace('js-run:', '');
const code = decodeURIComponent(encodedCode);

console.log('Received JavaScript code via protocol handler');

// Create temp file
const tempDir = os.tmpdir();
const tempFile = path.join(tempDir, `execute_${Date.now()}.js`);

try {
    // Write code to temp file
    fs.writeFileSync(tempFile, code, 'utf8');
    console.log(`Executing code from: ${tempFile}`);
    
    // Execute with Node.js
    const output = execSync(`node "${tempFile}"`, { 
        encoding: 'utf8',
        timeout: 30000 // 30 second timeout
    });
    
    console.log('\n=== Execution Output ===');
    console.log(output);
    console.log('=== End Output ===\n');
    
    // Keep window open for a moment to see output
    setTimeout(() => {}, 3000);
} catch (error) {
    console.error('\n=== Execution Error ===');
    console.error('Error:', error.message);
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.error('STDERR:', error.stderr);
    console.error('=== End Error ===\n');
    
    // Keep window open
    setTimeout(() => {}, 5000);
} finally {
    // Clean up
    if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
    }
}

