let data;
let sheet;
let sprites = [];

let board = []; // Contains an array that represents the board
let offset = 0.85; // How much smaller the pieces are than the squares

let boardSideLength;
let squareSideLength;

let actPiece = [];
let actTiles = [];

function preload() {
	data = loadXML("spritesheet/data.xml");
	sheet = loadImage("spritesheet/sheet.png");
}

function setup() {
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
	background(240);
	drawBoard();
}

function mousePressed() {
	let lever = 0;
	let x = Math.floor(
		(mouseX - (width - boardSideLength) / 2) / squareSideLength
	);
	let y = Math.floor(
		(mouseY - (height - boardSideLength) / 2) / squareSideLength
	);

	actTiles.forEach(function (tile) {
		if (tile[0] == x && tile[1] == y) {
			let temp = board[actPiece[0]][actPiece[1]];
			board[actPiece[0]].splice(actPiece[1], 1, "empty");
			board[x].splice(y, 1, temp);
			lever++;
		}
	});

	actTiles = [];
	actPiece = [];

	if (x < 7 && y < 7 && 0 < x && 0 < y && lever == 0) {
		let tile = board[x][y];
		if (tile != "empty") {
			actPiece = [x, y];
			tile.rules(x, y);
			actTiles = tile.moves;
			console.log(actTiles);
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

	// Adds a single white pawn on d2
	board[3].splice(1, 1, new Pawn(0));
}

function drawBoard() {
	noStroke();
	let r = 0;
	u = true;
	for (let j = 0; j <= 7; j++) {
		let t = 0;
		u = !u;
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

		r++;
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

	// Draw available moves
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
