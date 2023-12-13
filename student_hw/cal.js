i = 0
j = 0
temp = ""
ans = 0
 
const num = []
 
const digits = document.querySelectorAll('button')
const display = document.getElementById('display')
 
digits.forEach((digits, index) => {
    number = parseInt(digits.innerText)
 
    digits.addEventListener('click',()=>{
        if(digits.innerText == 'C'){
            display.innerText = "0"
            num.splice(0,num.length)
            i=0
        }
        else{
            if(display.innerText == "0"){
                display.innerText = " "
            }
            display.textContent += digits.innerText
            temp += digits.innerText
           
            if(display.innerText[display.innerText.length-1] == "+"||
               display.innerText[display.innerText.length-1] == "-"||
               display.innerText[display.innerText.length-1] == "*"||
               display.innerText[display.innerText.length-1] == "/"||
               display.innerText[display.innerText.length-1] == "="){
                //console.log("prev: %.2f",num[0])
                //console.log("temp: %s",parseInt(temp))
                if(isNaN(parseInt(temp))){
                    num[i] = ans
                }
                else{
                    num[i] = parseFloat(temp)
                }
                temp = ""
                i++
            }
            if(display.innerText[display.innerText.length-1] == "="){
                //console.log(num[0])
                j=0
                ans = num[j]
                j++
                for(let index=0;index<display.textContent.length-1;index++){
                    if(display.textContent[index] == "+"){
                        ans += num[j]
                        j++
                    }
                    else if(display.textContent[index] == "-"){
                        ans -= num[j]
                        j++
                    }
                    else if(display.textContent[index] == "*"){
                        ans *= num[j]
                        j++
                    }
                    else if(display.textContent[index] == "/"){
                        ans /= num[j]
                        j++
                    }
                }
                //console.log("ans: %s",ans)
                display.textContent = ans
                num.splice(0,num.length)
                i=0
                num[0] = ans
                //console.log("num[0]: %.2f",num[0])
            }
        }
    })
})