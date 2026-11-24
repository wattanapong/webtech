// Multiplication table (for loop)
var n = 2
for (i = 0; i < 13; i++) {
    console.log("%d x %d = %d", n, i, n * i)
}

// Multiplication table (forEach)
var iarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
iarray.forEach((i) => {
    console.log("%d x %d = %d", n, i, n * i)
})

// Create array 0..12 then map (arrow function)
// var iarray = [...Array(13).keys()].map( i => console.log(`2x${i}=${2*i}`));
// var iarray = Array(13).fill(0).map((_, i) => console.log(`2x${i}=${2*i}`));

// Create array 0..12 then map (general function)
// var iarray = [...Array(13).keys()].map(function(i) {
//     console.log(`2x${i}=${2*i}`)
// });
// var iarray = Array(13).fill(0).map(function(_, i) {
//     console.log(`2x${i}=${2*i}`)
// });

// Loop over JSON object {key : value}
var fruits = { 0: 'Apple', 1: 'Papaya', 2: 'Orange', 3: 'Banana' }

for (i = 0; i < Object.keys(fruits).length; i++) {
    console.log("fruits[%d] = %s", i, fruits[i])
}

for ([index, item] of Object.entries(fruits)) {
    console.log("fruits[%d] = %s", index, item)
}

for (index in Object.values(fruits)) {
    console.log("fruits[%d] = %s", index, fruits[index])
}

Object.entries(fruits).forEach(entry => {
    [index, item] = entry
    console.log("fruits[%d] = %s", index, item)
})

for (item of Object.values(fruits)) {
    console.log("fruit = %s", item)
}
