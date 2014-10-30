
var GameManger = cc.Class.extend({
	pipes : null,
	routes: null,
	_level: null,
	ctor:function () {
		//this._super();
		this.init();
	},

	init:function () {
		this.pipes = SMTH.CONTAINER.PIPES;
		this.routes = [];
		this._level = SMTH.STATUS.CURRENT_LEVEL;
	},
	updateRoute: function() {
		this.initRoute();
		
		this.checkIsConnected();
		this.checkRoute();
		this._getRoutes();
		this.colorRoute();
	},
	initRoute: function() {
		// visitFlag 초기화
		for(var i in this.pipes) {
			this.pipes[i].visitFlag = false;
			this.pipes[i].connectedWith = [];
			this.pipes[i].setColor(cc.color(255, 255, 255));
		}
		this.routes = [];
		
	},
	colorRoute : function() {
		for(var i in this.pipes) {
			if(this.pipes[i].visitFlag && this.pipes[i].type != 1) {
				this.pipes[i].setColor(cc.color(0, 0, 255));
			}
		};
		for (var i in this.routes) {
			var route = this.routes[i];
			if (route.numberOfEnemies > 0) {
				route.colorRed();
			}
		}
	},
	

	_getRoutes: function() {
		for (var i = 0; i < SMTH.STATUS.CURRENT_LEVEL.row; i++) {
			var row = this._level.MAP[i];
			for (var j = 0; j < this._level.col ; j++) {
				if (row[j] == BLOCK_TYPE.FRIEND) {
					var route = new Route(this._getPipe(j, i));
					this.routes.push(route);
				} 
			}
		}
	},
	
	checkRoute : function() {
		for(var i=0 ; i < this._level.col ; i++) {
			if(this.pipes[i].type==1) {
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
		for (var r = 0; r < this._level.row-1; r++) {
			for (var c = 0; c < this._level.col; c++) {
				var upPipe = this._getPipe(c,r+1);
				var downPipe = this._getPipe(c,r);
				if(this._checkVerticalConnection(upPipe, downPipe)) {
					upPipe.connectedWith.push(downPipe);
					downPipe.connectedWith.push(upPipe);
				}
			}
		}
		for (var r = 0; r < this._level.row; r++) {
			for (var c = 0; c < this._level.col-1; c++) {
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
		return SMTH.CONTAINER.PIPES[row*this._level.col+col];
	}

});