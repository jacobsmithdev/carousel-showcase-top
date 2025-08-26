import './styles.css';

import Carousel from './Classes/Carousel';

const container = document.querySelector('.carousel');
const slidesArr = Array.from(
    document.querySelector('.carousel__slides').children
);
const nextBtn = document.querySelector('.carousel__next');
const prevBtn = document.querySelector('.carousel__prev');

const dotsWrapper = document.querySelector('.carousel__dots');
const dot = document.createElement('div');
dot.classList.add('carousel__dot');

const selectedDot = document.createElement('div');
selectedDot.classList.add('carousel__dot');
selectedDot.classList.add('carousel__dot--selected');

const carousel = new Carousel(
    container,
    slidesArr,
    dotsWrapper,
    dot,
    selectedDot
);

nextBtn.addEventListener('click', () => carousel.next());
prevBtn.addEventListener('click', () => carousel.prev());

document.body.append(carousel.element);
