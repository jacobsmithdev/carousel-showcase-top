import './styles.css';

import Carousel from './Classes/Carousel';

const container = document.querySelector('.carousel');
const slidesArr = Array.from(
    document.querySelector('.carousel__slides').children
);
const nextBtn = document.querySelector('.carousel__next');
const prevBtn = document.querySelector('.carousel__prev');

const carousel = new Carousel(container, slidesArr);

nextBtn.addEventListener('click', () => carousel.next());
prevBtn.addEventListener('click', () => carousel.prev());

document.body.append(carousel.element);
