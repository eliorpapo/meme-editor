`use strict`;

function showImg() {
  const img = new Image();
  if (!gIsImgOn) {
    img.onload = function () {
      resizeCanvas(img.width, img.height);
    };
  }
  // We will never "talk" with the model from the controller.
  const imgIdx = gMeme.selectedImgId;
  img.src = gImgs[imgIdx].url;
  const hRatio = gElCanvas.width / img.width;
  const vRatio = gElCanvas.height / img.height;
  const ratio = Math.min(hRatio, vRatio);
  const centerShift_x = (gElCanvas.width - img.width * ratio) / 2;
  const centerShift_y = (gElCanvas.height - img.height * ratio) / 2;
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gCtx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
  gIsImgOn = true;
}

function addAllText() {
  const lines = getMemeLinesNum();
  for (var i = 0; i < lines; i++) {
    addText(i);
  }
}

function addText(i) {
  const colorStrok = getMemeLineColorStrok(i);
  const fontFamily = getMemeLineFontFamily(i);
  const fontSize = getMemeLineSize(i);
  gCtx.font = `${fontSize}px ${fontFamily}`;
  const fontColor = getMemeLineColor(i);
  gCtx.fillStyle = `${fontColor}`;
  gCtx.lineWidth = 5;
  gCtx.textAlign = getMemeLineAlign(i);
  const getLinePos = getMemeLinePos(i);
  const txt = getMemeLineTxt(i);
  gCtx.strokeStyle = colorStrok;
  gCtx.strokeText(txt, getLinePos.horizontal, getLinePos.vertical);
  gCtx.fillText(txt, getLinePos.horizontal, getLinePos.vertical);
  gCtx.textAlign = `start`;
}

function OnAddLine() {
  var pos;
  const txt = document.getElementById('text').value;
  if (!txt) return;
  const lines = getMemeLinesNum();
  const elCanvas = getElCanvas();
  const canvasHeight = elCanvas.height;
  if (lines === 0) {
    pos = { horizontal: 100, vertical: 70 };
  } else if (lines === 1) {
    pos = { horizontal: 100, vertical: canvasHeight - 50 };
  } else pos = { horizontal: 100, vertical: canvasHeight / 2 };
  var _ = undefined;
  addMemeLine(txt, _, _, _, pos, _, _);
}

function showCanvas() {
  const elCanvas = document.querySelector(`.canvas-container`);
  const elGallery = document.querySelector(`.main-gallery-container`);
  const elSavedMemesContainer = document.querySelector(`.main-meme`);
  elGallery.style.display = 'none';
  elSavedMemesContainer.style.display = 'none';
  elCanvas.style.display = 'flex';
}

function clearCanvas() {
  const elCanvas = getElCanvas();
  gCtx.clearRect(0, 0, elCanvas.width, elCanvas.height);
}

function changeFont(byNum) {
  changeMemeFont(byNum);
  resetCanvas();
}

function changeFontVertical(byNum) {
  changeMemeLineVertical(byNum);
  resetCanvas();
}

function changeStrokeColor(ev) {
  const col = ev.target.value;
  changeMemeStrokeColor(col);
  changeGStrokCol(col);
  resetCanvas();
}

function changeFontColor(ev) {
  const col = ev.target.value;
  changeMemeFontColor(col);
  changeGFontCol(col);
  resetCanvas();
}
