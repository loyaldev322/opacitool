// Popup script
document.getElementById('testBtn').addEventListener('click', () => {
  const status = document.getElementById('status');
  status.textContent = 'Testing...';
  status.className = '';

  chrome.runtime.sendMessage(
    { action: 'executeCode', code: '2 + 2' },
    (response) => {
      if (response && response.success) {
        status.textContent = `Test result: ${response.output}`;
        status.className = 'success';
      } else {
        status.textContent = 'Test failed';
        status.className = 'error';
      }
    }
  );
});

