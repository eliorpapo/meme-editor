`use strict`;

function init() {
  addEventsListenerToTextInput();
  addEventsListenerToSearchBtn();
  createImgs();
  setCanvas();
  renderFileters();
  renderGallery();
}

function addEventsListenerToTextInput() {
  var input = document.getElementById('text');
  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector('.add-text-btn').click();
    }
  });
}

function addEventsListenerToSearchBtn() {
  var input = document.getElementById('search-input');
  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector('.add-text-btn').click();
    }
  });
}

const mediaQueryLrg = window.matchMedia('(min-width: 1096px)');

mediaQueryLrg.addListener(handleTabletChangeLrg);
handleTabletChangeLrg(mediaQueryLrg);

function handleTabletChangeLrg() {
  if (mediaQueryLrg.matches) setGFilters(6);
  else setGFilters(4);
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}
const navLink = document.querySelectorAll('.nav-item');
navLink.forEach((n) => n.addEventListener('click', closeMenu));

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

var form = document.querySelector('.search-form');
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener('submit', handleForm);
