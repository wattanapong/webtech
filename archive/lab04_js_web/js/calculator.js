const digits = document.querySelectorAll('button')
const display = document.getElementById('display')
const operators = ['+', '-', '*', '/']

var n1 = 0
var n2 = ""
var operator = ""

digits.forEach((digit, index) => {

    digit.addEventListener('click', () => {

        if (digit.innerText == "C") {
            display.innerText = "0"
            n1 = 0
            n2 = ""
            operator = ""
        } else if (operators.includes(digit.innerText)) {
            n1 = parseFloat(display.textContent)
            n2 = ""
            display.textContent += digit.innerText
            operator = digit.innerText
        } else if (digit.innerText == "=") {
            if (operator == "" || n2 == "") return
            display.textContent = cal(n1, parseFloat(n2), operator)
            n2 = ""
            operator = ""
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

// Keyboard support: key -> index of the button in #buttons
const keys = {'7':0,'8':1,'9':2,'/':3,'4':4,'5':5,'6':6,'*':7,
    '1':8,'2':9,'3':10,'-':11,
    '0':12,'.':13,'+':14,'=':15,'Enter':15,
    'c':16,'C':16,'Escape':16}

document.body.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.code);

    if (event.key in keys) {
        event.preventDefault()
        digits[keys[event.key]].click();
    }
});
