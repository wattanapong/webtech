// CH4-1 · JSON text ↔ object, printing the students array
const text = '{"code":"65021284","fnameEn":"KORAWIT","grade":"A"}';
const student = JSON.parse(text);     // text → object
console.log(student.fnameEn);
student.grade = "B+";
console.log(JSON.stringify(student)); // object → text
console.log(JSON.stringify(student, null, 2));
try {
  JSON.parse("{code: 1}");            // keys need "quotes"
} catch (err) {
  console.log(err.name);              // SyntaxError
}

const students = [
  { titleEn: "Mr.", fnameEn: "KORAWIT", lnameEn: "SRISUK", code: "65021284", grade: "A" },
  { titleEn: "Miss", fnameEn: "KAMONAPAR", lnameEn: "JAIDEE", code: "65021301", grade: "B+" },
  { titleEn: "Miss", fnameEn: "NIDA", lnameEn: "MEESUK", code: "65021355", grade: "C" },
];
for (const std of students) {
  const { titleEn, fnameEn, lnameEn, code } = std;
  console.log(`${titleEn}${fnameEn} ${lnameEn} ${code}`);
}
console.log("+".repeat(30));
for (const std of students) console.log(Object.values(std).join(" "));
const lines = students.map((s) => `${s.fnameEn} ${s.grade}`);
console.log(lines.join("\n"));
