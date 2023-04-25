class GameController {
	constructor() {
		this.turn = 1;
		this.gameStopped = false;
	}
	winCheck() {
		let win;
		let aPieces = [];
		let kings = [];
		if (!this.gameStopped) {
			// Finds pieces for both sides using two for loops that checks what is in each position on the board
			for (let j = 0; j < 8; j++) {
				for (let i = 0; i < 8; i++) {
					// Places all pieces into a single array
					if (board[i][j] != "empty") {
						//console.log("Running")
						aPieces.push(board[i][j]);
					}
				}
			}
			//console.log(aPieces)
			for (let i = 0; i < aPieces.length; i++) {
				if (aPieces[i].type == 1) {
					kings.push(aPieces[i]);
					//  console.log(kings)
				}
			}

			if (aPieces.length < 3) {
				alert("Det står lige, genindlæs side for at genstarte");
				this.gameStopped = true;
			}
			if (kings.length == 1) {
				if (kings[0].color == 0) {
					win = "Sort spiller vinder";
				} else {
					win = "Hvid spiller vinder";
				}
				this.gameStopped = true;
				//console.log(win)
				alert(win + ", genindlæs side for at genstarte");
				this.gameStopped = true;
			}
		}
	}

	playerText() {
		let player;
		if (this.turn == 1) {
			player = "Hvid spillers";
		} else {
			player = "Sort spillers";
		}

		this.playerTurn = player + " tur";
	}
}
