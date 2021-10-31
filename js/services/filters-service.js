`use strict`;

const gFilters = [
  `Funny`,
  `Animal`,
  `Men`,
  `Woman`,
  `Smile`,
  `Angry`,
  `Sad`,
  `Nervous`,
  `Sarcastic`,
  `Crazy`,
];

var gFiltersInPage = 6;
var gFiltersCurrIdx = 0;

function filterBySearch() {
  var filter = document.querySelector('.search-input').value;
  filter = filter.toLowerCase();
  filter = filter.charAt(0).toUpperCase() + filter.slice(1);
  renderGalleryByFilter(filter);
}

function addFiltersCurrIdx() {
  gFiltersCurrIdx++;
}

function setGFilters(num) {
  gFiltersInPage = num;
  renderFileters();
}

function getfiltersInPage() {
  return gFiltersInPage;
}

function getGFiltersCurrIdx() {
  return gFiltersCurrIdx;
}

function getGFilters() {
  return gFilters;
}

function getFilterIdx(filter) {
  return gFilters.indexOf(filter);
}
