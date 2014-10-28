var BoardLayer = cc.Layer.extend ({
	_column : null,
	_row : null,
	_gameManager : null,
	ctor:function () {
		this._super();
		this.init();
	},
	
	init: function() {
		this._createMap(BoardType.row, BoardType.col);
		this.setPosition((cc.director.getWinSize().width - BoardType.col * PIPE.SIZE.WIDTH)/2, (cc.director.getWinSize().height - BoardType.row * PIPE.SIZE.HEIGHT)/2);
		this._gameManager = new GameManger();

		SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_IDEAL;
		this.scheduleUpdate();
	},
	update: function(dt) {
		if(SMTH.CONTAINER.PLAY_STATE === SMTH.PLAY_STATE.PLAY_STATE_IDEAL) {
			this._gameManager.updateRoute();
		}
	},
	_createMap : function(row, col) { 
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var type = Math.floor(Math.random() * 4);
				var rotate = Math.floor(Math.random() * 4) * 90;
				var pipe = Pipe.getOrCreate(type);
				SMTH.CONTAINER.PIPES.push(pipe);
				pipe.setPosition(90, r, c);
				this.addChild(pipe);
			}
		}
	}
});

