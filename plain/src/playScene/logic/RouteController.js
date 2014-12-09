
var RouteController = cc.Class.extend({
	ctor: function () {
		this.init();
		this.initListener();
	},

	init: function () {
		SMTH.CONTAINER.TURN = 0;
		this.pipes = [];
		this.routes = [];
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		this.canAttack = false;
		this.NumberOfCanAttack = 0;
	},
	initListener: function() {
		SMTH.EVENT_MANAGER.listen("pipeRotateEnd", function(e) {
			// TODO: 턴 방식이 제대로 구현되면 이 리스너는 없어져야 함
			this.updateRoute();
		}.bind(this));
		
		SMTH.EVENT_MANAGER.listen("slurp", function(e) {
			this.updateRoute();
			this.attack();
		}.bind(this));
		
		SMTH.EVENT_MANAGER.listen("attack", function(e) {
			var routes = this.routes;
			for (var i in routes) {
				var route = routes[i];
				if (route.numberOfEnemies > 0) {
					route.hurt();
				}
			}
			SMTH.EVENT_MANAGER.notice("attackEnd");
		}.bind(this));
	},
	updateRoute: function(withAttack) {
		// 보드 상의 모든 파이프의 연결 정보를 초기화 
		this.initRoute();
		// 파이프의 ConnectedWith 정보 추가
		this.checkIsConnected();
		// 라우트를 생성
		this.makeRoutes();
		// 라우트를 식별하기 위한 채색작업 수행
		this.colorRoute();		
	},
	attack: function() {
		// 공격 가능 정보 초기화
		this.canAttack = false;
		// 공격할 수 있는지 판단
		this.checkRoute();

		/* 
		 * 아래 과정은 공격이 불가능해질때까지 반복됨.
		 * 공격 후 파이프 재생성, 다시 라우트 생성, 공격 할 수 있다면 다시
		 * 공격 후 파이프 재생성 ...
		 */

		// 공격이 가능하다면 공격
		if (this.canAttack) {
			SMTH.EVENT_MANAGER.notice("attack");
		} else {
			// 공격이 불가능해졌을 때 턴 종료 선언
			SMTH.EVENT_MANAGER.notice("turnEnd");
		}
	},
	initRoute: function() {
		this.pipes = SMTH.CONTAINER.PIPES;
		for(var i in this.pipes) {
			if(this.pipes[i].HP <= 0) {
				continue;
			}
			if(this.pipes[i].type == BLOCK.TYPE.ISOLATION) continue; 

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
	checkRoute : function() {
		for (var i in this.routes) {
			var route = this.routes[i];
			if (route.numberOfEnemies > 0) {
				this.canAttack = true;
				this.NumberOfCanAttack++;
			}
		}
	},

	makeRoutes: function() {
		var friends = [];
		for (var i = 0; i < SMTH.CONTAINER.PIPES.length ;i++) {
			var block = SMTH.CONTAINER.PIPES[i];
			if (block.isFriend()) {
				var friend = block;
				if (friends.indexOf(friend) >= 0) {
					continue;
				}
				var route = new Route(friend);
				for(var j in route.blocks) {
					if(route.blocks[j].isFriend()){
						friends.push(route.blocks[j])
					};
				}
				this.routes.push(route);
				route.tag = i;						
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
		if(upPipe.type !== BLOCK.TYPE.PIPE && downPipe.type !== BLOCK.TYPE.PIPE) return false;
		if(upPipe.HP <= 0 || downPipe.HP <= 0) return false;
		return upPipe.isOpened(BLOCK.DIRECTION.DOWN) && downPipe.isOpened(BLOCK.DIRECTION.UP);
	},
	_checkHorizontalConnection: function(leftPipe, rightPipe) {
		if(leftPipe.type !== BLOCK.TYPE.PIPE&& rightPipe.type !== BLOCK.TYPE.PIPE) return false;
		if(leftPipe.HP <= 0 || rightPipe.HP <= 0) return false;
		return leftPipe.isOpened(BLOCK.DIRECTION.RIGHT) && rightPipe.isOpened(BLOCK.DIRECTION.LEFT);
	},
		
	_getPipe: function(col, row) {
		return SMTH.CONTAINER.PIPES[row*this._level.col+col];
	}

});