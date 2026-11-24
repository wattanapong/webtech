// Same example as inherit2.js, written with ES6 class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

// Inherit methods from the parent class with "extends"
class Dog extends Animal {
  constructor(name, breed) {
    super(name) // call the parent class constructor
    this.breed = breed
  }

  bark() {
    console.log('Woof!')
  }
}

// Create instances of the classes
var animal = new Animal("Generic Animal");
var dog = new Dog("Buddy", "Golden Retriever");

// Test the methods
animal.sayHello();
dog.sayHello();
dog.bark();
