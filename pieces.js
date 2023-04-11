class Base {
	constructor(c, t) {
		this.color = c; // 0 = black, 1 = white
		this.type = t; // 0 - 5 (spritesheet)
		this.sprite = sprites[t + c * 6];
		this.moves = []; // Available moves
	}
}

class Pawn extends Base {
	constructor(c) {
		super(c, 3);
	}

	rules(x, y) {
		let m = [];
		// Basic rules
		let c = (this.color * 2 - 1) * -1;
		for (let i = -1; i < 2; i++) {
			if (board[x + i][y + c] != "empty" && i != 0) {
				m.push([x + i, y + c]);
			} else if (board[x + i][y + c] == "empty" && i == 0) {
				m.push([x, y + c]);
				if (board[x][y + c * 2] == "empty" && y == 1 + this.color * 5) {
					m.push([x, y + c * 2]);
				}
			}
		}
		this.moves = m;
	}
}

class Rook extends Base {
	constructor(c) {
		super(c, 5);
	}

	rules(x, y) {
		let m = [];
		// Basic rules
		for (let i = 0; i < 9; i++) {
			//Top Left
			m.push([x, y - i]);
			m.push([x, y + i]);
			m.push([x - i, y]);
			m.push([x + i, y]);
		}

		this.moves = m;
	}
}

class King extends Base {
	constructor(c) {
		super(c, 1);
	}

	rules(x, y) {
		let m = [];
		// Basic rules
		// 1 op
		m.push([x, y + 1]);
		// 1 ned
		m.push([x, y - 1]);
		// 1 til højre
		m.push([x + 1, y]);
		// 1 til venstre
		m.push([x - 1, y]);
		// skråt op til venstre
		m.push([x + 1, y - 1]);
		// skråt op til højre
		m.push([x - 1, y - 1]);
		// skråt ned til venstre
		m.push([x + 1, y + 1]);
		// skråt ned til højre
		m.push([x - 1, y + 1]);

		this.moves = m;
	}
}

class Bishop extends Base {
	constructor(c) {
		super(c, 0);
	}

	rules(x, y) {
		let m = [];
		// Basic rules
		for (let i = 0; i < 9; i++) {
			//Top Left
			m.push([x - i, y - i]);
			m.push([x + i, y - i]);
			m.push([x - i, y + i]);
			m.push([x + i, y + i]);
		}

		this.moves = m;
	}
}

class Knight extends Base {
	constructor(c) {
		super(c, 2);
	}

	rules(x, y) {
		let m = [];
		//Moves
		//1
		m.push([x - 1, y - 2]);
		//2
		m.push([x + 1, y - 2]);
		//3
		m.push([x + 2, y - 1]);
		//4
		m.push([x + 2, y + 1]);
		//5
		m.push([x + 1, y + 2]);
		//6
		m.push([x - 1, y + 2]);
		//7
		m.push([x - 2, y + 1]);
		//8
		m.push([x - 2, y - 1]);

		this.moves = m;
	}
}

class Queen extends Base {
	constructor(c) {
		super(c, 4);
	}

	rules(x, y) {
		let m = [];

		// Basic rules
		for (let i = 0; i < 9; i++) {
			//Top Left
			m.push([x - i, y - i]);
			m.push([x + i, y - i]);
			m.push([x - i, y + i]);
			m.push([x + i, y + i]);
		}
		for (let i = 0; i < 9; i++) {
			//Top Left
			m.push([x, y - i]);
			m.push([x, y + i]);
			m.push([x - i, y]);
			m.push([x + i, y]);
		}

		this.moves = m;
	}
}
