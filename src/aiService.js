const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Generates a code snippet based on the provided documentation context and user preferences.
 *
 * @param {Object} options
 * @param {string} options.apiKey - Your OpenAI API key.
 * @param {string} options.contextText - Extracted documentation text to base the snippet on.
 * @param {string} [options.language='JavaScript'] - Desired programming language for the snippet.
 * @param {string} [options.complexity='intermediate'] - Complexity level: 'beginner', 'intermediate', 'advanced'.
 * @param {string[]} [params.formattingOptions]  Array of formatting instructions. 
 * @param {string} [options.model='gpt-3.5-turbo'] - OpenAI model to use.
 * @param {number} [options.temperature=0.2] - Sampling temperature.
 * @param {number} [options.maxTokens=500] - Max tokens in response.
 * @param {AbortSignal} [options.signal] - Optional signal to abort the request.
 * @returns {Promise<string>} The generated code snippet.
 */
export async function generateCodeSnippet({
  apiKey,
  contextText,
  language = 'JavaScript',
  complexity = 'intermediate',
  formattingOptions = [],
  model = 'gpt-3.5-turbo',
  temperature = 0.2,
  maxTokens = 500,
  signal,
}) {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  const promptLines = [
    `Generate a ${complexity} level example in ${language}.`,
    `Here is the documentation or context to base your example on:`,
    `"""`,
    contextText.trim(),
    `"""`,
  ];

  if (formattingOptions.length > 0) {
    promptLines.push(
      `Please apply the following formatting options to the code snippet:`,
      `- ${formattingOptions.join('\n- ')}`
    );
  }
  const systemMessage = {
    role: 'system',
    content: 'You are a helpful assistant that generates code snippets based on provided documentation context. You only respond in code',
  };
  const userMessage = {
    role: 'user',
    content: promptLines.join('\n')};

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [systemMessage, userMessage],
      temperature,
      max_tokens: maxTokens,
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawSnippet = data.choices?.[0]?.message?.content;
  if (!rawSnippet) {
    throw new Error('No content returned from OpenAI API');
  }
  return rawSnippet.trim();
}

/**
 * Cleans up a raw code snippet by removing markdown fences if present.
 *
 * @param {string} raw - The raw snippet, possibly wrapped in triple backticks.
 * @returns {string} The cleaned code snippet.
 */
export function cleanupCodeSnippet(raw) {
  return raw
    .trim()
    .replace(/^```[a-zA-Z]*\n([\s\S]*?)\n```$/, '$1')
    .replace(/^```[a-zA-Z]*\n/, '')
    .replace(/```$/, '')
    .trim();
}
