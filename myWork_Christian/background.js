// Create a context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateCodeExample", // Unique ID for the context menu item
    title: "Generate Code Example", // Text shown in the context menu
    contexts: ["selection"] // Only show this item when text is selected
  });
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateCodeExample") {
    // Send the selected text to the OpenAI API
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        prompt: `Generate a code example for: ${info.selectionText}`,
        max_tokens: 150
      })
    })
    .then(response => response.json())
    .then(data => {
      const generatedCode = data.choices[0].text;
      chrome.tabs.sendMessage(tab.id, { generatedCode });
    })
    .catch(error => console.error('Error:', error));
  }
});
