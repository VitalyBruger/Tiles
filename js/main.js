window.onload = function() {
  CreateTiles();
  NewGame();
}
var tilesCount = 16;
var rowCount = 4;
var tiles = [];
var tilesColor = [];
var firstClick = -1;
var secondClick = -1;
var canClick = true;
var bgColor = "#fff";
var openTiles = tilesCount;


function CreateTiles() {
  var board = document.getElementById("board");
  for (var i = 0; i < tilesCount; i++) {
    var newElem = document.createElement('div');
    newElem.className = "tile";
    newElem.setAttribute("id", i);
    board.appendChild(newElem);
    tiles[i] = newElem;
  }
  addHandler(board, 'mouseup', clickOnBoard);
}


function NewGame() {
  openTiles = tilesCount;
  setTileColor();
  tiles.forEach(function(elem) {
    elem.style.visibility = "";
    elem.style.backgroundColor = bgColor;
  });
}



function clickOnBoard(e) {
  if (!canClick) return;
  canClick = false;
  if (firstClick < 0) {
    firstClick = e.srcElement.id;
    tiles[e.srcElement.id].style.backgroundColor = tilesColor[firstClick];
    canClick = true;
  } else {
    if (e.srcElement.id == firstClick) {
      canClick = true;
      return;
    }
    secondClick = e.srcElement.id;
    tiles[e.srcElement.id].style.backgroundColor = tilesColor[secondClick];
    if (tilesColor[firstClick] == tilesColor[secondClick]) {
      setTimeout(function() {
        tiles[firstClick].style.visibility = "hidden";
        tiles[secondClick].style.visibility = "hidden";
        firstClick = -1;
        secondClick = -1;
        openTiles -= 2;
        canClick = true;
        if (openTiles == 0) {
          NewGame();
        }
      }, 1000)
    } else {
      setTimeout(function() {
        tiles[firstClick].style.backgroundColor = bgColor;
        tiles[secondClick].style.backgroundColor = bgColor;
        firstClick = -1;
        secondClick = -1;
        canClick = true;
      }, 1000)

    }

  }

}


function setTileColor() {
  var tmp = [];
  for (var i = 0; i < tilesCount; i++) {
    tmp[i] = i;
  }
  var emptyTiles = tilesCount;
  for (i = 0; i < tilesCount / 2; i++) {

    var newColor = getRandomColor();



    var next = getRandomInt(0, emptyTiles);
    tilesColor[tmp[next]] = newColor;
    emptyTiles--;
    tmp[next] = tmp[emptyTiles];

    next = getRandomInt(0, emptyTiles);
    tilesColor[tmp[next]] = newColor;
    emptyTiles--;
    tmp[next] = tmp[emptyTiles];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function addHandler(object, event, handler) {
  if (object.addEventListener) {
    object.addEventListener(event, handler, false);
  } else if (object.attachEvent) {
    object.attachEvent('on' + event, handler);
  } else alert("Обработчик не поддерживается");
}