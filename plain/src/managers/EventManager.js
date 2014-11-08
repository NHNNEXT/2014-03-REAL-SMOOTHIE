var EventManager = cc.Class.extend({
	ctor: function() {
		this.routeController = new RouteController();
		this.init();
	},
	init: function() {
		// format
		this.handle("", function(e){
			
		}.bind(this));
		
		this.handle("pipeRotateEnd", function(e){
			cc.log("rotateEnd");
			this.routeController.updateRoute();
		}.bind(this));
		
		this.handle("turnEnd", function(e) {
			var GAME_STATE = SMTH.CONST.GAME_STATE;
			var status = Judge.checkGameEnd();
			if (status == GAME_STATE.GAME_OVER) {
				// TODO: 게임오버레이어 띄우기
				cc.log("OVER");
			} else if (status == GAME_STATE.GAME_CLEAR) {
				// TODO: 게임클리어 레이어 띄우기
				cc.log("CLEAR");
			} else {
				return;
			}
		}.bind(this));
	},
	notice: function(eventName, userData) {
		cc.eventManager.dispatchCustomEvent(eventName, userData);
	},
	handle: function(eventName, handlerFunction) {
		cc.eventManager.addCustomListener(eventName, handlerFunction);
	}
	
});