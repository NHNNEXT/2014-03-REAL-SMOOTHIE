var Judge = cc.Class.extend({
	ctor: function() {
		
	},
	
	_checkIsGameOver :function () {
		//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
		// 턴이 다되면 게임 종
		if(SMTH.CONTAINER.TURN >= this._level.MAXTURN) {
			// 인터랙션 중단
			this.unscheduleUpdate();
			this.runAction(cc.sequence(
					cc.delayTime(0.2),
					cc.callFunc(this._onGameOver, this)
			));
		}

	},
	_onGameOver:function () {
		cc.log("game over");
		SMTH.EFFECT_MANAGER.popupGameOver();
//		this.parent.addChild(new GameOverLayer());
	},


	_checkIsGameCleared :function () {
		//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
		// 적이 없으면 클리어되는 조건으로 구현
		var count = 0;
		for(var i = 0; i < SMTH.CONTAINER.PIPES.length; i++) {
			var pipe = SMTH.CONTAINER.PIPES[i];
			if(pipe.type === BLOCK.TYPE.ENEMY) {
				count++;
			}
		}
		if(count === 0) {
			// 인터랙션 중단 
			this.unscheduleUpdate();
			this.runAction(cc.sequence(
					cc.delayTime(0.2),
					cc.callFunc(this._onGameClear, this)
			));
		}

	},
	_onGameClear:function () {
		cc.log("game clear");
		SMTH.EFFECT_MANAGER.popupGameClear();
//		this.parent.addChild(new GameClearLayer());
	},
});