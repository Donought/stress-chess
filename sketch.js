let data;
let sheet;
let sprites = [];

let game = []; // board, but that name was taken

function preload() {
  data = loadXML("spritesheet/data.xml");
  sheet = loadImage("spritesheet/sheet.png");
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Cut out sheet according to data and push sprites to array
  let children = data.getChildren("sprite");
  for (let i = 0; i < children.length; i++) {
    let x = children[i].getNum("x");
    let y = children[i].getNum("y");
    let w = children[i].getNum("w");
    let h = children[i].getNum("h");

    sprites.push(sheet.get(x, y, w, h));
  }

  newGame();

  console.log(game);
}

function draw() {
  background(240);
  board();

  // Just to illustrate that spritesheet works
  imageMode(CENTER);
  let img = sprites[7];
  image(img, width / 2, height / 2, img.width, img.height);
}

// Extremely temporary function to show how the board is made
// I'll soon make a piece to show how it's used. I realize this is basically useless
function newGame() {
  for (let i = 0; i < 8; i++) {
    game.push([]);
    for (let j = 0; j < 8; j++) {
      game[i].push("tile");
    }
  }
}

function board() {
  noStroke();
  let boardSideLength = height - (height / 20) * 2;
  let squareSideLength = boardSideLength / 8;
  let r = 0;
  u = true;
  for (let j = 0; j <= 7; j++) {
    let t = 0;
    if (u == true) {
      for (let i = 0; i <= 3; i++) {
        //black color
        fill(66, 48, 32);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
        //White color
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
        //White color
        fill(213, 176, 122);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
        //black color
        fill(66, 48, 32);
        square(
          (width - boardSideLength) / 2 + squareSideLength * t,
          (height - boardSideLength) / 2 + squareSideLength * r,
          squareSideLength
        );
        t++;
      }
    }
    u = !u;
    r++;
  }
}
