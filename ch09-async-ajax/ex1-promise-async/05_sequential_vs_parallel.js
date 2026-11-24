// CH9 · Sequential vs parallel await  (npm run parallel)
const wait = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

async function main() {
  console.time('seq');
  const a = await wait(1000, 'A');
  const b = await wait(1000, 'B');
  const c = await wait(1000, 'C');
  console.timeEnd('seq'); // ~3000 ms
  console.log(a, b, c);

  console.time('par');
  const [x, y, z] = await Promise.all([wait(1000, 'A'), wait(1000, 'B'), wait(1000, 'C')]);
  console.timeEnd('par'); // ~1000 ms
  console.log(x, y, z);
}
main();
