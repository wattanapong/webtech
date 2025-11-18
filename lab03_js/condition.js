rain = true
if (rain){
    console.log('Raining')
}else{
    console.log('Good Weather')
}

console.log(rain?'Raining':'Good Weather')

rain = true
temp = 26
if (rain){
    console.log('Raining')
}else if(temp >=25 && temp <= 27){
    console.log('Good Weather')
}