// CH4-1 · Modern class syntax, inheritance, polymorphism
class Circle {
  #radius;           // private field
  static count = 0;  // static field
  constructor(name, radius) {
    this.name = name;
    this.#radius = radius;
    Circle.count++;
  }
  get area() {
    return Math.PI * this.#radius ** 2;
  }
  toString() {
    return `${this.name} (r=${this.#radius})`;
  }
}
const c = new Circle("my circle", 2);
console.log(c.area.toFixed(2), `${c}`, Circle.count); // 12.57 my circle (r=2) 1

class Animal {
  constructor(name) { this.name = name; }
  sayHello() { console.log(`Hello, I'm ${this.name}`); }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() { console.log("Woof!"); }
  sayHello() {         // override = polymorphism
    super.sayHello();
    console.log(`I'm a ${this.breed}`);
  }
}
new Animal("Generic Animal").sayHello();
const dog = new Dog("Buddy", "Golden Retriever");
dog.sayHello();
dog.bark();

// object with methods: Thai date (Buddhist year)
const thaiDate = {
  date: new Date(),
  months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
  short() { return `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear() + 543}`; },
  full() { return `${this.date.getDate()} ${this.months[this.date.getMonth()]} ${this.date.getFullYear() + 543}`; },
};
console.log(thaiDate.short(), "|", thaiDate.full());
console.log(new Date().toLocaleDateString("th-TH", { dateStyle: "long" })); // built-in alternative
