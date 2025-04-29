import { generateCodeSnippet, cleanupCodeSnippet } from './aiService.js';

document.addEventListener('DOMContentLoaded', () => {
  let selectedLanguage = 'python'; // Default language

  // Initialize language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      langButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      selectedLanguage = btn.dataset.lang;
    });
  });

  // Set Python as default active language
  document.querySelector('[data-lang="python"]').classList.add('active');

  // Retrieve the selected text from storage
  chrome.storage.local.get(['selectedText', 'apiKey'], (data) => {
    document.getElementById('selectedText').value = data.selectedText || '';
    document.getElementById('apiKey').value = data.apiKey || '';
  });

  // Save API Key
  document.getElementById('saveKey').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.local.set({ apiKey }, () => {
      alert('API Key saved!');
    });
  });

  // Generate Code
  document.getElementById('generate').addEventListener('click', async () => {
    const generateButton = document.getElementById('generate');
    const generatedCodeElement = document.getElementById('generatedCode');
    
    try {
      // Disable button and show loading state
      generateButton.disabled = true;
      generateButton.textContent = 'Generating...';
      generatedCodeElement.textContent = 'Generating code...';

      // Get inputs
      const contextText = document.getElementById('selectedText').value;
      const apiKey = document.getElementById('apiKey').value;
      
      if (!apiKey) {
        throw new Error('Please enter and save your OpenAI API Key first.');
      }

      if (!contextText.trim()) {
        throw new Error('Please enter some text to generate code from.');
      }

      // Generate code with default formatting
      const rawSnippet = await generateCodeSnippet({
        apiKey,
        contextText,
        language: selectedLanguage,
        complexity: 'intermediate', // Default to intermediate for better code quality
      });

      // Clean and display the snippet
      const cleanSnippet = cleanupCodeSnippet(rawSnippet);
      generatedCodeElement.textContent = cleanSnippet;

    } catch (error) {
      console.error('Error:', error);
      generatedCodeElement.textContent = `Error: ${error.message}`;
    } finally {
      // Reset button state
      generateButton.disabled = false;
      generateButton.textContent = 'Generate Code Example';
    }
  });
});
