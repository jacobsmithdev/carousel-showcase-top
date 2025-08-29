export default class Carousel {
    #activeSlide = 0;

    constructor(
        container,
        slides,
        dotsWrapper = null,
        dotTemplate = null,
        activeDotTemplate = null
    ) {
        this.element = container;
        this.element.style.overflow = 'clip';
        this.element.style.position = 'relative';
        this.element.style.zIndex = '0';

        if (dotsWrapper) this.dotsWrapper = dotsWrapper;
        if (dotTemplate) this.dotTemplate = dotTemplate;
        if (activeDotTemplate) this.activeDotTemplate = activeDotTemplate;

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

        this.#renderDots();
    }

    get slideTransition() {
        return this.slidesWrapper.style.transition;
    }

    set slideTransition(value) {
        if (!value) this.slidesWrapper.style.transition = '';
        this.slidesWrapper.style.transition = `transform ${value}`;
    }

    get activeSlide() {
        return this.#activeSlide;
    }

    set activeSlide(value) {
        if (typeof value !== 'number') return;

        // Ensure value is in the range [-slides.length, slides.length]
        // by using the modulus operator
        value = value % this.slides.length;

        // If value is negative, treat number as starting at 'end' of slides
        if (value < 0) {
            value = this.slides.length + value;
        }

        this.#activeSlide = value;
        this.slidesWrapper.style.transform = `translateX(calc(-100% * ${this.#activeSlide}))`;
        this.#renderDots();
    }

    hasDots() {
        return this.dotsWrapper && this.dotTemplate && this.activeDotTemplate;
    }

    #renderDots() {
        if (!this.hasDots()) return;

        this.dotsWrapper.textContent = '';

        for (let index = 0; index < this.slides.length; index++) {
            if (index === this.activeSlide) {
                const activeDot = this.activeDotTemplate.cloneNode(true);
                activeDot.addEventListener(
                    'click',
                    () => (this.activeSlide = index)
                );
                this.dotsWrapper.append(activeDot);
            } else {
                const dot = this.dotTemplate.cloneNode(true);
                dot.addEventListener('click', () => (this.activeSlide = index));
                this.dotsWrapper.append(dot);
            }
        }
    }

    next() {
        this.activeSlide++;
    }

    prev() {
        this.activeSlide--;
    }
}
