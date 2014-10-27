var BoardLayer = cc.Layer.extend ({
	_column : null,
	_row : null,
	
	ctor:function () {
		this._super();
		this.init();
	},
	
	init: function() {
		//this._setWidth(140*4);
		//this.width = 140*4;
		//this.height = 140*4;
		
		this._createMap(BoardType.row, BoardType.col);
		
		cc.log("width:" + this.width);
		//this.getContentSize()
		//this.setContentSize(560, 560)
		//this.setAnchorPoint(0.5, 0.5);
		this.setPosition((cc.director.getWinSize().width - BoardType.col * PIPE.SIZE.WIDTH)/2, (cc.director.getWinSize().height - BoardType.row * PIPE.SIZE.HEIGHT)/2);
		//this.setColor(new cc.Color(0,0,0,1));
		//this.setPosition(100, 100);
		

	},
	
	_createMap : function(row, col) { 
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var type = Math.floor(Math.random() * 4);
				var rotate = Math.floor(Math.random() * 4) * 90;
				var pipe = Pipe.getOrCreate(type);
				pipe.setPosition(rotate, r, c);
				this.addChild(pipe);
			}
		}
	}
});

