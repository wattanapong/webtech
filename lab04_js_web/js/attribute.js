const imageUrls = [
    'img/img28.jpg',
    'img/img29.jpg',
    'img/img30.jpg',
    'img/img31.jpg'
];

showthumbnail = () => {
    let thumbnail = document.getElementsByClassName('thumbnail')[0]
    imageUrls.forEach((url, index) => {
        const thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('thumbnail');
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = url;
        thumbnailElement.appendChild(thumbnailImg)
        thumbnail.appendChild(thumbnailElement)
    })
}

let addclick = document.getElementsByClassName('addclick')[0]
addclick.addEventListener('click', () => showthumbnail())

show = (url) => {
    let galleryImg = document.querySelector('.gallery img')
    if (!galleryImg) {
        // Create image tag
        galleryImg = document.createElement('img');
    }
    // Add image source
    galleryImg.src = url;

    // Add image tag to element
    let gallery = document.getElementsByClassName('gallery')[0]
    gallery.appendChild(galleryImg)
}

// Accessing content of element
let gallery = document.getElementsByClassName('gallery')[0]
let result = document.getElementsByClassName('result')[0]

result.innerText = gallery.innerHTML

// result.innerText = gallery.innerText
