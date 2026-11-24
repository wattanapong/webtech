// CH9 · Create & consume a Promise: then / catch / finally  (npm run promise – run it several times)
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rollDice() {
  return new Promise((resolve, reject) => {
    const n = Math.ceil(Math.random() * 6);
    if (n > 1) resolve(n);
    else reject(new Error('Rolled a 1'));
  });
}

wait(500)
  .then(() => rollDice())               // return a Promise → the chain continues
  .then((n) => console.log('Got', n))
  .catch((err) => console.error(err.message)) // one catch for any step
  .finally(() => console.log('done'));  // success or failure
