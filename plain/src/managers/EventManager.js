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
		
		this.handle("pipeRotateEnd", function(e) {
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
		
		this.handle("blockDied", function(e) {
			var block = e.getUserData();
			block.runAction(cc.sequence(
					cc.fadeOut(0.5), 
					cc.callFunc(function(block){
						block.isRotten = true;
						block.visible = false;
						var board = block.parent;
						board.replaceBlock(block);
					}.bind(this, block))
			));
		}.bind(this));
		
		this.handle("blockReplaced", function(e) {
			this.routeController.updateRoute(true);
		}.bind(this));
		
		this.handle("turnEnd", function(e) {
			cc.log("turnEnd!!!")
			this.routeController.updateRoute(false);
			
			var GAME_STATE = SMTH.CONST.GAME_STATE;
			var status = Judge.checkGameEnd();
			if (status == GAME_STATE.GAME_OVER) {
				this.currentScene.addChild(new GameOverLayer());
				cc.log("OVER");
			} else if (status == GAME_STATE.GAME_CLEAR) {
				this.currentScene.addChild(new GameClearLayer());
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