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
		if (0 < this.color) {
			m.push([x, y - 1]);
			if (5 < y) {
				m.push([x, y - 2]);
			}
		} else {
			m.push([x, y + 1]);
			if (y < 2) {
				m.push([x, y + 2]);
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
		if (0 == this.color) {
			let temp = y;
			// Up movement

			for (let i = 0; i < 8; i++) {
				{
					m.push([x, y - 1]);

					y = y - 1;
				}
			}

			y = temp;
			// Down movement
			for (let i = 0; i < 8; i++) {
				m.push([x, y + 1]);
				y = y + 1;
			}
			y = temp;
		}
		// Left movement
		let temp = x;
		for (let i = 0; i < 8; i++) {
			m.push([x - 1, y]);
			x = x - 1;
		}
		x = temp;
		for (let i = 0; i < 8; i++) {
			m.push([x + 1, y]);
			x = x + 1;
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
		super(c, 2);
	}
}
