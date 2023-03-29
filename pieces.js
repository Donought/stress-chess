class Base {
	constructor(x, y, c, t) {
		this.color = c; // 0 = black, 1 = white
		this.type = t; // 0 - 5 (spritesheet)
		this.sprite = sprites[t + c * 6];
		this.moves = []; // Available moves
		this.x = x;
		this.y = y
	}

	isOffBoard(newX, newY){
		return newX > 7 || newX < 0 || newY > 7 || newY < 0;
		
	}
}

class Pawn extends Base {
	constructor(x, y, c) {
		super(x, y, c, 3);
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
	constructor(x, y, c) {
		super(x, y, c, 5);
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
	constructor(x, y, c) {
		super(x, y, c, 1);
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
	constructor(x, y, c) {
		super(x, y, c, 0);
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
	constructor(x, y, c) {
		super(x, y, c, 2);
		
	}

	rules(tiles) {
		let m = [];
		//Moves
		//1
		m.push(this.getMove(-1, -2, tiles));
		//2
		m.push(this.getMove(1, -2, tiles));
		//3
		m.push(this.getMove(2, -1, tiles));
		//4
		m.push(this.getMove(2, 1, tiles));
		//5
		m.push(this.getMove(1, 2, tiles));
		//6
		m.push(this.getMove(-1, 2, tiles));
		//7
		m.push(this.getMove(-2, 1, tiles));
		//8
		m.push(this.getMove(-2, -1, tiles));

		this.moves = m;
	}
	 getMove(xDir, yDir, tiles){
		let newX = this.x + xDir;
		let newY = this.y + yDir;

		if(this.isOffBoard(newX, newY)) {
			return;
		}

		if(tiles[newX][newY]){
			if(tiles[newX][newY].c !== this.c) {
				return {x : newX, y : newY};
			}

		} else {
			return {x : newX, y : newY}
		}



	 }
}
class Queen extends Base {
	constructor(x, y, c) {
		super(x, y, c, 4);
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
