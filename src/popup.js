document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the selected text from storage
  chrome.storage.local.get(['selectedText', 'apiKey'], (data) => {
    document.getElementById('selectedText').value = data.selectedText || '';
    document.getElementById('apiKey').value = data.apiKey || '';
  });

  document.getElementById('saveKey').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.local.set({ apiKey }, () => {
      alert('API Key saved!');
    });
  });

  document.getElementById('generate').addEventListener('click', () => {
    const selectedText = document.getElementById('selectedText').value;
    chrome.storage.local.get('apiKey', (data) => {
      const apiKey = data.apiKey;
      if (!apiKey) {
        alert('Please enter and save your OpenAI API Key.');
        return;
      }

      // Send the selected text to the OpenAI API
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: `Generate a code example for: ${selectedText}`,
          max_tokens: 150
        })
      })
      .then(response => response.json())
      .then(data => {
        const generatedCode = data.choices[0].text;
        document.getElementById('generatedCode').textContent = generatedCode;
      })
      .catch(error => console.error('Error:', error));
    });
  });
});
