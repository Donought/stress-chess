let data;
let sheet;
let sprites = [];
let bogstaver = ["a", "b", "c", "d", "e", "f", "g", "h"];

let board = []; // Contains an array that represents the board
let offset = 0.85; // How much smaller the pieces are than the squares

let boardSideLength;
let squareSideLength;

let actPiece = [];
let actTiles = [];

let GC;

function preload() {
	data = loadXML("spritesheet/data.xml");
	sheet = loadImage("spritesheet/sheet.png");
}

function setup() {
	GC = new GameController();
	createCanvas(innerWidth, innerHeight);

	boardSideLength = height - (height / 20) * 2;
	squareSideLength = boardSideLength / 8;

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
	GC.winCheck();
	background(240);
	drawBoard();
}

function mousePressed() {
	// This lever makes it so that a piece will not be activated when you click on it while it is blue,
	// because in that case, you are trying to kill the piece, not move it.
	let lever = 0;

	// Grid coordinates for tile that you pressed on
	let x = Math.floor(
		(mouseX - (width - boardSideLength) / 2) / squareSideLength
	);
	let y = Math.floor(
		(mouseY - (height - boardSideLength) / 2) / squareSideLength
	);

	// Only runs when tiles isn't empty
	// Runs through active (blue) tiles
	actTiles.forEach(function (tile) {
		// If tile has been clicked...
		if (tile[0] == x && tile[1] == y) {
			// Move active piece to tile by deleting it from previous tile and adding it to new tile
			let temp = board[actPiece[0]][actPiece[1]];
			board[actPiece[0]].splice(actPiece[1], 1, "empty");
			board[x].splice(y, 1, temp);
			lever++;
		}
	});

	actTiles = [];
	actPiece = [];

	// Only do something if you clicked within the board and if the levver hasn't been activated
	if (x <= 7 && y <= 7 && 0 <= x && 0 <= y && lever == 0) {
		let tile = board[x][y]; // Gets clicked tile from board

		// If tile is not empty, then...
		if (tile != "empty") {
			// Set coords as active piece
			actPiece = [x, y];
			// Run rule function for piece
			tile.rules(x, y);

			// GENERAL RULES CAN BE PUT HERE
			// Use .filter() method to only put tiles that match certain conditions from tile.moves to actTiles
			// The function is written as an arrow function
			actTiles = tile.moves.filter(function (move) {
				let mx = move[0];
				let my = move[1];
				return (
					// Only tiles inside of board:
					0 <= mx &&
					mx <= 7 &&
					0 <= my &&
					my <= 7 &&
					// Move isn't on clicked tile:
					(mx != x || my != y) &&
					// Sort out moves that kill allies:
					(function () {
						if (board[mx][my] != "empty") {
							return board[x][y].color != board[mx][my].color;
						} else {
							return true;
						}
					})()
				);
			});

			// For all pieces except knight, filter out moves where a piece jumps over other pieces.
			// Essentially, check for tiles in all directions until another piece is reached,
			// then add moves from actTiles that overlap with these tiles to m

			// Temporary valid move array
			let m = [];

			// If-statement to sort out knight
			if (board[actPiece[0]][actPiece[1]].type != 2) {
				// Use for-loops to check in all 8 directions. The 9th is filtered out later
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						// The direction to check in (normalized vector)
						let dir = [i - 1, j - 1];

						// Filter out vector (0, 0), as it is not a direction
						if (dir[0] != 0 || dir[1] != 0) {
							// First tile in direction to check
							let chkTile = [actPiece[0] + dir[0], actPiece[1] + dir[1]];

							// Keep checking in direction until a break
							while (true) {
								// If tile is out of bounds, break
								if (
									7 < chkTile[0] ||
									7 < chkTile[1] ||
									chkTile[0] < 0 ||
									chkTile[1] < 0
								) {
									break;
								}

								// If tile is NOT "empty", then only include it if it overlaps with actTiles, then break
								if (board[chkTile[0]][chkTile[1]] != "empty") {
									if (arrayInArrayOccurence(actTiles, chkTile) == true) {
										m.push([chkTile[0], chkTile[1]]);
									}
									break;
								}
								// If tile is "empty", include if it overlaps with actTiles, but don't break
								else {
									if (arrayInArrayOccurence(actTiles, chkTile) == true) {
										m.push([chkTile[0], chkTile[1]]);
									}
								}

								// Next tile in direction
								chkTile[0] += dir[0];
								chkTile[1] += dir[1];
							}
						}
					}
				}

				// Replace actTiles' contents with the temporary valid move array
				actTiles = m;
			}
		}
	}
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

	//Adds all pieces
	//Black pieces
	for (let i = 0; i < 8; i++) {
		board[0 + i].splice(1, 1, new Pawn(0));
	}
	board[4].splice(0, 1, new King(0));
	board[0].splice(0, 1, new Rook(0));
	board[7].splice(0, 1, new Rook(0));
	board[1].splice(0, 1, new Knight(0));
	board[6].splice(0, 1, new Knight(0));
	board[2].splice(0, 1, new Bishop(0));
	board[5].splice(0, 1, new Bishop(0));
	board[3].splice(0, 1, new Queen(0));

	//White pieces
	for (let i = 0; i < 8; i++) {
		board[0 + i].splice(6, 1, new Pawn(1));
	}
	board[4].splice(7, 1, new King(1));
	board[0].splice(7, 1, new Rook(1));
	board[7].splice(7, 1, new Rook(1));
	board[1].splice(7, 1, new Knight(1));
	board[6].splice(7, 1, new Knight(1));
	board[2].splice(7, 1, new Bishop(1));
	board[5].splice(7, 1, new Bishop(1));
	board[3].splice(7, 1, new Queen(1));
}

function drawBoard() {
	noStroke();
	let boardSideLength = height - (height / 20) * 2;
	let squareSideLength = boardSideLength / 8;
	let boardX = (width - boardSideLength) / 2;
	let boardY = (height - boardSideLength) / 2;
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
					boardX + squareSideLength * t,
					boardY + squareSideLength * r,
					squareSideLength
				);
				t++;
				//Light color
				fill(213, 176, 122);
				square(
					boardX + squareSideLength * t,
					boardY + squareSideLength * r,
					squareSideLength
				);
				t++;
			}
		} else {
			for (let i = 0; i <= 3; i++) {
				//Light color
				fill(213, 176, 122);
				square(
					boardX + squareSideLength * t,
					boardY + squareSideLength * r,
					squareSideLength
				);
				t++;
				//Dark color
				fill(66, 48, 32);
				square(
					boardX + squareSideLength * t,
					boardY + squareSideLength * r,
					squareSideLength
				);
				t++;
			}
		}

		r++;
	}

	//Numbers and letters at the sides
	for (let i = 0; i < 8; i++) {
		fill(0);
		textAlign(CENTER, CENTER);
		textSize(boardY - boardY / 10);
		text(
			bogstaver[i],
			boardX + squareSideLength * i,
			0,
			squareSideLength,
			boardY
		);
		text(
			bogstaver[i],
			boardX + squareSideLength * i,
			height - boardY,
			squareSideLength,
			boardY
		);

		textAlign(RIGHT, CENTER);
		text(
			8 - i,
			boardX - squareSideLength / 4,
			boardY + squareSideLength / 2 + squareSideLength * i
		);
		textAlign(LEFT, CENTER);
		text(
			8 - i,
			width - boardX + squareSideLength / 4,
			boardY + squareSideLength / 2 + squareSideLength * i
		);
	}

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

	//Draw available moves
	translate(-squareSideLength / 2, -squareSideLength / 2);
	fill(180, 220, 255, 255 * 0.5);
	actTiles.forEach(function (tile) {
		square(
			tile[0] * squareSideLength,
			tile[1] * squareSideLength,
			squareSideLength
		);
	});
	pop();
}
