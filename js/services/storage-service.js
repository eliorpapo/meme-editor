`use strict`;

function saveCanvasToLocalStorage() {
  const imgData = getBase64Image();
  gSavedMemeList[`img${gSavedMemeNum}`] = { imgData };
  gSavedMemeNum++;
  localStorage.setItem(`saved memes`, JSON.stringify(gSavedMemeList));
  putMemesImgContainer();
}

function getBase64Image() {
  const dataURL = gElCanvas.toDataURL('image/png');
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

function loadFromStorage(i) {
  const dataImage = JSON.parse(localStorage.getItem(`saved memes`));
  const imgId = `img` + i;
  const elSavedImg = document.getElementById(`tableBanner-${i}`);
  elSavedImg.src = `data:image/png;base64,${dataImage[imgId].imgData}`;
  const a = document.getElementById(`a-img-${i}`);
  a.href = `data:image/png;base64,${dataImage[imgId].imgData}`;
}
