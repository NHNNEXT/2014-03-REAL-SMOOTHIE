
var GameManger = cc.Class.extend({
	pipes : null,
	ctor:function () {
		//this._super();
		this.init();
	},

	init:function () {
		this.pipes = SMTH.CONTAINER.PIPES;
	},
	updateRoute: function() {
		this.initRoute();
		
		this.checkIsConnected();
		this.checkRoute();
		this.colorRoute();		
	},
	initRoute: function() {
		// visitFlag 초기화
		for(var i in this.pipes) {
			this.pipes[i].visitFlag = false;
			this.pipes[i].connectedWith = [];
			this.pipes[i].setColor(cc.color(255, 255, 255));
		}
		
	},
	colorRoute : function() {
		for(var i in this.pipes) {
			if(this.pipes[i].visitFlag) {
				this.pipes[i].setColor(cc.color(0, 0, 255));
			}
		}
	},
	
	checkRoute : function() {
		for(var i=0 ; i < BoardType.col ; i++) {
			if(this.pipes[i].isOpened(PIPE.DIRECTION.DOWN)) {
				this.checkRouteFrom(this.pipes[i]);
			}
		}
	},

	checkRouteFrom : function(pipe) {
		if(pipe.visitFlag) return;
		
		pipe.visitFlag = true;
		
		for(p in pipe.connectedWith) {
			this.checkRouteFrom(pipe.connectedWith[p]);
		}
	},
	
	checkIsConnected : function() {
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
		if(upPipe.type > 0 && downPipe.type > 0) return false;
		return upPipe.isOpened(PIPE.DIRECTION.DOWN) && downPipe.isOpened(PIPE.DIRECTION.UP);
	},
	_checkHorizontalConnection: function(leftPipe, rightPipe) {
		if(leftPipe.type > 0 && rightPipe.type > 0) return false;
		return leftPipe.isOpened(PIPE.DIRECTION.RIGHT) && rightPipe.isOpened(PIPE.DIRECTION.LEFT);
	},
		
	_getPipe: function(col, row) {
		return SMTH.CONTAINER.PIPES[row*BoardType.col+col];
	}

});