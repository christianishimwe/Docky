// Create a context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateCodeExample", // Unique ID for the context menu item
    title: "Docky", // Text shown in the context menu
    contexts: ["selection"] // Only show this item when text is selected
  });
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateCodeExample") {
    // Send the selected text to the popup
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      chrome.action.openPopup(); // Open the popup
    });
  }
});
