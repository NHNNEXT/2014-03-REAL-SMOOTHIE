
var BoardLayer = cc.Layer.extend ({
	_level: null,

	ctor:function () {
		this._super();
		this.tag = 3;
		this.init();
	},

	init: function() {
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.EVENT_MANAGER.dispatchEvent(new cc.EventCustom("startNewLevel"));

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
	},

	_createMap : function(row, col) { 
		var map = this._level.MAP;
		var levelLoader = new LevelLoader(this._level);
		// levelLoader가 SMTH.CONTAINER에 파이프 등록하면 해당 내용 사용
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c]; // 좌표에 레퍼런스 할당.
				block.setPositionByRowCol(r, c);
				this.addChild(block); // 화면에 배치 
			}
		}
	}
});
