/**
 * src/__tests__/aiService.test.js
 *
 * Test file for aiService.js (assuming aiIntegration.js was renamed to aiService.js)
 */

import { generateCodeSnippet, cleanupCodeSnippet } from '../aiService';

const fetch = require('node-fetch');
global.fetch = fetch;

// Load environment variables
const API_KEY = process.env.DEV_OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing DEV_OPENAI_API_KEY in environment variables');
}

describe('aiService', () => {
  jest.setTimeout(15000); // Increase timeout for API calls

  test('generateCodeSnippet should return a valid code snippet', async () => {
    const contextText = 'Explain how to create a simple HTTP server using Node.js';

    const snippet = await generateCodeSnippet({
      apiKey: API_KEY,
      contextText,
      language: 'JavaScript',
      complexity: 'beginner',
    });
    
    console.log(snippet);

    expect(typeof snippet).toBe('string');
    expect(snippet.length).toBeGreaterThan(20);
    expect(snippet).toMatch(/http|server/i);
  });

  test('cleanupCodeSnippet should remove markdown fences', () => {
    const raw = '```javascript\nconsole.log(\'Hello\');\n```';
    const cleaned = cleanupCodeSnippet(raw);

    expect(cleaned).toBe("console.log('Hello');");
  });

  test('generateCodeSnippet throws error with invalid API key', async () => {
    await expect(
      generateCodeSnippet({
        apiKey: 'invalid-key',
        contextText: 'Create a Python list',
      })
    ).rejects.toThrow(/OpenAI API error/);
  });
});
