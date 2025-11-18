function hello(){
    return "Hello";
}

function greeting(greet, name){
    console.log(greet + " " + name)
}

greeting("Hello", "everyone")

// function leapYear(year) {
//     if (year%400 == 0 || (year%100!=0 && year % 4 == 0)){
//         return "is leap year"
//     }else{
//         return "is not leap year"
//     }
// }

// console.log("%d %s",2100, leapYear(2100))