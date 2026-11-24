// CH4-1 · Sample solutions E1–E6
// E1
for (let i = 1; i <= 30; i++) {
  const out = i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : `${i}`;
  console.log(out);
}

// E2
const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
for (const y of [2000, 2100, 2024]) console.log(y, isLeapYear(y));

// E3
const scores = [78, 91, 45, 66];
const passed = scores.filter((s) => s >= 50);
const avg = scores.reduce((a, s) => a + s, 0) / scores.length;
const grades = scores.map((s) => (s >= 80 ? "A" : s >= 50 ? "P" : "F"));
console.log(passed, avg.toFixed(2), grades); // [78, 91, 66] 70.00 ['P','A','F','P']

// E4
const student = { code: "66020001", fname: "Suda", address: null };
const { code, fname } = student;
console.log(code, fname, student.address?.city ?? "-");

// E5
class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new Error("Bad amount");
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
  get balance() { return this.#balance; }
  toJSON() { return { owner: this.owner, balance: this.#balance }; } // used by JSON.stringify
}
const acc = new BankAccount("Suda");
acc.deposit(500);
try {
  acc.withdraw(1000);
} catch (err) {
  console.log("Error:", err.message);
}
console.log(acc.balance);

// E6
const accounts = [acc, new BankAccount("Nida")];
const text = JSON.stringify(accounts);
console.log(text, JSON.parse(text)[0].owner);
module.exports = { isLeapYear };
