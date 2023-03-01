let data;
let sheet;
let sprites = [];

let board = []; // board, but that name was taken
let offset = 0.85; // How much smaller the pieces are than the squares

function preload() {
  data = loadXML("spritesheet/data.xml");
  sheet = loadImage("spritesheet/sheet.png");
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Cut out sheet according to data and push cutouts to array
  let children = data.getChildren("sprite");
  for (let i = 0; i < children.length; i++) {
    let x = children[i].getNum("x");
    let y = children[i].getNum("y");
    let w = children[i].getNum("w");
    let h = children[i].getNum("h");

    sprites.push(sheet.get(x, y, w, h));
  }

  newGame();
  console.log(board);
}

function draw() {
  background(240);
  drawBoard();
}

// Function that creates the board array
function newGame() {
  // Creates board full of empty tiles
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push("empty");
    }
  }

  // Adds a single white pawn on d2
  board[3].splice(6, 1, new Pawn(1));
}

function drawBoard() {
  noStroke();
  let boardSideLength = height - (height / 20) * 2;
  let squareSideLength = boardSideLength / 8;
  let r = 0;
  u = true;
  //Creates colored squares
  for (let j = 0; j <= 7; j++) {
    let t = 0;
    u = !u;
    if (u == true) {
      for (let i = 0; i <= 3; i++) {
        //Dark color
        fill(66, 48, 32);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
        //Light color
        fill(213, 176, 122);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
      }
    } else {
      for (let i = 0; i <= 3; i++) {
        //Light color
        fill(213, 176, 122);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
        //Dark color
        fill(66, 48, 32);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
      }
    }
  
    r++;
  }

  //Numbers at the side
  fill(213, 176, 122);
  re


  // Add piece sprites
  push();
  translate(
    (width - boardSideLength) / 2 + squareSideLength / 2,
    (height - boardSideLength) / 2 + squareSideLength / 2
  );
  board.forEach(function (row, i) {
    row.forEach(function (tile, j) {
      if (tile != "empty") {
        let temp = tile.sprite;
        imageMode(CENTER);
        image(
          temp,
          i * squareSideLength,
          j * squareSideLength,
          temp.width * (squareSideLength / temp.height) * offset,
          squareSideLength * offset
        );
      }
    });
  });
  pop();
}
