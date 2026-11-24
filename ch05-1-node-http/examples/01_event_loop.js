// CH5-1 · Event loop in action  (npm run loop)
console.log("1 start");
setTimeout(() => console.log("4 timeout"), 0);
Promise.resolve().then(() => console.log("3 promise"));
console.log("2 end");
// Output: 1 start, 2 end, 3 promise, 4 timeout

// ❌ Blocking: uncomment and every user of a server would wait 5 seconds
// const stop = Date.now() + 5000;
// while (Date.now() < stop) {}
