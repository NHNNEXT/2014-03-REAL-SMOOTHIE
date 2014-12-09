var EventManager = cc.Class.extend({
	ctor: function() {
		this.currentScene = cc.director.getRunningScene();
		this.routeController = new RouteController();
		this.init();
	},
	init: function() {
		// format
		this.handle("", function(e){
			
		}.bind(this));
		
		this.rountesCount = 0;
		
		this.handle("gameStart", function(e){
			this.currentScene = cc.director.getRunningScene();
			this.routeController = new RouteController();
			// 게임 시작 시 연결된 파이프 공격 ㅇㅇ.
			this.routeController.updateRoute(false);
		}.bind(this));
		
		this.handle("pipeRotateEnd", function(e) {
			this.routeController.updateRoute(false);
		}.bind(this));
		
		this.handle("mix", function(e) {
			//mix and update cup
		}.bind(this));
		
		this.handle("slurp", function(e) {
			this.routeController.updateRoute(true);
		}.bind(this));
		
		this.handle("attack", function(e) {
			var routes = e.getUserData();
			for (var i in routes) {
				var route = routes[i];
				if (route.numberOfEnemies > 0) {
					route.hurt();
				}
			}
		}.bind(this));
		
		this.handle("routeUsed", function(e) {
			var route = e.getUserData();
			for (var i in route.blocks) {
				var block = route.blocks[i];
				// 아군은 교체하지 않음 
				if (block.isFriend()) continue;
				// HP가 남아있어도 교체하지 않음.
				if (block.HP > 0) continue;
				
				// 다른 녀석들은 교체할 녀석들.
				// 죽은 카운트를 증가시키는 대신
				route.blockDeadCnt++;
				block.runAction(cc.sequence(
						cc.fadeOut(0.5), 
						cc.callFunc(function(block, route){
							block.visible = false;
							var board = SMTH.CONTAINER.BOARD;
							board.replaceBlock(block);
							// 되살아날 때 죽음 카운트를 줄인다.
							route.decreaseDeadCnt();
						}.bind(this, block, route))
				));
			}
		}.bind(this));
		
		this.handle("routeDied", function(e) {
			this.rountesCount++;
			if(this.routeController.routes.length == this.rountesCount) {
				var board = SMTH.CONTAINER.BOARD;
				board.fallBlock(); // 블록을 내려오게함
			}
		}.bind(this));
		
		this.handle("turnEnd", function(e) {
			var GAME_STATE = SMTH.CONST.GAME_STATE;
			this.routeController.updateRoute(false);
			
			// 이미 종료 판단이 내려진 경우
			if (SMTH.STATUS.GAME_STATE != GAME_STATE.NOT_END) {
				return;
			}
			
			var status = Judge.checkGameEnd();
			SMTH.STATUS.GAME_STATE = status;
			if (status == GAME_STATE.GAME_OVER) {
				this.currentScene.addChild(new GameOverLayer());
				cc.log("OVER");
			} else if (status == GAME_STATE.GAME_CLEAR) {
				this.currentScene.addChild(new GameClearLayer());
				cc.log("CLEAR");
			}
		}.bind(this));
	},
	notice: function(eventName, userData) {
		cc.eventManager.dispatchCustomEvent(eventName, userData);
	},
	handle: function(eventName, handlerFunction) {
		cc.eventManager.addCustomListener(eventName, handlerFunction);
	},
	fire: function() {
		cc.eventManager.removeAllListeners();
	}
	
});