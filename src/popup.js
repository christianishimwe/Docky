import { generateCodeSnippet, cleanupCodeSnippet } from './aiService.js';

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

  document.getElementById('generate').addEventListener('click', async () => {
    const selectedText = document.getElementById('selectedText').value;
    chrome.storage.local.get('apiKey', async (data) => {
      const apiKey = data.apiKey;
      if (!apiKey) {
        alert('Please enter and save your OpenAI API Key.');
        return;
      }

      try {
        const rawCode = await generateCodeSnippet({
          apiKey,
          contextText: selectedText,
          language: 'JavaScript', // TODO: add actual language
          complexity: 'beginner', // TODO: add actual complexity
        });
        const cleanedCode = cleanupCodeSnippet(rawCode);
        document.getElementById('generatedCode').textContent = cleanedCode;
      } catch (error) {
        console.error('Error:', error);
        alert(`Failed to generate code. See console for details. ${error}`);
      }
    });
  });
});
