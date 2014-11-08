var Judge = cc.Class.extend({
	ctor: function() {
		
	},
	
	_onGameOver:function () {
		cc.log("game over");
		this.parent.addChild(new GameOverLayer());
	},

//		if(count === 0) {
//			this.unscheduleUpdate();
//			this.runAction(cc.sequence(
//					cc.delayTime(0.2),
//					cc.callFunc(this._onGameClear, this)
//			));
//		}

	_onGameClear:function () {
		cc.log("game clear");
		this.parent.addChild(new GameClearLayer());
	},
});


Judge.checkGameEnd = function () {
	//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
	// 턴이 다되면 게임 종
	var count = 0;
	for(var i=0; i<SMTH.CONTAINER.PIPES.length ; i++){
		if(BLOCK.TYPE.ENEMY === SMTH.CONTAINER.PIPES[i].type) {
			count++;
		}
	}

	if(count === 0) {
		return SMTH.CONST.GAME_STATE.GAME_CLEAR;
	} else if(SMTH.CONTAINER.TURN >= SMTH.STATUS.CURRENT_LEVEL.MAXTURN) {
		return SMTH.CONST.GAME_STATE.GAME_OVER;
	}
	return SMTH.CONST.GAME_STATE.GAME_NOT_END;
}