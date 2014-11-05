var EffectManager = cc.Class.extend({
	ctor: function() {
		
	},
	colorRoute: function(routes) {
		cc.log("coloring");
		for (var i in routes) {
			var route = routes[i];
			route.colorPipes();
		}
	},
	hideRoute: function(route) {
		route.destroied = 0;
		for (var i in route.blocks) {
			var block = route.blocks[i];
			if (block.HP <= 0) {
				block.destroy();
			}
		}
	},
	replaceBlock: function(block) {
		var boardLayer = block.parent;
		cc.log(block.parent)
		var row = block.row;
		var col = block.column;
		var curLevel = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.CONTAINER.PIPES[row * curLevel.col + col] = null;
		block.parent.removeChild(block);
		
		// 새로 채워지는 블록은 무조건 파이프
		var newBlock = Pipe.getPipe(BLOCK.TYPE.PIPE.RAND.P);
		newBlock.row = row;
		newBlock.column = col;
		newBlock.setPositionByRowCol(row, col);
		SMTH.CONTAINER.PIPES[row * curLevel.col + col] = newBlock;
		boardLayer.addChild(newBlock);
		SMTH.EVENT_MANAGER.dispatchEvent(new cc.EventCustom("pipeAdded"));
	},
	popupGameOver: function() {
		cc.director.getRunningScene().addChild(new GameOverLayer());
	},
	popupGameClear: function() {
		cc.director.getRunningScene().addChild(new GameClearLayer());
	}
});

SMTH.EFFECT_MANAGER = new EffectManager();