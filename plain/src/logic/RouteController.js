
var RouteController = cc.Class.extend({
	ctor:function () {
		//this._super();
		this.init();
	},

	init:function () {
		SMTH.CONTAINER.TURN = 0;
		this.pipes = [];
		this.routes = [];
		this._level = SMTH.STATUS.CURRENT_LEVEL;
	},
	updateRoute: function() {
		// 보드 상의 모든 파이프의 연결 정보를 초기화 
		this.initRoute();
		// 파이프의 ConnectedWith 정보 추가
		this.checkIsConnected();
		// 라우트를 생성
		this.makeRoutes();
		// 라우트를 식별하기 위한 채색작업 수행
		this.colorRoute();
		// 공격에 해당하는 라우트에 hurt 메시지를 보냄
		this.killRoute();
	},
	initRoute: function() {
		this.pipes = SMTH.CONTAINER.PIPES;
		for(var i in this.pipes) {
			if(this.pipes[i].HP <= 0) {
				continue;
			}
			this.pipes[i].visitFlag = false;
			this.pipes[i].connectedWith = [];
			this.pipes[i].setColor(cc.color(255, 255, 255));
		}
		this.routes = [];
		
	},
	colorRoute : function() {
		for (var i in this.routes) {
			var route = this.routes[i];
			route.colorPipes();
		}
	},
	killRoute : function() {
		for (var i in this.routes) {
			var route = this.routes[i];
			if (route.numberOfEnemies > 0) {
				route.hurt();
			}
		}
	},
	makeRoutes: function() {
		for (var i = 0; i < this._level.row; i++) {
			var row = this._level.MAP[i];
			for (var j = 0; j < this._level.col ; j++) {
				if (row[j] == BLOCK.TYPE.FRIEND) {
					var route = new Route(this._getPipe(j, i));
					this.routes.push(route);
				}
			}
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
		if(upPipe.HP <= 0 || downPipe.HP <= 0) return false;
		return upPipe.isOpened(BLOCK.DIRECTION.DOWN) && downPipe.isOpened(BLOCK.DIRECTION.UP);
	},
	_checkHorizontalConnection: function(leftPipe, rightPipe) {
		if(leftPipe.type > 0 && rightPipe.type > 0) return false;
		if(leftPipe.HP <= 0 || rightPipe.HP <= 0) return false;
		return leftPipe.isOpened(BLOCK.DIRECTION.RIGHT) && rightPipe.isOpened(BLOCK.DIRECTION.LEFT);
	},
		
	_getPipe: function(col, row) {
		return SMTH.CONTAINER.PIPES[row*this._level.col+col];
	}

});