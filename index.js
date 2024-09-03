"use strict";

// DOM
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav__links");
const links = document.querySelectorAll(".nav__link");
const navToggle = document.querySelector(".mobile-nav-toggle");
const sections = document.querySelectorAll("section");
const destinationNav = document.querySelectorAll(".destination__nav");
const destinationNavLinks = document.querySelectorAll(".nav .nav__link");
const explore = document.querySelector(".explore");
const columnImg = document.querySelector(".column img");
const sliderImg = document.querySelector(".slider--img img");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const buttons = document.querySelector(".buttons");
const btns = document.querySelectorAll(".btn");
const techSlider = document.querySelector(".slider");
const allTechSlide = document.querySelectorAll(".tech");
const techImg = document.querySelector(".tech-img img");
// DOM

// Images
const images = {
  bgImagesDesktop: [
    "starter-code/assets/home/background-home-desktop.jpg",
    "starter-code/assets/destination/background-destination-desktop.jpg",
    "starter-code/assets/crew/background-crew-desktop.jpg",
    "starter-code/assets/technology/background-technology-desktop.jpg",
  ],

  bgImagesTablet: [
    "starter-code/assets/home/background-home-tablet.jpg",
    "starter-code/assets/destination/background-destination-tablet.jpg",
    "starter-code/assets/crew/background-crew-tablet.jpg",
    "starter-code/assets/technology/background-technology-tablet.jpg",
  ],

  bgImagesMobile: [
    "starter-code/assets/home/background-home-mobile.jpg",
    "starter-code/assets/destination/background-destination-mobile.jpg",
    "starter-code/assets/crew/background-crew-mobile.jpg",
    "starter-code/assets/technology/background-technology-mobile.jpg",
  ],

  destinationImages: [
    "starter-code/assets/destination/image-moon.png",
    "starter-code/assets/destination/image-mars.png",
    "starter-code/assets/destination/image-europa.png",
    "starter-code/assets/destination/image-titan.png",
  ],

  crewImages: [
    "starter-code/assets/crew/image-douglas-hurley.png",
    "starter-code/assets/crew/image-mark-shuttleworth.png",
    "starter-code/assets/crew/image-victor-glover.png",
    "starter-code/assets/crew/image-anousheh-ansari.png",
  ],

  technologyPortraitImages: [
    "starter-code/assets/technology/image-launch-vehicle-portrait.jpg",
    "starter-code/assets/technology/image-spaceport-portrait.jpg",
    "starter-code/assets/technology/image-space-capsule-portrait.jpg",
  ],

  technologyLandscapeImages: [
    "starter-code/assets/technology/image-launch-vehicle-landscape.jpg",
    "starter-code/assets/technology/image-spaceport-landscape.jpg",
    "starter-code/assets/technology/image-space-capsule-landscape.jpg",
  ],
};

const getBackgroundImages = () => {
  if (window.matchMedia("(max-width: 781px)").matches) {
    return images.bgImagesMobile;
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    return images.bgImagesTablet;
  } else {
    return images.bgImagesDesktop;
  }
};

navToggle.addEventListener("click", () => {
  const visibility = navLinks.getAttribute("data-visible");

  if (visibility === "false") {
    navToggle.setAttribute("aria-expanded", true);
    navLinks.setAttribute("data-visible", true);
  } else {
    navLinks.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// getting nav and section function
const getLinkSection = (index, clicked = null) => {
  // Remove active state from all links
  links.forEach((link) => link.classList.remove("link--active"));

  // Add active state to the clicked link
  links[index].classList.add("link--active");

  // Hide all sections
  sections.forEach((sect) => (sect.style.display = "none"));

  // Determine the section to activate
  const sectionClass = clicked
    ? `section--${clicked.dataset.section}`
    : "section--2";
  document.querySelector(`.${sectionClass}`).style.display = "block";

  // Get the appropriate background images array based on screen size
  const bgImages = getBackgroundImages();

  // Change background image based on the index
  document.body.style.backgroundImage = `url(${bgImages[index]})`;
};

// link for section
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target.closest(".nav__link");
  if (!clicked) return;

  // Get the index of the clicked li
  const navItems = Array.from(navLinks.querySelectorAll(".nav__link"));
  const index = navItems.indexOf(clicked);
  if (index === -1) return;

  getLinkSection(index, clicked);
});

// Update background image on window resize
window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 781px)").matches) {
    document.querySelector(".tech-img img").src =
      images.technologyLandscapeImages[0];
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    document.querySelector(".tech-img img").src =
      images.technologyLandscapeImages[0];
  } else {
    document.querySelector(".tech-img img").src =
      images.technologyPortraitImages[0];
  }

  const activeLink = document.querySelector(".nav__link.active");
  if (activeLink) {
    const index = Array.from(navLinks.querySelectorAll(".nav__link")).indexOf(
      activeLink
    );
    const bgImages = getBackgroundImages();
    document.body.style.backgroundImage = `url(${bgImages[index]})`;
  }
});

explore.addEventListener("click", () => {
  getLinkSection(1);
});

// link for destination
destinationNavLinks.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest(".nav__link");
    if (!clicked) return;

    // Hide all destination div and Remove active class from all nav__link elements
    destinationNavLinks.forEach((link) =>
      link.classList.remove("destination__nav--active")
    );
    destinationNav.forEach((dest) => (dest.style.display = "none"));

    // show the clicked destination and Add active class to the clicked nav__link
    clicked.classList.add("destination__nav--active");
    document.querySelector(
      `.destination--${clicked.dataset.destination}`
    ).style.display = "block";

    // Change column image based on the index
    columnImg.src = images.destinationImages[i];
  });
});

//slider function
const slider = () => {
  // create dots
  const createDots = () => {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${i}'></button>`
      )
    );
  };

  const activateDot = (slide) => {
    // remove dots__active
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // add active to current dot clicked
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  createDots();
  activateDot(0);

  dotContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      activateDot(slide);
      slides.forEach((s) => (s.style.display = "none"));
      document.querySelector(`.slide--${slide}`).style.display = "block";
      sliderImg.src = images.crewImages[+slide];
    }
  });
};
slider();

const getScreenSizeImages = () => {
  if (window.matchMedia("(max-width: 780px)").matches) {
    return images.technologyLandscapeImages;
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    return images.technologyLandscapeImages;
  } else {
    return images.technologyPortraitImages;
  }
};

buttons.addEventListener("click", (e) => {
  const check = e.target.closest(".btn");
  if (!check) return;

  if (e.target.classList.contains("btn")) {
    const { tech } = e.target.dataset;

    // remove btn--active
    btns.forEach((btn) => btn.classList.remove("btn--active"));

    // add active to current btn clicked
    e.target.classList.add("btn--active");

    allTechSlide.forEach((tech) => (tech.style.display = "none"));
    document.querySelector(`.tech--${+tech}`).style.display = "block";

    const images = getScreenSizeImages();

    document.querySelector(".tech-img img").src = images[tech];
  }
});
