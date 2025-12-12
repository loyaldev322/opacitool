// Background service worker for extension
// This runs in the extension context, can access more browser APIs

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log('Background received message:', request);

    if (request.action === 'executeCode') {
      // Execute code in background context (has more permissions)
      try {
        // Use eval in safe context
        const code = request.code;
        const result = eval(code);
        
        // Send result back
        sendResponse({ 
          success: true, 
          output: String(result),
          executedAt: new Date().toISOString()
        });
      } catch (error) {
        sendResponse({ 
          success: false, 
          output: `Error: ${error.message}`,
          executedAt: new Date().toISOString()
        });
      }
      
      return true; // Keep channel open for async response
    }

    if (request.action === 'collectSystemInfo') {
      // Collect system/browser information
      const systemInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        timestamp: new Date().toISOString()
      };

      sendResponse({ success: true, info: systemInfo });
      return true;
    }
  }
);

// Also listen from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'executeCode') {
    try {
      const code = request.code;
      const result = eval(code);
      sendResponse({ success: true, output: String(result) });
    } catch (error) {
      sendResponse({ success: false, output: `Error: ${error.message}` });
    }
    return true;
  }
});

