btn = document.querySelectorAll('button')

btn.forEach((button, index) => {
    button.addEventListener('click',()=>{
        alert('Good Job#' + (index+1) + '!')
    })

    button.addEventListener('mouseenter',()=>{
        button.disabled = true
    })
    
    button.addEventListener("mouseleave",()=>{
        button.disabled = false
    })
});

addEventListener('click',()=>{})


// const btn1 = document.getElementById("btn1")
// const btn2 = document.getElementById("btn2")

// btn1.addEventListener('mouseenter',()=>{
//     btn1.disabled = true
// })

// btn1.addEventListener("mouseleave",()=>{
//     btn1.disabled = false
// })

// btn2.addEventListener('mouseenter',()=>{
//     btn2.disabled = true
// })

// btn2.addEventListener("mouseleave",()=>{
//     btn2.disabled = false
// })

