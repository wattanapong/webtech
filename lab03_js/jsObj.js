let circle1 = {
    name: "circle 1",
    pi: 3.14,
    getArea: function(r){
        return r ** 2 * this.pi
    }
}

let circle2 = {
    name: "circle 2",
    r: 0,
    getArea(pi=3.14) {
        return this.r ** 2 * pi
    }
}

console.log(circle1.getArea(2))
circle2.r = 2
console.log(circle2.getArea())

console.log(new circle("my circle").name)

myCircle = new circle("my circle");
console.log(myCircle.name)

class circle {
    constructor(name) {
    // Assign the RGB values as a property of `this`.
    this.name = name;
    }
}

