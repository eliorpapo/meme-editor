`use strict`;

function renderGallery() {
  const elGallery = document.querySelector(`.gallery-grid-container`);
  var strHtml = ``;
  const imgsNum = getGImgsLength();
  for (var i = 0; i < imgsNum; i++) {
    strHtml += `<img class="img-${i}" onclick="changeMemeImg(${i})"
      src="./imgs/meme-imgs (various aspect ratios)/${i + 1}.jpg"/>`;
  }
  elGallery.innerHTML = strHtml;
}

function renderGalleryByFilter(filter) {
  var imgs = [];
  var elGallery = document.querySelector(`.gallery-grid-container`);
  var strHtml = ``;
  imgs = filterImgs(filter);
  for (var i = 0; i < imgs.length; i++) {
    strHtml += `<img onclick="changeMemeImg(${imgs[i].id - 1})"
      src="./imgs/meme-imgs (various aspect ratios)/${imgs[i].id}.jpg"/>`;
  }
  elGallery.innerHTML = strHtml;
  var elSavedMemesContainer = document.querySelector(`.main-meme`);
  elSavedMemesContainer.style.display = 'none';
}

function showGallery() {
  var elCanvas = document.querySelector(`.canvas-container`);
  var elGallery = document.querySelector(`.main-gallery-container`);
  var elSavedMemesContainer = document.querySelector(`.main-meme`);
  elSavedMemesContainer.style.display = 'none';
  elGallery.style.display = 'block';
  elCanvas.style.display = 'none';
  renderGallery();
}

function filterImgs(filter) {
  var imgs = [];
  const gImgs = getGImgs();
  for (var i = 0; i < gImgs.length; i++) {
    var img = isImgFiltered(gImgs[i], filter);
    if (img.length > 0) {
      imgs.push(gImgs[i]);
    }
  }
  return imgs;
}

function isImgFiltered(img, filter) {
  return img.keywords.filter((keyword) => {
    return keyword === filter;
  });
}

function showSavedMemes() {
  const elSavedMemesContainer = document.querySelector(`.main-meme`);
  const elCanvas = document.querySelector(`.canvas-container`);
  const elGallery = document.querySelector(`.main-gallery-container`);
  elGallery.style.display = 'none';
  elCanvas.style.display = 'none';
  elSavedMemesContainer.style.display = `block`;
  putMemesImgContainer();
}