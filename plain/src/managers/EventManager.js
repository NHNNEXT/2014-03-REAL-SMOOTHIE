var EventManager = cc.Class.extend({
	ctor: function() {
		this.init();
	},
	init: function() {
		// format
//		this.handle("", function(e){
//			
//		}.bind(this));
		
		this.handle("gameStart", function(e){
			this.currentScene = cc.director.getRunningScene();
			this.routeController = new RouteController();
			this.boardController = new BoardController();
			// 시작하면 색칠해주기
			this.routeController.updateRoute(false);
		}.bind(this));
		
		this.handle("turnEnd", function(e) {
			// RouteController와 Judge를 모두 건드려야 해서 여기에 남게 됨.
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