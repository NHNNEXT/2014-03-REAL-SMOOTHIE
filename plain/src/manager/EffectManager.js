var EffectManager = cc.Class.extend({
	ctor: function() {
		
	},
	colorRoute: function(routes) {
		for (var i in routes) {
			var route = routes[i];
			var color = (route.numberOfEnemies > 0) ? cc.color(255,0,0) : cc.color(0,0,255);
			for (var i in route.blocks) {
				var block = route.blocks[i];
				if (block.type != BLOCK.TYPE.FRIEND) {
					block.runAction(cc.spawn(cc.tintTo(0.5, color.r, color.g, color.b)));
				}
			}
		}
	},
	
	hideRoute: function(route) {
		route.destroied = 0;
		for (var i in route.blocks) {
			var block = route.blocks[i];
			if (block.HP <= 0) {
				block.runAction(cc.sequence(
					cc.fadeOut(1), 
					cc.callFunc(function(block) {
						block.active = false;
						block.isRotten = true;
						block.visible = false;
						this.replaceBlock(block);
						if (block.isEnemy()) {
							SMTH.EVENT_MANAGER.notice("enemyDied");
						}
					}.bind(this, block))
				));
			}
		}
	},
	
	replaceBlock: function(block) {
		var boardLayer = block.parent;
		var row = block.row;
		var col = block.column;
		var curLevel = SMTH.STATUS.CURRENT_LEVEL;
		block.parent.removeChild(block);
		
		// 새로 채워지는 블록은 무조건 파이프
		var newBlock = Pipe.getPipe(BLOCK.TYPE.PIPE.RAND.P);
		newBlock.row = row;
		newBlock.column = col;
		newBlock.setPositionByRowCol(row, col);
		SMTH.CONTAINER.PIPES[row * curLevel.col + col] = newBlock;
		boardLayer.addChild(newBlock);
		newBlock.opacity = 0;
		newBlock.runAction(cc.spawn(cc.fadeIn(0.2)));
		SMTH.EVENT_MANAGER.notice("pipeAdded");
	},
	popupGameOver: function() {
		cc.director.getRunningScene().addChild(new GameOverLayer());
	},
	popupGameClear: function() {
		cc.director.getRunningScene().addChild(new GameClearLayer());
	}
});

SMTH.EFFECT_MANAGER = new EffectManager();