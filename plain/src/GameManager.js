var GameManger = cc.Class.extend({

	ctor:function () {
		//this._super();
		this.init();
	},

	init:function () {
		this.checkIsConnected();
		var pipes = SMTH.CONTAINER.PIPES;
	},
	
	checkIsConnected : function() {
		var pipes = SMTH.CONTAINER.PIPES;
		for (var r = 0; r < BoardType.row-1; r++) {
			for (var c = 0; c < BoardType.col; c++) {
				var upPipe = this._getPipe(c,r+1);
				var downPipe = this._getPipe(c,r);
				if(this._checkVerticalConnection(upPipe, downPipe)) {
					upPipe.connectedWith.push(downPipe);
					downPipe.connectedWith.push(upPipe);
				}
					
			}
		}
		for (var r = 0; r < BoardType.row; r++) {
			for (var c = 0; c < BoardType.col-1; c++) {
				var leftPipe = this._getPipe(c,r);
				var rightPipe = this._getPipe(c+1,r);
				if(this._checkHorizontalConnection(leftPipe, rightPipe)) {
					leftPipe.connectedWith.push(rightPipe);
					rightPipe.connectedWith.push(leftPipe);
				}

			}
		}
	},
	
	_checkVerticalConnection: function(upPipe, downPipe) {
		return upPipe.isOpened(PIPE.DIRECTION.DOWN) && downPipe.isOpened(PIPE.DIRECTION.UP);
	},
	_checkHorizontalConnection: function(leftPipe, rightPipe) {
		return leftPipe.isOpened(PIPE.DIRECTION.RIGHT) && rightPipe.isOpened(PIPE.DIRECTION.LEFT);
	},
		
	_getPipe: function(col, row) {
		return SMTH.CONTAINER.PIPES[row*BoardType.col+col];
	}

});