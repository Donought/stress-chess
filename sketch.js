function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(240);
  board();
}

function board(){
noStroke()
let boardSideLength = height - ((height / 20) * 2);
let squareSideLength = boardSideLength / 8;
let r = 0;
u = true
for(let j = 0; j <=7; j++){
  let t = 0;
  if(u == true){
    for(let i = 0; i <= 3; i++){
      //black color
      fill(66, 48, 32)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
      //White color
      fill(213, 176, 122)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
    }
  }
  else{
    for(let i = 0; i <= 3; i++){
      //White color
      fill(213, 176, 122)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
      //black color
      fill(66, 48, 32)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
    }
  }
  u = !u
  r++
}
}