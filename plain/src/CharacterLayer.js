var CharacterLayer = cc.Layer.extend({
	playCharacters : null,
	emenyCharacters :  null,
	ctor:function () {
		this._super();
		this.init();
	},
	init: function() {
		this.playCharacters = [];
		for(var i=0 ; i < BoardType.col ; i++) {
			var char = new Character(0)
			this.playCharacters.push(char);
			char.x = (i+0.5)*PIPE.SIZE.WIDTH;
			char.y = -(PIPE.SIZE.HEIGHT/2);
			this.addChild(this.playCharacters[i]);
		}
		
		this.emenyCharacters = [];
		for(var i=0 ; i < BoardType.col ; i++) {
			var enemy = new Enemy(0)
			this.emenyCharacters.push(enemy);
			enemy.x = (i+0.5)*PIPE.SIZE.WIDTH;
			enemy.y = (BoardType.row+0.5) *PIPE.SIZE.HEIGHT;
			this.addChild(this.emenyCharacters[i]);
		}
		
		this.setPosition((cc.director.getWinSize().width - BoardType.col * PIPE.SIZE.WIDTH)/2, (cc.director.getWinSize().height - BoardType.row * PIPE.SIZE.HEIGHT)/2);
	}
})