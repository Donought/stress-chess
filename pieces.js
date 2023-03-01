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
