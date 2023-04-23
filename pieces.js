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
    let c = (this.color * 2 - 1) * -1; // Either 1 or -1 depending on which direction pawn moves in

    // In order to not cause an error, it must first be checked whether or not the potential move is out of bounds
    // Only matters for x-axis, since the error is caused by essentially trying undefined[y] at board[x][y]
    if (x - 1 >= 0) {
      // Only allow diagonal when killing an enemy or when moving to the en passant field
      if (
        board[x - 1][y + c] != "empty" ||
        (x - 1 == epField[0] && y + c == epField[1] && this.color != epField[2])
      ) {
        m.push([x - 1, y + c]);
      }
    }

    // Identical to the if-statement above, just for the other side
    if (x + 1 <= 7) {
      if (
        board[x + 1][y + c] != "empty" ||
        (x + 1 == epField[0] && y + c == epField[1] && this.color != epField[2])
      ) {
        m.push([x + 1, y + c]);
      }
    }

    // Allow forward movement only when nothing is in the way
    if (board[x][y + c] == "empty") {
      m.push([x, y + c]);
      // If in start position, then allow a double forward movement
      if (board[x][y + c * 2] == "empty" && y == 1 + this.color * 5) {
        m.push([x, y + c * 2]);
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
    //Moves for king
    //1 op
    m.push([x, y + 1]);
    //1 ned
    m.push([x, y - 1]);
    //1 til højre
    m.push([x + 1, y]);
    //1 til venstre
    m.push([x - 1, y]);
    //skråt op til venstre
    m.push([x + 1, y - 1]);
    //skråt op til højre
    m.push([x - 1, y - 1]);
    //skråt ned til venstre
    m.push([x + 1, y + 1]);
    //skråt ned til højre
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
    //Moves for knight
    //1 venstre, 2 op
    m.push([x - 1, y - 2]);

    //2 venstre, 1 op
    m.push([x - 2, y - 1]);

    //l venstre, 2 ned
    m.push([x - 1, y + 2]);

    //2 venstre, 1 ned
    m.push([x - 2, y + 1]);

    //1 højre, 2 op
    m.push([x + 1, y - 2]);

    //2 højre, 1 op
    m.push([x + 2, y - 1]);

    //1 højre, 2 ned
    m.push([x + 1, y + 2]);

    //2 højre, 1 ned
    m.push([x + 2, y + 1]);

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
