class Base {
  constructor(c, t) {
    this.color = c; // 0 = black, 1 = white
    this.type = t; // 0 - 5 (spritesheet)
    this.sprite = sprites[t + c * 6];
  }
}

class Pawn extends Base {
  constructor(c) {
    super(c, 3);
  }
}
