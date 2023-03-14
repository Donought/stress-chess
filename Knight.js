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

