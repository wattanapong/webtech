const content = document.getElementsByClassName('content')[0]

async function render(page) {
    response = await fetch(page)
    content.innerHTML = await response.text()
}

render('main')

