// CH4-1 · Arrays, map/filter/reduce/find, destructuring, spread, ?. and ??
const rooms = ["A101", "B204", "C305"];
console.log(rooms.length, rooms[0], rooms.at(-1));
rooms.push("D410");
rooms.pop();
console.log(rooms.includes("B204"), rooms.indexOf("C305"), rooms.slice(0, 2), rooms.join(", "));
console.log([10, 9, 100].sort(), [10, 9, 100].sort((a, b) => a - b)); // string sort vs number sort

const scores = [
  { name: "Korawit", score: 78 },
  { name: "Kamonapar", score: 91 },
  { name: "Nida", score: 45 },
];
const names = scores.map((s) => s.name);
const passed = scores.filter((s) => s.score >= 50);
const total = scores.reduce((sum, s) => sum + s.score, 0);
const top = scores.find((s) => s.score > 90);
const allPass = scores.every((s) => s.score >= 50);
const list = scores.filter((s) => s.score >= 50).map((s) => s.name).sort();
console.log(names, passed.length, total, (total / scores.length).toFixed(2), top, allPass, list);

// destructuring
const student = { code: "65021284", fname: "Korawit", grade: "A" };
const { fname, grade } = student;
const { code: id, major = "CPE" } = student; // rename + default
const [first, second, ...rest] = [10, 20, 30, 40];
let a = 1, b = 2;
[a, b] = [b, a]; // swap
const show = ({ fname, grade }) => `${fname}: ${grade}`;
console.log(fname, grade, id, major, first, second, rest, a, b, show(student));

// spread
const arr = [...[1, 2], 3, 4];
const base = { theme: "light", lang: "th" };
const settings = { ...base, theme: "dark" };
const user = { name: "Nida", address: { city: "Phayao" }, profile: null };
const deep = structuredClone(user);
deep.address.city = "Chiang Mai"; // user is unchanged
console.log(arr, Math.max(...arr), settings, user.address.city);

// ?. and ??
console.log(user.profile?.email);           // undefined, no TypeError
console.log(user.getPhoto?.());             // undefined
const score = 0;
console.log(score ?? 100, score || 100);    // 0 100
console.log(user.profile?.city ?? "unknown");
