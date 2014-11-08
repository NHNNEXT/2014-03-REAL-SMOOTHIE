
var BoardLayer = cc.Layer.extend ({

	ctor:function () {
		this._super();
		this.init();
	},

	init: function() {
		this._routeController = null;
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.STATUS.PLAY_STATE = SMTH.CONST.PLAY_STATE.IDEAL;

		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];

		var row = this._level.row;
		var col = this._level.col;
		var winSize = cc.director.getWinSize()
        // set BlockSize By block count
        BLOCK.SIZE.WIDTH = winSize.width / this._level.MAP[0].length;
        BLOCK.SIZE.HEIGHT = BLOCK.SIZE.WIDTH;
                                  
		this._createMap(row, col);
		this.setPosition((winSize.width - col * BLOCK.SIZE.WIDTH)/2, (winSize.height - row * BLOCK.SIZE.HEIGHT)/2);
		this._routeController = new RouteController();
		this.scheduleUpdate();
                                  
        cc.audioEngine.setMusicVolume(0.7);
        cc.audioEngine.playMusic(res.GamePlayBGM_mp3, true);
                                  
            
	},
	update: function(dt) {
		if(SMTH.STATUS.PLAY_STATE === SMTH.CONST.PLAY_STATE.IDEAL) {
			this._routeController.updateRoute();
			this._corpseCollector();
			this._fillBoard();
			this._checkIsGameOver();
		}
	},
	_checkIsGameOver :function () {
		//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
		// 턴이 다되면 게임 종
		var count = 0;
		for(var i=0; i<SMTH.CONTAINER.PIPES.length ; i++){
			if(BLOCK.TYPE.ENEMY === SMTH.CONTAINER.PIPES[i].type) {
				count++;
			}
		}
		if(count != 0) {
			if(SMTH.CONTAINER.TURN >= this._level.MAXTURN) {
				this.unscheduleUpdate();
				this.runAction(cc.sequence(
						cc.delayTime(0.2),
						cc.callFunc(this._onGameOver, this)
				));
			}
		} else {
			this.unscheduleUpdate();
			this.runAction(cc.sequence(
					cc.delayTime(0.2),
					cc.callFunc(this._onGameClear, this)
			));
		}
	},
	_onGameOver:function () {
		cc.log("game over");
		this.parent.addChild(new GameOverLayer());
	},

	_onGameClear:function () {
		cc.log("game clear");
		this.parent.addChild(new GameClearLayer());
	},

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
					var randomNewPipe = new Pipe(BLOCK.TYPE.PIPE.RAND.P);
					randomNewPipe.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES[r*col+c] = randomNewPipe;
					this.addChild(randomNewPipe);
					// block 객체가 정말 사라진건지 확인 필요 
				}	
			}
		}		
	}	
});
