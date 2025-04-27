import { cleanupCodeSnippet } from '../aiService';

describe('cleanupCodeSnippet', () => {
  test('removes triple backticks and language specifier', () => {
    const input = "```javascript\nconsole.log('Hello, world!');\n```";
    const expected = "console.log('Hello, world!');";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('removes triple backticks without language specifier', () => {
    const input = "```\nconsole.log('Test');\n```";
    const expected = "console.log('Test');";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('handles code block without final newline before ending backticks', () => {
    const input = "```python\nprint('Hello')```";
    const expected = "print('Hello')";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('returns raw code if no backticks are present', () => {
    const input = "function add(a, b) { return a + b; }";
    const expected = "function add(a, b) { return a + b; }";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('handles extra whitespace outside the code block', () => {
    const input = "  ```java\nSystem.out.println(\"Hi\");\n```  ";
    const expected = "System.out.println(\"Hi\");";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('handles multiline code inside backticks', () => {
    const input = "```javascript\nfunction greet() {\n  console.log('Hello');\n}\n```";
    const expected = "function greet() {\n  console.log('Hello');\n}";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });

  test('handles empty string input', () => {
    const input = "";
    const expected = "";
    expect(cleanupCodeSnippet(input)).toBe(expected);
  });
});
