# AI + Compiler Integration Testing Guide 🧪

## Overview
This guide helps you test the complete AI-to-Compiler integration in CodeFlow, ensuring that AI-generated code is executable and meets compiler requirements.

---

## Prerequisites ✅

1. **Server Running**: `cd server && npm run dev`
2. **Client Running**: `cd client && npm run dev`
3. **Environment**: `.env` file with valid `GEMINI_API_KEY`
4. **Compiler**: Built-in Piston API integration (no setup needed)

---

## Test Suite 🎯

### Test 1: Simple JavaScript Function
**Objective**: Verify AI generates executable JS code with output

**Steps**:
1. Open CodeFlow and create a new file: `test.js`
2. Open AI sidebar (sparkle icon ✨)
3. Type: `"give me code for palindrome check"`
4. Wait for AI response

**Expected Result**:
```javascript
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// Example usage
console.log("Testing 'racecar':", isPalindrome("racecar")); // true
console.log("Testing 'hello':", isPalindrome("hello")); // false
console.log("Testing 'A man a plan a canal Panama':", 
  isPalindrome("A man a plan a canal Panama".toLowerCase().replace(/\s/g, '')));
```

**Validation Checklist**:
- ✅ Code has `console.log()` statements
- ✅ Function is defined AND called with examples
- ✅ "Compiler Ready" green badge appears
- ✅ Accept button is enabled

**Action**: Click "Accept"

**Expected Outcome**:
- Code appears in editor
- Can click "Run" button
- Output shows in console with test results
- Badge shows "Ready to Run!" with ✅ icon

---

### Test 2: Python with Main Block
**Objective**: Verify Python code has proper structure

**Steps**:
1. Create new file: `test.py`
2. Ask AI: `"create a fibonacci sequence generator"`

**Expected Result**:
```python
def fibonacci(n):
    fib_sequence = []
    a, b = 0, 1
    for _ in range(n):
        fib_sequence.append(a)
        a, b = b, a + b
    return fib_sequence

if __name__ == "__main__":
    # Example usage
    print("First 10 Fibonacci numbers:")
    print(fibonacci(10))
    
    print("\nFirst 5 Fibonacci numbers:")
    print(fibonacci(5))
```

**Validation Checklist**:
- ✅ Has `if __name__ == "__main__":` block
- ✅ Code includes `print()` statements
- ✅ Function is called in main block
- ✅ Complete, runnable code

---

### Test 3: Java with Main Method
**Objective**: Verify Java structure is compiler-ready

**Steps**:
1. Create file: `Main.java`
2. Ask AI: `"create a simple calculator class"`

**Expected Result**:
```java
public class Main {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    public static void main(String[] args) {
        // Example usage
        System.out.println("Addition: 5 + 3 = " + add(5, 3));
        System.out.println("Subtraction: 10 - 4 = " + subtract(10, 4));
    }
}
```

**Validation Checklist**:
- ✅ Has `public class Main`
- ✅ Has `public static void main(String[] args)`
- ✅ Uses `System.out.println()`
- ✅ Methods are called in main

---

### Test 4: C++ with Headers
**Objective**: Verify proper C++ structure

**Steps**:
1. Create file: `test.cpp`
2. Ask AI: `"create factorial function"`

**Expected Result**:
```cpp
#include <iostream>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    // Example usage
    std::cout << "Factorial of 5: " << factorial(5) << std::endl;
    std::cout << "Factorial of 0: " << factorial(0) << std::endl;
    std::cout << "Factorial of 10: " << factorial(10) << std::endl;
    return 0;
}
```

**Validation Checklist**:
- ✅ Has `#include <iostream>`
- ✅ Has `int main()` with `return 0;`
- ✅ Uses `std::cout` for output
- ✅ Function is called in main

---

### Test 5: Code Modification
**Objective**: Test AI editing existing code

**Steps**:
1. Create `test.js` with:
```javascript
function greet() {
  console.log("Hello");
}

greet();
```

2. Ask AI: `"modify this to greet with a name parameter"`

**Expected Result**:
```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Example usage
greet("Alice");
greet("Bob");
greet("Charlie");
```

**Validation**:
- ✅ Function updated with parameter
- ✅ Multiple example calls included
- ✅ Original structure maintained
- ✅ Still has console.log output

---

## Validation Rules 🔍

### Client-Side Validation (Before Accept)
The AI context validates code for:

**JavaScript/TypeScript**:
- ❌ No `console.log()` → Error
- ❌ Contains placeholders → Error
- ❌ Empty code → Error

**Python**:
- ❌ No `print()` → Error
- ❌ Empty code → Error

**Java**:
- ❌ No `public static void main` → Error
- ❌ No `System.out.println` → Error
- ❌ No class definition → Error

**C/C++**:
- ❌ No `int main()` → Error
- ❌ No output (printf/cout) → Error

---

## Reject Workflow Test 🚫

**Objective**: Verify rejection cleans up properly

**Steps**:
1. Get AI suggestion for any code
2. Click "Reject" button
3. Wait 1 second

**Expected**:
- Badge changes to "Rejected" (red)
- Suggestion fades out after 1 second
- Suggestion disappears from list
- Editor code remains unchanged
- No errors in console

---

## Accept Workflow Test ✅

**Objective**: Verify acceptance updates editor

**Steps**:
1. Get AI suggestion
2. Verify "Compiler Ready" badge
3. Click "Accept" button

**Expected**:
- Badge changes to "Accepted" (green)
- Code appears in active editor
- Suggestion marked as accepted in list
- Can immediately run code in compiler
- File tab shows unsaved indicator (if applicable)

---

## Error Scenarios ⚠️

### Test: Invalid Code Generation

**Setup**: Temporarily modify server to generate bad code (for testing)

**Expected Client Behavior**:
1. Validation catches issues:
   - Missing main function
   - Missing output statements
   - Contains placeholders

2. User sees error toast:
   - "Code validation failed: [specific error]"
   - Suggestion stays in "pending" state
   - Accept button remains active to retry

---

## Integration Test 🔄

**Full Workflow**:
1. Start with empty `app.js`
2. Ask AI: `"create a simple todo list array manager"`
3. AI generates complete code with examples
4. Click "Accept"
5. Code appears in editor
6. Click "Run" in RunView
7. Output appears in console
8. Ask AI: `"add a remove function"`
9. AI provides updated code
10. Accept and verify execution

**Success Criteria**:
- ✅ All steps complete without errors
- ✅ Code executes successfully each time
- ✅ Output is visible in compiler console
- ✅ State maintained between AI interactions

---

## Performance Tests ⚡

### Response Time
- **Target**: < 3 seconds for simple queries
- **Acceptable**: < 5 seconds for complex code
- **Measure**: Time from send to code suggestion appearance

### Code Quality
- **Completeness**: 100% of generated code should be runnable
- **Placeholders**: 0 placeholders in generated code
- **Output**: 100% of code should produce visible output

---

## Common Issues & Solutions 🔧

### Issue: AI generates code without output
**Cause**: Prompt not emphasizing output requirement
**Solution**: Already fixed - server prompts now require console.log/print
**Test**: Generate any code and verify output statements present

### Issue: Code missing main function (Java/C/C++)
**Cause**: AI not following structure requirements
**Solution**: Enhanced language requirements in server
**Test**: Generate Java/C++ code and verify main() present

### Issue: Accept button doesn't work
**Cause**: Validation failing
**Solution**: Check browser console for validation errors
**Debug**: Look for specific validation rule that failed

### Issue: Code has "..." or "TODO" placeholders
**Cause**: AI generated incomplete code
**Solution**: Validation catches this and shows error
**Test**: Try to accept - should see "contains placeholders" error

---

## Test Checklist Summary ☑️

Use this checklist for complete testing:

- [ ] **JavaScript**: Function + console.log + examples
- [ ] **Python**: if __name__ block + print + examples  
- [ ] **Java**: class + main + System.out.println
- [ ] **C++**: includes + main + std::cout
- [ ] **TypeScript**: Types + console.log + examples
- [ ] **Code Modification**: Updates existing file correctly
- [ ] **Accept**: Code appears in editor
- [ ] **Reject**: Suggestion removed after 1s
- [ ] **Validation**: Catches missing output
- [ ] **Validation**: Catches missing main functions
- [ ] **Validation**: Catches placeholders
- [ ] **Execution**: Accepted code runs in compiler
- [ ] **Output**: Console shows results
- [ ] **Multiple Files**: Works across different files
- [ ] **Chat History**: AI uses context from previous messages

---

## Expected AI Behavior 🤖

### DO ✅
- Generate COMPLETE, executable code
- Include example usage that RUNS
- Add output statements (console.log, print, etc.)
- Follow language-specific structure requirements
- Provide full file content, not snippets

### DON'T ❌
- Use placeholders like "...", "// rest of code"
- Generate function definitions without calling them
- Omit main functions/blocks
- Skip output statements
- Provide partial code

---

## Debugging Tips 🐛

### Check Server Logs
```bash
cd server
npm run dev
# Watch for AI_QUERY events and responses
```

### Check Browser Console
```javascript
// In browser DevTools Console
localStorage.getItem('livewire-ai-messages')
```

### Check Validation
```javascript
// Add breakpoint in AIContext.tsx validateCode function
// Step through validation rules
```

### Verify Socket Events
```javascript
// Check Network tab -> WS (WebSocket)
// Look for AI_QUERY, AI_RESPONSE, AI_CODE_SUGGESTION events
```

---

## Success Metrics 📊

**Code Quality**:
- 100% of generated code should be executable
- 0% placeholder usage
- 100% should have visible output

**User Experience**:
- < 3 clicks to generate and run code
- Clear visual feedback at each step
- No confusing error messages

**Integration**:
- AI → Editor: Seamless code transfer
- Editor → Compiler: Direct execution
- Compiler → Output: Visible results

---

## Next Steps After Testing 🚀

1. **Report Issues**: Document any AI behavior that doesn't match expectations
2. **Performance**: Note any slow responses or timeouts
3. **Edge Cases**: Try unusual queries (very long code, multiple languages, etc.)
4. **User Feedback**: Have real users test and provide feedback

---

## Contact & Support 📞

- **Documentation**: See `AI_README.md` for feature details
- **Architecture**: See `ARCHITECTURE.md` for system design
- **Setup Issues**: See `SETUP_GUIDE.md` for configuration help
- **Quick Reference**: See `QUICK_REFERENCE.md` for commands

---

**Last Updated**: Jan 2025  
**Version**: 2.0 (Enhanced Compiler Integration)
