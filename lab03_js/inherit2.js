// Parent class
function Animal(name) {
    this.name = name;
  }
  
  // Method in the parent class
  Animal.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name);
  };
  
  // Child class inheriting from Animal
  function Dog(name, breed) {
    // Call the parent class constructor
    Animal.call(this, name);
    
    // Additional property specific to Dog class
    this.breed = breed;

  }
  
  // Inherit methods from the parent class
  Dog.prototype = Object.create(Animal.prototype);
  
  // Method specific to Dog class
  Dog.prototype.bark = function () {
    console.log("Woof!");
  };
  
  // Create instances of the classes
  var animal = new Animal("Generic Animal");
  var dog = new Dog("Buddy", "Golden Retriever");
  
  animal.sayHello(); 
  dog.sayHello();  
  dog.bark(); 