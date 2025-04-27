document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the selected text from storage
  chrome.storage.local.get('selectedText', (data) => {
    document.getElementById('selectedText').value = data.selectedText || '';
  });

  document.getElementById('generate').addEventListener('click', () => {
    const selectedText = document.getElementById('selectedText').value;

    // Send the selected text to the OpenAI API
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
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
