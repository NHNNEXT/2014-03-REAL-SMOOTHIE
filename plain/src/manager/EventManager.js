var EventManager = cc.Class.extend({
	ctor: function() {
		this.routeController = new RouteController();
		this.judge = new Judge();
		this.init();
	},
	init: function() {
		this.handle("pipeAdded", function(e) {
			this.routeController.updateRoute();
		}.bind(this));
		
		this.handle("rotateEnd", function(e) {
			// update
			this.routeController.updateRoute();
			// if route is complete, skip.
			// if route doesnt complete, check gameover
			if (!this.routeController.attacked) {
				this.judge._checkIsGameOver();
			}
		}.bind(this));
		
		this.handle("pipeHidden", function(e) {
			// replace pipe
		}.bind(this));
		
		this.handle("enemyDied", function(e) {
			this.judge._checkIsGameCleared();
			this.judge._checkIsGameOver();
		}.bind(this));
		
		this.handle("startNewLevel", function(e) {
			this.judge.reset();
		}.bind(this));
	},
	
	handle: function(eventName, handler) {
		cc.eventManager.addCustomListener(eventName, handler);
	},
	notice: function(eventName) {
		cc.eventManager.dispatchEvent(new cc.EventCustom(eventName));
	}
})