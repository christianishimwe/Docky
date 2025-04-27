chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.generatedCode) {
    // Display the generated code on the page
    alert(`Generated Code:\n${request.generatedCode}`);
  }
});
