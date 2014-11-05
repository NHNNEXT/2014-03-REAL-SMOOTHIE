
var RouteController = cc.Class.extend({
	blocks : null,
	routes: null,
	_level: null,
	attacked: null,
	ctor:function () {
		//this._super();
		this.init();
	},

	init:function () {
		this.blocks = SMTH.CONTAINER.PIPES;
		SMTH.CONTAINER.TURN = 0;
		this.routes = [];
		this.attacked = false;
		this._level = SMTH.STATUS.CURRENT_LEVEL;
	},
	updateRoute: function() {
		// 파이프 맵 정보를 새로 받아옴
		this.blocks = SMTH.CONTAINER.PIPES;
		// 보드 상의 모든 파이프의 연결 정보를 초기화 
		this.initRoute();
		// 파이프의 ConnectedWith 정보 추가
		this.checkIsConnected();		
		// 라우트를 생성
		this.makeRoutes();
		// 라우트를 식별하기 위한 채색작업 수행
		SMTH.EFFECT_MANAGER.colorRoute(this.routes);
		// 공격에 해당하는 라우트에 hurt 메시지를 보냄
		this.hurtRoute();
	},
	
	initRoute: function() {
		this.blocks = SMTH.CONTAINER.PIPES;
		for(var i in this.blocks) {
			var block = this.blocks[i];
			if(block.HP <= 0) {
				continue;
			}
			block.connectedWith = [];
			block.setColor(cc.color(255, 255, 255));
		}
		this.attacked = false;
		this.routes = [];
		this.checkedFriends = [];
		
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
	},
	

	makeRoutes: function() {
		var checkedFriends = [];
		for (var i = 0; i < this._level.row; i++) {
			var row = this._level.MAP[i];
			for (var j = 0; j < this._level.col ; j++) {
				var block = this._getPipe(j, i);
				if (block.type == BLOCK.TYPE.FRIEND && checkedFriends.indexOf(block) < 0) {
					var route = new Route(block);
					cc.log("route length: " + route.blocks.length);
					checkedFriends.concat(route.friends);
					this.routes.push(route);
				}
			}
		}
	},
	
	hurtRoute : function() {
		for (var i in this.routes) {
			var route = this.routes[i];
			if (route.numberOfEnemies > 0) {
				this.attacked = true;
				route.hurt();
			}
		}
	}
});
