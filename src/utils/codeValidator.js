/**
 * Validates user code against expected results or test conditions.
 * @param {string} userCode - The JavaScript code entered by the user.
 * @param {string} test - A string representing the test logic (optional).
 * @param {any} expected - The expected return value (optional).
 * @returns {boolean} - Returns true if validation passes.
 */
export function validateCode(userCode, test = null, expected = null) {
  try {
    // Basic scrubbing to prevent some obvious malicious acts
    if (userCode.includes('window') || userCode.includes('document.location') || userCode.includes('localStorage.clear')) {
      return false;
    }

    // Context for testing
    const originalArray = [1, 2, 3];
    const obj = { x: 1, y: 2 };
    
    if (test) {
      // Create a function that executes the test logic
      // We pass the user code as 'input' to the test script
      const tester = new Function('input', 'originalArray', 'obj', `
        try {
          ${test}
        } catch (e) {
          return false;
        }
      `);
      return !!tester(userCode, originalArray, obj);
    }

    // Default: try to evaluate user code directly and compare with expected
    const result = eval(userCode);
    return result === expected;

  } catch (error) {
    console.warn('Code validation error:', error);
    return false;
  }
}
