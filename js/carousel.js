// const carousel = document.getElementById('carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let index = 0;

function moveCarousel() {
    index = (index + 1) % 3; // Assuming 3 slides
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function moveToPrevious() {
    index = (index - 1 + 3) % 3; // Wrap around to last slide
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function moveToNext() {
    moveCarousel();
}

prevButton.addEventListener('click', moveToPrevious);
nextButton.addEventListener('click', moveToNext);

setInterval(moveCarousel, 3000); // Auto slide every 3 seconds