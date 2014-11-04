
var BoardLayer = cc.Layer.extend ({
	_routeController : null,
	_level: null,

	ctor:function () {
		this._super();
		this.tag = 3;
		this.init();
	},

	init: function() {
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.STATUS.PLAY_STATE = SMTH.CONST.PLAY_STATE.IDEAL;

		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];
		for(var key in PIPE_CONTAINER){
			PIPE_CONTAINER[key] = [];
		}

		var row = this._level.row;
		var col = this._level.col;
		var winSize = cc.director.getWinSize()

		this._createMap(row, col);
		this.setPosition((winSize.width - col * BLOCK.SIZE.WIDTH)/2, (winSize.height - row * BLOCK.SIZE.HEIGHT)/2);
		this._routeController = new RouteController();
//		this.scheduleUpdate();
		SMTH.EVENT_MANAGER.addCustomListener("rotateEnd", function(e) {
			this.update();
		}.bind(this));
	},
	update: function(dt) {
		cc.log("update!");
		if(SMTH.STATUS.PLAY_STATE === SMTH.CONST.PLAY_STATE.IDEAL) {
			this._routeController.updateRoute();
			this._corpseCollector();
			this._fillBoard();
			this._checkIsGameCleared();
			this._checkIsGameOver();
		}
	},
	_checkIsGameOver :function () {
		//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
		// 턴이 다되면 게임 종
		if(SMTH.CONTAINER.TURN >= this._level.MAXTURN) {
			this.unscheduleUpdate();
			this.runAction(cc.sequence(
					cc.delayTime(0.2),
					cc.callFunc(this._onGameOver, this)
			));
		}

	},
	_onGameOver:function () {
		cc.log("game over");
		this.parent.addChild(new GameOverLayer());
	},

	
	_checkIsGameCleared :function () {
		//TODO: 종료조건에 따라서 수정될수 있도록 구현(by config)
		// 적이 없으면 클리어되는 조건으로 구현
		
		var count = 0;
		for(var i=0; i<SMTH.CONTAINER.PIPES.length ; i++){
			if(BLOCK.TYPE.ENEMY === SMTH.CONTAINER.PIPES[i].type) {
				count++;
			}
		}
		if(count === 0) {
			this.unscheduleUpdate();
			this.runAction(cc.sequence(
					cc.delayTime(0.2),
					cc.callFunc(this._onGameClear, this)
					));
		}

	},
	_onGameClear:function () {
		cc.log("game clear");
		this.parent.addChild(new GameClearLayer());
	},

	_createMap : function(row, col) { 
		var map = this._level.MAP;
		var levelLoader = new LevelLoader(this._level);
		// levelLoader가 SMTH.CONTAINER에 파이프 등록하면 해당 내용 사용
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
					randomNewPipe.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES[r*col+c] = randomNewPipe;
					this.addChild(randomNewPipe);
					// block 객체가 정말 사라진건지 확인 필요 
				}	
			}
		}		
	}	
});
