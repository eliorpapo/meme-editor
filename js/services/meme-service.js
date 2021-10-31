`use strict`;

var gId = 0;

var gImgs = [];

function createImgs() {
  createImg([`Sarcastic`, `Men`, `Funny`, `Crazy`, `Angry`]);
  createImg([`Animal`]);
  createImg([`Animal`, `Men`]);
  createImg([`Animal`]);
  createImg([`Sarcastic`, `Men`, `Funny`]);

  createImg([`Crazy`, `Men`, `Funny`]);
  createImg([`Men`, `Funny`]);
  createImg([`Sarcastic`, `Men`, `Funny`]);
  createImg([`Woman`, `Funny`, `Sarcastic`]);
  createImg([`Men`, `Funny`, `Smile`]);

  createImg([`Men`, `Funny`]);
  createImg([`Men`, `Sarcastic`]);
  createImg([`Men`]);
  createImg([`Men`, `Sad`, `Nervous`]);
  createImg([`Men`]);

  createImg([`Men`, `Funny`, `Sarcastic`]);
  createImg([`Men`, `Crazy`]);
  createImg([`Men`, `Funny`]);
  createImg([`Men`, `Angry`]);
  createImg([`Woman`]);

  createImg([`Men`, `Sarcastic`]);
  createImg([`Men`]);
  createImg([`Men`, `Funny`]);
  createImg([`Animal`, `Funny`]);
  createImg([`Woman`]);
}

function createImg(keywords) {
  var img = {
    id: gId++,
    url: `./imgs/meme-imgs (various aspect ratios)/${gId}.jpg`,
    keywords: keywords,
  };
  gImgs.push(img);
}

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [],
};

function addMemeLine(
  txt,
  strokeCol = `${gStrokCol}`,
  fontCol = `${gFontCol}`,
  fontFamily = `Import`,
  pos = { horizontal: 100, vertical: 100 },
  size = 30,
  align = `start`
) {
  gMeme.selectedLineIdx++;
  gMeme.lines.push({
    txt: txt,
    size: size,
    align: align,
    color: fontCol,
    fontFamily: fontFamily,
    strokeCol: strokeCol,
    pos: pos,
  });
  gCtx.textAlign = align;
  addText(gMeme.lines.length - 1);
}

function resetGMeme() {
  gMeme.lines = [];
  gMeme.selectedLineIdx = -1;
}

function changeMemeImg(imgId) {
  showCanvas();
  gMeme.selectedImgId = imgId;
  resetGMeme();
  resetCanvas();
}

function changeMemeFont(num) {
  gMeme.lines[gMeme.selectedLineIdx].size += num;
}

function changeMemeLineVertical(num) {
  gMeme.lines[gMeme.selectedLineIdx].pos.vertical += num;
}

function changeLinePos(horizontal, vertical) {
  gMeme.lines[gMeme.selectedLineIdx].pos.horizontal = horizontal;
  gMeme.lines[gMeme.selectedLineIdx].pos.vertical = vertical;
}

function chnageFontFamily(ev) {
  gMeme.lines[gMeme.selectedLineIdx].fontFamily = ev.target.value;
  resetCanvas();
}

function changeMemeSelectedLine(num) {
  gMeme.selectedLineIdx = num;
}

function changeMemeStrokeColor(col) {
  gMeme.lines[gMeme.selectedLineIdx].strokeCol = col;
}

function changeMemeFontColor(col) {
  gMeme.lines[gMeme.selectedLineIdx].color = col;
}

function changeMemeLine() {
  gMeme.selectedLineIdx === gMeme.lines.length - 1
    ? (gMeme.selectedLineIdx = 0)
    : gMeme.selectedLineIdx++;
  resetCanvas();
  drawLineBorder();
}

function OnRemoveLine() {
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines.splice(lineIdx, 1);
  gMeme.selectedLineIdx--;
  resetCanvas();
}

function putMemesImgContainer() {
  const elSavedMemesContainer = document.querySelector(
    `.memes-saved-container`
  );
  var strHtml = ``;
  for (var i = 0; i < gSavedMemeNum; i++) {
    strHtml += `<a id="a-img-${i}" href="#" download="img"><img src="" id="tableBanner-${i}" /></a>`;
  }
  elSavedMemesContainer.innerHTML = strHtml;
  for (var i = 0; i < gSavedMemeNum; i++) {
    loadFromStorage(i);
  }
}

function getMemeLineIdx() {
  return gMeme.selectedLineIdx;
}

function getMemeLineSize(i) {
  return gMeme.lines[i].size;
}

function getMemeLineColor(i) {
  return gMeme.lines[i].color;
}

function getMemeLinePos(i) {
  return gMeme.lines[i].pos;
}

function getMemeLineTxt(LineIdx) {
  return gMeme.lines[LineIdx].txt;
}

function getMemeLinesNum() {
  return gMeme.lines.length;
}

function getGImgsLength() {
  return gImgs.length;
}

function getMemeLineAlign(i) {
  return gMeme.lines[i].align;
}

function getMemeLineFontFamily(i) {
  return gMeme.lines[i].fontFamily;
}

function getMemeLineColorStrok(i) {
  return gMeme.lines[i].strokeCol;
}

function getGImgs() {
  return gImgs;
}

function getMemeListNum() {
  Object.size = function (gSavedMemeList) {
    var size = 0,
      key;
    for (key in gSavedMemeList) {
      if (gSavedMemeList.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(gSavedMemeList);
  return size;
}

function getSavedMemes() {
  var emptyObj = {};
  var dataImage = JSON.parse(localStorage.getItem(`saved memes`));
  if (!dataImage) return emptyObj;
  return dataImage;
}
