# Docky: GPT-Powered Code Snippets for Documentation

Docky is a Chrome Extension that enhances documentation sites by injecting AI-generated code examples directly into the page. Whether you're a beginner trying to understand a new API or an experienced developer looking for quick cross-language translations, Docky gives you contextual, tailored code snippets on demand right where you need them.

---

## 🚀 Project Description

Documentation is essential but often lacks practical examples that speak to the reader’s current needs. Docky solves this by:

- Extracting content from the page you’re on (e.g., function name, class, method)
- Allowing you to specify language and complexity level
- Generating and injecting AI-powered code snippets without leaving the site

Docky acts like a personal assistant for documentation, turning static pages into interactive learning tools.

## ⚙️ Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/christianishimwe/Docky.git
   cd docky
   ```
1. **Install dev dependencies**  
   ```bash
   npm install
   ```
1. Open **Chrome** and go to:  
   `chrome://extensions/`
1. Turn on **Developer mode** (top right)
1. Click **Load unpacked**
1. Select the `src` folder containing your project (`Docky/src`)
1. Click your Docky extension icon to open the popup

## 💬 Using the Extension

1. Paste your OpenAI API key in the popup and click **Save Key**
2. Right click documentation and press "Docky". This will open the popup UI.
3. Choose:
   - A programming language
   - A complexity level
   - Optional formatting options
4. Click **Generate Code Example**
5. Your tailored snippet will appear below!

## ✅ Features
**Context-Aware Generation**
- Extracts the exact docs text you’re ready
  
**Language & Complexity Control**
- Choose any language and difficulty
  
**Formatting Options**
- Indentation, blank lines, explanatory comments on demand
  
**Non-Intrusive UI**
- Popup UI when you use the extension that shows you the generated snippet

<img width="1476" alt="Screenshot 2025-04-30 at 4 07 35 AM 2" src="https://github.com/user-attachments/assets/40f01b03-ccd2-488e-85b9-92265c1d7956" />

<img width="1481" alt="Screenshot 2025-04-30 at 4 39 30 AM" src="https://github.com/user-attachments/assets/1d26c843-b370-47e9-b9b7-ef8c384086e4" />

<img width="1489" alt="Screenshot 2025-04-30 at 4 39 41 AM" src="https://github.com/user-attachments/assets/6d09783e-0740-4a19-88cb-eb6f72f543c9" />

## 👥 Individual Contributions

| Name              | Contributions |
|-------------------|---------------|
| **George Botros** | AI Integration, Maintain GitHub Repo, Slide Deck |
| **Christian Ishimwe** | Extension Architecture/Setup, Demo Recording |
| **Matthew Yin** | Extension Popup UI, Testing |
| **Michael Imevbore** | Landing Page |

## 🏗️ Future Work
**Better Snippet Rendering**
- Integrate a syntax highlighter for cleaner formatting.
- Allow users to copy code with one click (e.g., add a 📋 button to each snippet).
  
**Smarter Code Display**
- Inject code snippets directly into the webpage, instead of the popup UI.

