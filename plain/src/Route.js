var Route = cc.Class.extend({
	blocks : null,
	friend : null,
	numberOfEnemies: 0,
	attackFlag: false,
	ctor:function (friend) {
		this.friend = friend;
		this.init();
	},

	init:function () {
		this.blocks = [];
		this.searchRoute(this.friend);
		this.countEnemy();
	},
	
	searchRoute : function(block) {
		if (this.blocks.indexOf(block) >= 0) return;
		this.blocks.push(block);
		if (block.isEnemy()) return;
		
		for(var p in block.connectedWith) {
			this.searchRoute(block.connectedWith[p]);
		}
	},
	
	countEnemy: function() {
		for (var i = this.blocks.length - 1;  i >= 0; i--) {
			var block = this.blocks[i];
			if (block.type == BLOCK.TYPE.ENEMY) {
				this.numberOfEnemies += 1;
			}
		}
	},
	
	colorPipes: function() {
		var color = (this.numberOfEnemies > 0) ? cc.color(255,0,0) : cc.color(0,0,255);
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.type != BLOCK.TYPE.FRIEND) {
				block.setColor(color);
			}
		}
	},
	
	colorRed: function() {
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.type != BLOCK.TYPE.FRIEND) {
				block.setColor(cc.color(255, 0, 0));
			}
		}
	},
	
	hurt: function() {
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.isPipe()) {
				block.hurt();
			} else if(block.isEnemy()) {
				cc.log("tew?");
				block.hurt();
			}
		}
		
	}

});