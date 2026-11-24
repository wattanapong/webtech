// CH9 · Promise.all / allSettled / race / any  (npm run combinators)
const wait = (ms, v, fail = false) =>
  new Promise((ok, no) => setTimeout(() => (fail ? no(new Error(`${v} failed`)) : ok(v)), ms));

async function main() {
  // all succeed or fail fast
  const [customers, products] = await Promise.all([wait(300, 'customers'), wait(200, 'products')]);
  console.log('all:', customers, products);
  try {
    await Promise.all([wait(300, 'A'), wait(100, 'B', true)]);
  } catch (err) {
    console.log('all (one fails):', err.message);
  }

  // never rejects – check each status
  const results = await Promise.allSettled([wait(100, 'A'), wait(100, 'B', true)]);
  console.log('allSettled:', results.map((r) => r.status));

  // first to settle wins – a 300 ms timeout race
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 300));
  try {
    await Promise.race([wait(1000, 'slow server'), timeout]);
  } catch (err) {
    console.log('race:', err.message);
  }

  // first to FULFIL wins
  console.log('any:', await Promise.any([wait(200, 'mirror 1', true), wait(300, 'mirror 2')]));
}
main();
