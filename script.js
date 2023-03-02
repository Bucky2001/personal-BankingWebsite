'use strict';

///////////////////////////////////////
// Modal window

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContant = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const allSection = document.querySelectorAll('.section');
const allImage = document.querySelectorAll('.features__img');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // const section1Cord = section1.getBoundingClientRect();

  // old way of doing scroll
  // window.scrollTo({
  //   left: section1Cord.left + window.pageXOffset,
  //   top: section1Cord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link') && id !== '#')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(k => k.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContant.forEach(a => a.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//

const hover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = e.target;
    const sibling = links.closest('.nav').querySelectorAll('.nav__link');
    const logo = links.closest('.nav').querySelector('.nav__logo');

    sibling.forEach(s => {
      if (s !== links) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

//

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headObserver.observe(header);

//

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//

const revealImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // console.log(entry.target.dataset.src);
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
allImage.forEach(section => {
  imageObserver.observe(section);
  section.classList.add('lazy-img');
});

// let curSlide = 0;
// const slides = document.querySelectorAll('.slide');
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const leftArrowBtn = document.querySelector('.slider__btn--left');
  const rightArrowBtn = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currSlide = 0;
  const maxSlides = slides.length;
  // dot creation and activating

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}" ></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(s => s.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //////////////////////////////////////////

  const resetSlider = currSlide => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currSlide)}%)`;
    });
  };

  const init = function () {
    resetSlider(currSlide);
    createDots();
    activateDot(currSlide);
  };
  init();

  const nextSlide = () => {
    if (currSlide < maxSlides - 1) currSlide++;
    else {
      currSlide = 0;
    }
    resetSlider(currSlide);
    activateDot(currSlide);
  };
  const previousSlide = () => {
    if (currSlide === 0) currSlide = maxSlides - 1;
    else {
      currSlide--;
    }
    resetSlider(currSlide);
    activateDot(currSlide);
  };
  // const sliderBothSides = function () {
  //   this ? currSlide++ : currSlide--;
  //   if (currSlide < maxSlides && currSlide >= 0) {
  //     resetSlider(currSlide);
  //   } else if (this) {
  //     currSlide = 0;
  //     resetSlider(currSlide);
  //   } else {
  //     currSlide = maxSlides - 1;
  //     resetSlider(currSlide);
  //   }
  // };

  rightArrowBtn.addEventListener('click', nextSlide);
  leftArrowBtn.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') previousSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      resetSlider(slide);
      activateDot(slide);
    }
  });
};
slider();
