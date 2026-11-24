// CH4-1 · Error handling: throw, try / catch / finally
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero"); // throw Error objects, not strings
  return a / b;
}
try {
  console.log(divide(10, 2)); // 5
  console.log(divide(1, 0));  // throws → jumps to catch
  console.log("never printed");
} catch (err) {
  console.error("Error:", err.message);
} finally {
  console.log("done");        // always runs
}

// Common errors you will see – uncomment one at a time
// console.log(notDefined);            // ReferenceError
// const u = undefined; u.name;        // TypeError
// JSON.parse("{bad json}");           // SyntaxError
// new Array(-1);                      // RangeError
