chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log('Received message:', request);
    
    if (request.action === 'runJavaScript') {
      // Connect to native host
      try {
        const port = chrome.runtime.connectNative('com.yourcompany.jsrunner');
        
        port.postMessage({ code: request.code });
        
        port.onMessage.addListener((response) => {
          console.log('Response from native host:', response);
          sendResponse({ success: true, output: response.output });
        });
        
        port.onDisconnect.addListener(() => {
          console.log('Native host disconnected');
          if (chrome.runtime.lastError) {
            sendResponse({ 
              success: false, 
              error: chrome.runtime.lastError.message 
            });
          }
        });
        
        return true; // Keep channel open for async response
      } catch (error) {
        console.error('Error connecting to native host:', error);
        sendResponse({ 
          success: false, 
          error: 'Native host not found. Please install the native host application.' 
        });
        return true;
      }
    }
    
    return false;
  }
);

