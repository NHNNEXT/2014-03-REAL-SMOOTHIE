
var BoardLayer = cc.Layer.extend ({

	ctor:function () {
		this._super();
		this.init();
	},

	init: function() {
		
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.CONTAINER.BOARD = this;
		SMTH.STATUS.GAME_STATE = SMTH.CONST.GAME_STATE.NOT_END;
		
		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];

		var row = this._level.row;
		var col = this._level.col;
		var winSize = cc.director.getWinSize()
                                  
		this._createMap(row, col);
		this.setPosition((winSize.width - col * BLOCK.SIZE.WIDTH)/2, (winSize.height - row * BLOCK.SIZE.HEIGHT)/2);
     
        cc.audioEngine.setMusicVolume(0.5);
        cc.audioEngine.playMusic(res.GamePlayBGM_mp3, true);                                  
        SMTH.EVENT_MANAGER.notice("gameStart");
         
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
	}
});
