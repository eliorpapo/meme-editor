`use strict`;

var gElCanvas;
var gCtx;

var gIsImgOn = false;
var gSavedMemeList = getSavedMemes();
var gSavedMemeNum = getMemeListNum();

var gStrokCol = `#000000`;
var gFontCol = `white`;

var gIsLineSelect = false;

function setCanvas() {
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = '';
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function selectLine(ev) {
  const { offsetX, offsetY } = ev;
  for (var i = 0; i < gMeme.lines.length; i++) {
    const currLineHeight = getMemeLinePos(i).vertical;
    if (currLineHeight - offsetY < 20 && currLineHeight - offsetY > -20) {
      changeMemeSelectedLine(i);
      drawLineBorder();
      gIsLineSelect = true;
      return;
    }
  }
}

function drawLineBorder() {
  const lineId = getMemeLineIdx();
  const textVerticalPos = getMemeLinePos(lineId).vertical;
  const fontHeight = getMemeLineSize(lineId);

  gCtx.beginPath();
  gCtx.rect(
    20,
    textVerticalPos - fontHeight - 10,
    gElCanvas.width - 30,
    fontHeight + 30
  );
  gCtx.lineWidth = 3;
  gCtx.strokeStyle = `white`;
  gCtx.stroke();
  gCtx.strokeStyle = `black`;
  gCtx.lineWidth = 5;
}

function textAlign(loc) {
  resetCanvas();
  drawLineBorder();
  const lineID = getMemeLinesNum();
  const lineIdx = getMemeLineIdx();
  const txt = getMemeLineTxt(lineIdx);
  const prePos = getMemeLinePos(lineIdx);
  const pos = setPos(loc, prePos, lineIdx);
  const preSize = getMemeLineSize(lineIdx);
  const preAlign = getMemeLineAlign(lineIdx);
  const preFontFamily = getMemeLineFontFamily(lineIdx);
  OnRemoveLine();
  addMemeLine(txt, undefined, undefined, preFontFamily, pos, preSize, preAlign);
  changeMemeSelectedLine(lineID - 1);
}

function setPos(loc, prePos, i) {
  var pos;
  const canvas = getElCanvas();
  const canvasWidth = canvas.width;
  switch (loc) {
    case `left`:
      pos = { horizontal: 20, vertical: prePos.vertical };
      break;
    case `center`:
      gCtx.textAlign = 'center';
      pos = { horizontal: canvasWidth / 2, vertical: prePos.vertical };
      break;
    case `right`:
      gCtx.textAlign = 'end';
      pos = { horizontal: canvasWidth - 20, vertical: prePos.vertical };
      break;
  }
  gMeme.lines[i].align = loc;
  return pos;
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
}

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg');
  function onSuccess(uploadedImgUrl) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

function resizeCanvas(W, H) {
  gElCanvas.width = W;
  gElCanvas.height = H;
  resetCanvas();
}

function resetCanvas() {
  clearCanvas();
  showImg();
  addAllText();
}

function changeGStrokCol(col) {
  gStrokCol = col;
}

function changeGFontCol(col) {
  gFontCol = col;
}

function getElCanvas() {
  return gElCanvas;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
  selectLine(ev);
  var elCanvas = getElCanvas();
  elCanvas.style.cursor = 'grab';
}

function onMove(ev) {
  if (gIsLineSelect) {
    var elCanvas = getElCanvas();
    elCanvas.style.cursor = 'grabbing';
    const { offsetX, offsetY } = ev;
    resetCanvas();
    changeLinePos(offsetX, offsetY);
    drawLineBorder();
  }
}

function onUp() {
  gIsLineSelect = false;
  resetCanvas();
  var elCanvas = getElCanvas();
  elCanvas.style.cursor = 'crosshair';
}
