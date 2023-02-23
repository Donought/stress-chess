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
  u = !u
  if(u == true){
    for(let i = 0; i <= 3; i++){
      fill(0)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
  
      fill(200)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
    }
  }
  else{
    for(let i = 0; i <= 3; i++){
      fill(200)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
  
      fill(0)
      square(((width - boardSideLength) / 2) + squareSideLength * t, ((height - boardSideLength) / 2) + squareSideLength * r, squareSideLength);
      t++
    }
  }
 
 
  r++
}
}