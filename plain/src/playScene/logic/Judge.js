var Judge = cc.Class.extend({
	ctor: function() {
		
	}
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
	} 
	if(SMTH.CONTAINER.TURN >= SMTH.STATUS.CURRENT_LEVEL.MAXTURN) {
		return SMTH.CONST.GAME_STATE.GAME_OVER;
	}
	return SMTH.CONST.GAME_STATE.NOT_END;
}