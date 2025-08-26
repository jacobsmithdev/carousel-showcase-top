export default class Carousel {
    #activeSlide = 0;

    constructor(container, slides) {
        this.element = container;
        this.element.style.overflow = 'clip';
        this.element.style.position = 'relative';

        this.slidesWrapper = document.createElement('div');

        // To correctly fill up the this.element, slidesWrapper must
        // be its first child (thus prepend() and not append()).
        // Otherwise, it positions itself using a previous child
        // and fills this.element incorrectly.
        this.element.prepend(this.slidesWrapper);

        // Place wrapper underneath slide content
        this.slidesWrapper.style.position = 'absolute';
        this.slidesWrapper.style.zIndex = '-1';

        this.slidesWrapper.style.width = '100%';
        this.slidesWrapper.style.height = '100%';

        this.slidesWrapper.style.display = 'grid';
        this.slidesWrapper.style.gridAutoFlow = 'column';

        // Make each slide the same width as the wrapper
        this.slidesWrapper.style.gridAutoColumns = '100%';

        // Make each slide the same height as the wrapper
        this.slidesWrapper.style.gridTemplateRows = '100%';

        this.slides = slides;

        this.slides.forEach((slide) => {
            // Ensure each slide is exactly the width of slideWrapper
            slide.style.width = '100%';
            this.slidesWrapper.append(slide);
        });
    }

    get activeSlide() {
        return this.#activeSlide;
    }

    set activeSlide(value) {
        if (typeof value !== 'number') return;

        // Ensure value is within range [-slides.length, slides.length]
        // by using the modulus operator
        value = value % this.slides.length;

        // If value is negative, treat number as starting at 'end' of slides
        if (value < 0) {
            value = this.slides.length + value;
        }

        this.#activeSlide = value;
        this.slidesWrapper.style.transform = `translateX(calc(-100% * ${this.#activeSlide}))`;
    }

    next() {
        this.activeSlide++;
    }

    prev() {
        this.activeSlide--;
    }
}
