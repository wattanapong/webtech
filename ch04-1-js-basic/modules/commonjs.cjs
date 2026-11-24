// CH4-1 · The same idea in CommonJS (older Node style, still common in tutorials)
// .cjs = always CommonJS, even inside a "type": "module" package
const path = require("node:path");
module.exports = { hello: () => "Hello from CommonJS" };
console.log(module.exports.hello(), path.basename(__filename));
