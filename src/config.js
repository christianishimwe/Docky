let apiKey = '';

if (typeof process !== 'undefined' && process.env?.VITE_OPENAI_API_KEY) {
  apiKey = process.env.VITE_OPENAI_API_KEY;
} else if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_API_KEY) {
  apiKey = import.meta.env.VITE_OPENAI_API_KEY;
}

export const OPENAI_API_KEY = apiKey;
