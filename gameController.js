class GameController {
	constructor() {
    this.turn = 1;

	}
  winCheck(){
    let p1p = [];
    let p2p = [];
    let p1pl;
    let p2pl;
    let win;
    let aPieces = []
    let kings = []

// Finds pieces for both sides using two for loops that checks what is in each position on the board
for(let j = 0; j< 8; j++){
for (let i = 0; i < 8; i++) {
if(board[i][j].color == 0){
p2p.push(board[i][j])
}
else if(board[i][j].color == 1){
p1p.push(board[i][j])
}
// If the position is empty there is no need to do anything
else{
}

// Places all pieces into a single array
if(board[i][j] != "empty"){
//console.log("Running")
aPieces.push(board[i][j])
}
}
}
//console.log(aPieces)
for (let i = 0; i < aPieces.length; i++) {
  if(aPieces[i].type == 1){
    kings.push(aPieces[i])
  //  console.log(kings)
  }
}

if(aPieces.length< 3){
  alert("Draw refresh to restart")
}
if(kings.length == 1){
if(kings[0].color == 0){
win = "Black player wins"
}else{
win = "White player wins"
}
//console.log(win)
if(kings != "End"){
alert(win+" refresh to restart")

}}




  }

  playerText(){
    let player;
    if(this.turn == 1){
     player = "Hvid spillers"
    } else {
     player = "Sort spillers"
    }
   
    this.playerTurn = (player + " tur");}
    
  
}