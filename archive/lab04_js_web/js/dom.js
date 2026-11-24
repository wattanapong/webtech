// Finding HTML elements by id
element1 = document.getElementById('ele1')

// Finding HTML elements by class name (HTMLCollection, use [index])
element2 = document.getElementsByClassName('ele2')

// Finding HTML elements by name attribute (NodeList)
element3 = document.getElementsByName('ele3')

// Finding HTML elements by tag name
element4 = document.getElementsByTagName('h1')

// Finding HTML elements by CSS selectors (NodeList)
element5 = document.querySelectorAll("h1.intro");

console.log(element1)
console.log(element2)
console.log(element3)
console.log(element4)
console.log(element5)
