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
    let draw = false

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

}
}
//The lengths of the lists of pieces are defined as a variable for convinience
p1pl = p1p.length
p2pl = p2p.length


// If a King dies a player wins




// // If there are only Kings remaining the game ends in a draw
if(p1pl+p2pl < 3){
draw = true
}
//console.log(draw)



// For debugging, displays how many of each color is in play.
/*
console.log(p1p.length,"white pieces remain") 
console.log(p2p.length,"black pieces remain")
console.log(64-(p1p.length+p2p.length), "empty spaces")
*/
  }

  playerText(){
    let player;
    if(this.turn == 1){
     player = "Light player's"
    } else {
     player = "Dark player's"
    }
    this.playerTurn = (player + " turn");
  }
}