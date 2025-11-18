class Animal {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

class Dog {
  constructor(name, breed) {
    new Animal(name)
    this.name = name
    this.breed = breed
  }

  bark(){
    console.log('Woof!')
  }
}

  // Inherit methods from the parent class
  Dog.prototype = Object.create(Animal.prototype);
  
  // Create instances of the classes
  var animal = new Animal(
    "Generic Animal");
  var dog = new Dog("Buddy",
   "Golden Retriever");
  
  // Test the methods
  animal.sayHello(); 
  dog.sayHello();  
  dog.bark();   