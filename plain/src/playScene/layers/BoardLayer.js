var BoardLayer = cc.Layer.extend ({

	ctor:function () {
		this._super();
		this.init();
	},

	init: function() {
		
		SMTH.CONTAINER.BOARD = this;
		SMTH.STATUS.GAME_STATE = SMTH.CONST.GAME_STATE.NOT_END;
		
		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];
		
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		var row = this._level.row;
		var col = this._level.col;
		var winSize = cc.director.getWinSize()
                                  
		this._createMap(row, col);
		this.setPosition((winSize.width - col * BLOCK.SIZE.WIDTH)/2, (winSize.height - row * BLOCK.SIZE.HEIGHT)/2);
     
        cc.audioEngine.setMusicVolume(0.5);
        cc.audioEngine.playMusic(res.GamePlayBGM_mp3, true); 
        
        SMTH.EVENT_MANAGER.notice("gameStart");
        
        // 설정된 케릭터 값이 없을 때
        // 1. 처음 시작할 때
        // 2. 맵씬으로 나왔을 때
        // 3. 케릭터 숫자가 늘어났을 때?
        if (!SMTH.STATUS.CHAR_SELECTED) {
        	cc.log("characterSelector");
        	SMTH.EVENT_MANAGER.notice("characterSelector");
        } else {
        	SMTH.EVENT_MANAGER.notice("characterSelected", SMTH.STATUS.CHAR_SELECTED);
        }
//        if(SMTH.STATUS.CURRENT_LEVEL.CHARACTER) {
//        	cc.log("characterSelector");
//        	SMTH.EVENT_MANAGER.notice("characterSelector");
//        }
	},
	
	_createMap : function(row, col) { 
		//var map = this._level.MAP;
		var levelLoader = new LevelLoader(this._level);
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c]; // 좌표에 레퍼런스 할당.
				this.addChild(block); // 화면에 배치 
			}
		}
	}
});
