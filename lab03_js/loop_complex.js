// var students = {6602001:"Alice", 6602002:"Bob", 6602003:"Charlie"}
var students = {
    6602001: {name: "Alice", age:20, major: "Computer Science"},
    6602002: {name: "Bob", age:21, major: "Information Technology"},
    6602003: {name: "Charlie", age:19, major: "Computer Engineering"}
}
for (var id in students){
    std = students[id]
    console.log("ID: %s, Name: %s, Major: %s, Age: %d", id, 
        std["name"], std["major"], std["age"])
}

 