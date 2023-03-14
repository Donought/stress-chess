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

