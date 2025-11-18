
const digits = document.querySelectorAll('button')
const display = document.getElementById('display')

var n1 = 0
var n2 = ""
var operator = ""

digits.forEach((digit, index) => {
    number = parseInt(digit.innerText)
    operators = ['+', '-', '*', '/']

    digit.addEventListener('click', () => {

        if (digit.innerText == "C") {
            display.innerText = "0"
            n1 = 0
            n2 = ""
        } else if (operators.includes(digit.innerText)) {
            n1 = parseInt(display.textContent)
            n2 = ""
            display.textContent += digit.innerText
            operator = digit.innerText
        } else if (digit.innerText == "=") {
            n2 = parseInt(n2)
            display.textContent = cal(n1, n2, operator)
            n2 = ""
        }
        else {
            if (display.innerText == "0") {
                display.innerText = ""
            }
            display.textContent += digit.innerText
            n2 += digit.innerText
            console.log(n1, n2)
        }
    })

})

cal = (n1, n2, oper) => {
    if (oper == "+")
        return n1 + n2
    else if (oper == "-")
        return n1 - n2
    else if (oper == "*")
        return n1 * n2
    else if (oper == "/")
        return n1 / n2
}

