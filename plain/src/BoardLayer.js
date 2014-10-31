var BoardLayer = cc.Layer.extend ({
	_gameManager : null,
	_level: null,

	ctor:function () {
		this._super();
		this.init();
	},
	
	init: function() {
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_IDEAL;
		
		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];
		for(var key in PIPE_CONTAINER){
			PIPE_CONTAINER[key] = [];
		}
		
		this._createMap(this._level.row, this._level.col);
		this.setPosition((cc.director.getWinSize().width - this._level.col * BLOCK.SIZE.WIDTH)/2, (cc.director.getWinSize().height - this._level.row * BLOCK.SIZE.HEIGHT)/2);
		this._gameManager = new GameManger();
		this.scheduleUpdate();
	},
	update: function(dt) {
		if(SMTH.CONTAINER.PLAY_STATE === SMTH.PLAY_STATE.PLAY_STATE_IDEAL) {
			this._gameManager.updateRoute();
		}
	},
	
	
	_createBlock : function(type, r, c) {
		if(Pipe.isPipe(type)) {
			var type = Math.floor(Math.random() * 4);
			var rotate = Math.floor(Math.random() * 4) * 90;
			var pipe = Pipe.getOrCreate(type);
			SMTH.CONTAINER.PIPES.push(pipe);
			pipe.setPosition(rotate, r, c);
			return pipe;
		} 
		if(type === BLOCK.TYPE.FRIEND) {
			var friend = new Friend(0)
			SMTH.CONTAINER.PIPES.push(friend);
			var pos = friend._coordinateToPosition(r, c);
			friend.x = pos.x;
			friend.y = pos.y;
			return friend;
		}
		if(type === BLOCK.TYPE.ENEMY) {
			var enemy = new Enemy(0)
			SMTH.CONTAINER.PIPES.push(enemy);
			var pos = enemy._coordinateToPosition(r, c);
			enemy.x = pos.x;
			enemy.y = pos.y;
			return enemy;
		}
	},
//	_createMap : function(row, col) { 
//		//캐릭터(아군,적) 배치 -> 장애물 -> 파이프
//		var map = this._level.MAP;
//		for (var r = 0; r < row; r++) {
//			for (var c = 0; c < col; c++) {
//				var block = this._createBlock(map[r][c], r, c);
//				this.addChild(block);
//			}
//		}
//	},
	_createMap : function(row, col) { 
		var map = this._level.MAP;
		var levelLoader = new LevelLoader(this._level);
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c];
				this.addChild(block);
			}
		}
	}
});

