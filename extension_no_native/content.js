// Content script - runs in page context
// Can communicate with background and page

// Listen for messages from the page
window.addEventListener('message', (event) => {
  // Only accept messages from same origin
  if (event.origin !== window.location.origin) return;

  if (event.data && event.data.type === 'JS_RUNNER_REQUEST') {
    // Forward to background script
    chrome.runtime.sendMessage(
      {
        action: 'executeCode',
        code: event.data.code
      },
      (response) => {
        // Send response back to page
        window.postMessage({
          type: 'JS_RUNNER_RESPONSE',
          requestId: event.data.requestId,
          response: response
        }, window.location.origin);
      }
    );
  }
});

// Inject script to make extension available to page
const script = document.createElement('script');
script.textContent = `
  (function() {
    window.jsRunnerExtension = {
      execute: function(code) {
        return new Promise((resolve, reject) => {
          const requestId = Math.random().toString(36);
          
          const handler = (event) => {
            if (event.data && event.data.type === 'JS_RUNNER_RESPONSE' && 
                event.data.requestId === requestId) {
              window.removeEventListener('message', handler);
              if (event.data.response.success) {
                resolve(event.data.response.output);
              } else {
                reject(new Error(event.data.response.output));
              }
            }
          };
          
          window.addEventListener('message', handler);
          window.postMessage({
            type: 'JS_RUNNER_REQUEST',
            requestId: requestId,
            code: code
          }, window.location.origin);
        });
      }
    };
  })();
`;
(document.head || document.documentElement).appendChild(script);
script.remove();

