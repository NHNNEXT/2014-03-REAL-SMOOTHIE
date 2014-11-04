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
			this._corpseCollector();
			this._fillBoard();
		}
	},
	
	_checkIsGameCleared :function () {
		//TODO: 게임 종료 규칙을 외부에서 가져다 쓸수 있도록 추후변경 필
		//적이 있는지 확인 적이 없으면 게임 클리어
		
		
//		var locShip = this._ship;
//		if (MW.LIFE > 0 && !locShip.active) {
//			locShip.born();
//		} else if (MW.LIFE <= 0 && !locShip.active) {
//			this._state = STATE_GAMEOVER;
//			// XXX: needed for JS bindings.
//			this._ship = null;
//			this.runAction(cc.sequence(
//					cc.delayTime(0.2),
//					cc.callFunc(this.onGameOver, this)
//			));
//		}
	},
	
	_onGameClear:function () {
//		cc.audioEngine.stopMusic();
//		cc.audioEngine.stopAllEffects();
//		var scene = new cc.Scene();
//		scene.addChild(new GameOver());
//		cc.director.runScene(new cc.TransitionFade(1.2, scene));
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
				var block = SMTH.CONTAINER.PIPES[r*col+c]; // 좌표에 레퍼런스 할당.
				this.addChild(block); // 화면에 배치 
			}
		}
	},
	_corpseCollector : function() {
		var row = this._level.row;
		var col = this._level.col;
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c];
				if(block.HP <= 0 && block.isRotten) {
					cc.log("r:" + r + ", c: " + c);
					SMTH.CONTAINER.PIPES[r*col+c] = null;
					this.removeChild(block);
					// block 객체가 정말 사라진건지 확인 필요 
				}	
			}
		}		
	}, 
	_fillBoard : function() {
		var row = this._level.row;
		var col = this._level.col;
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c];
				if(block === null) {
					var randomNewPipe = Pipe.getPipe(BLOCK.TYPE.PIPE.RAND.P);
					randomNewPipe.setPosition(randomNewPipe.rotation, r, c);
					SMTH.CONTAINER.PIPES[r*col+c] = randomNewPipe;
					this.addChild(randomNewPipe);
					// block 객체가 정말 사라진건지 확인 필요 
				}	
			}
		}		
	}	
});

