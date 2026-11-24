// CH9 · Predict the output, then run: npm run loop
console.log('1 start');
setTimeout(() => console.log('4 timeout (task)'), 0);
Promise.resolve().then(() => console.log('3 then (microtask)'));
console.log('2 end');
// sync code first (1, 2) → microtasks (3) → the next task (4)
