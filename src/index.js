import './styles.css';

import Carousel from './Classes/Carousel.js';

const carouselContainer = document.querySelector('.carousel');
const carouselDots = document.querySelector('.carousel__dots');
const carouselSlides = Array.from(document.querySelector('.images').children);
const nextBtn = document.querySelector('.carousel__next');
const prevBtn = document.querySelector('.carousel__prev');

const dot = document.createElement('div');
dot.classList.add('dot');

const dotCircle = document.createElement('div');
dotCircle.classList.add('dot__circle');

dot.append(dotCircle);

const activeDot = dot.cloneNode(true);
activeDot.classList.add('dot--active');

const carousel = new Carousel(
    carouselContainer,
    carouselSlides,
    carouselDots,
    dot,
    activeDot
);

carousel.slideTransition = '400ms ease-in-out';

nextBtn.addEventListener('click', () => carousel.next());
prevBtn.addEventListener('click', () => carousel.prev());
