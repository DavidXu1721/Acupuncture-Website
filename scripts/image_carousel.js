const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-arrow-button__right');
const prevButton = document.querySelector('.carousel-arrow-button__left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    // check if the target slide actually exists
    if (!targetSlide) {
        // I would have liked to add looping, but I also want to make it possible to traverse multiple slides quickly, it'll honestly be too complicated
        return;
    }

    // find out how much the track needs to move
    const amountToMove = targetSlide.style.left;

    // move to the target slide
    track.style.transform = 'translateX(-' + amountToMove + ')';

    //update the current slide
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    const targetIndex = slides.findIndex(slide => {return slide === targetSlide})

    //update the nav indicator dots
    dots[slides.findIndex(slide => {return slide === currentSlide})].classList.remove('selected-indicator');
    dots[targetIndex].classList.add('selected-indicator');

    //update the arrow buttons if the track is at one end
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');

    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        nextButton.classList.add('is-hidden');
    } 

}

let slideWidth

function updateSlide() {
    slideWidth = slides[0].getBoundingClientRect().width;
    console.log(slideWidth)
    
    // rearrange the slides next to one another
    slides.forEach(setSlidePosition)
}

updateSlide()

// update the slide whenever the window is resized
window.onresize = updateSlide;

// console.log(slideWidth);

// when i click left, move slides to the left
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
})

// when I click right, move slides to the right
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
})

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // check what indicator was clicked on, if at all
    const targetDot = e.target.closest('.carousel-indicator');

    if (!targetDot) {
        return;
    }
    
    // find the current and target slides and dots
    const currentSlide = track.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => {return dot === targetDot});
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
})

// this is just to do the setup for the arrow buttons when you first load the website
moveToSlide(track, slides[0], slides[0])