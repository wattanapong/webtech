const imageUrls = [
    'img/img28.jpg',
    'img/img29.jpg',
    'img/img30.jpg',
    'img/img31.jpg'
];

let addclick = document.getElementsByClassName('addclick')[0]
addclick.addEventListener('click', () => showthumbnail())

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

show = (url) => {
    // let gallery = document.getElementsByClassName('gallery')[0]
    const galleryImg = document.querySelector('.gallery img')
    if (!galleryImg){
        const galleryImg = document.createElement('img');
    }
    galleryImg.src = url;

    let gallery = document.getElementsByClassName('gallery')[0]
    gallery.appendChild(galleryImg)    

}

let gallery = document.getElementsByClassName('gallery')[0]
let result = document.getElementsByClassName('result')[0]


// var text  = gallery.textContent || gallery.innerText;

result.innerHTML = gallery.innerHTML

// result.innerHTML = gallery.innerText

