
document.addEventListener('DOMContentLoaded', function () {
    const thumbnailsContainer = document.getElementById('thumbnails');
    const galleryContainer = document.getElementById('gallery');

    // Replace these URLs with your image URLs
    const imageUrls = [
        'img/img28.jpg',
        'img/img29.jpg',
        'img/img30.jpg',
        'img/img31.jpg'
    ];

    imageUrls.forEach((url, index) => {
        // Create thumbnail
        const thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('thumbnail');
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = url;
        thumbnailImg.addEventListener('click', () => displayImage(index));
        thumbnailElement.appendChild(thumbnailImg);
        thumbnailsContainer.appendChild(thumbnailElement);

        // Create full-size image
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Gallery Image';
        galleryContainer.appendChild(imgElement);
    });

    // Display the first image by default
    displayImage(0);

    function displayImage(index) {
        // Hide all images
        const allImages = galleryContainer.querySelectorAll('img');
        allImages.forEach(img => img.style.display = 'none');

        // Show the selected image
        allImages[index].style.display = 'block';
    }
});
