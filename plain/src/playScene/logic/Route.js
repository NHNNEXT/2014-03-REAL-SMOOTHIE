var Route = cc.Class.extend({
	
	ctor:function (friend) {
		this.friend = friend;
		this.enemies = [];
		this.init();
	},

	init:function () {
		this.blocks = null;
		this.numberOfEnemies = 0;
		this.numberOfFriends = 0;
		this.attackFlag = false;
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
				this.enemies.push(block);
			}
			if (block.type == BLOCK.TYPE.FRIEND) {
				this.numberOfFriends += 1;
			}
		}
	},
	
	colorPipes: function() {
		var attackColor = cc.color(253,116,0);
		var flowColor = cc.color(245,235,56);
		
		var color = (this.numberOfEnemies > 0) ? attackColor : flowColor;
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
	print: function() {
		var log = "";
		for (var i in this.blocks) {
			var block = this.blocks[i];
			var coord = "("+block.row+","+block.col+")";
			log += coord;
		}
		cc.log(log);
	},
	calculateSmoothiePerEnemy: function(use) {
		// 스무디 객체 합치기 
		var mixedSmoothie = null;
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.isFriend()) {
				var smoothie = null;
				if (use) {
					smoothie = block.useSmoothie();
				} else {
					smoothie = block.getSmoothie();
				}
				if (smoothie == null) continue;
				cc.log(smoothie.amount);
				if (mixedSmoothie == null) mixedSmoothie = smoothie.clone();
				else {
					mixedSmoothie.mix(smoothie);
				}
			}
		}
		if (mixedSmoothie == null) {
			return null;
		}
		// 공격력을 1/n으로 
		cc.log("expected smoothie: "+mixedSmoothie.amount+"/"+this.numberOfEnemies);
		mixedSmoothie.amount = mixedSmoothie.amount / this.numberOfEnemies;
		return mixedSmoothie;
	},
	hurt: function() {
		var mixedSmoothie = this.calculateSmoothiePerEnemy(true);
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.isFriend()) {
				// don't hurt
			} else {
				block.hurt(mixedSmoothie);
			}
		}
        cc.audioEngine.playEffect(res.attack_mp3);
	}

});