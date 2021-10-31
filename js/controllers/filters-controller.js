`use strict`;

function renderFileters() {
  var strHtml = ``;
  for (var i = 0; i < gFiltersInPage; i++) {
    strHtml += `  <li value="${gFilters[gFiltersCurrIdx]}" onclick="increaseFont(this)" class="filter-item filter-${gFiltersCurrIdx}">
        <button>${gFilters[gFiltersCurrIdx]}</button>
      </li>`;
    gFiltersCurrIdx++;
    if (gFiltersCurrIdx === gFilters.length) gFiltersCurrIdx = 0;
  }
  var filtersContainer = document.querySelector(`.filters-nav`);
  filtersContainer.innerHTML = strHtml;
}

function moreFilters() {
  renderFileters();
}

function increaseFont(name) {
  const filter = name.getAttribute('value');
  const filterIdx = getFilterIdx(filter);
  const elFilter = document.querySelector(`.filter-${filterIdx} button`);
  const fontSize = window.getComputedStyle(elFilter, null).getPropertyValue('font-size');
  currentSize = parseFloat(fontSize);
  if(currentSize > 30){
    elFilter.style.fontSize = 1+`rem`
  } else elFilter.style.fontSize = (currentSize + 2) + 'px';
  renderGalleryByFilter(filter);
}