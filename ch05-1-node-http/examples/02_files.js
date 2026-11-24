// CH5-1 · Built-in modules: node:fs/promises and node:path  (npm run files)
const fs = require("node:fs/promises");
const path = require("node:path");
const { add } = require("./math"); // our own CommonJS module

async function main() {
  const file = path.join(__dirname, "data", "items.json");
  const text = await fs.readFile(file, "utf8");
  const items = JSON.parse(text);
  console.log(items.length, "items");
  console.log("add(2, 3) =", add(2, 3));

  const log = path.join(__dirname, "data", "log.txt");
  await fs.appendFile(log, `read at ${new Date().toISOString()}\n`);
  console.log("appended to", log);
}
main().catch(console.error);
