var EventManager = cc.Class.extend({
	ctor: function() {
		this.routeController = new RouteController();
		this.judge = new Judge();
		this.init();
	},
	init: function() {
		cc.eventManager.addCustomListener("pipeAdded", function(e) {
			this.routeController.updateRoute();
		}.bind(this));
		
		cc.eventManager.addCustomListener("rotateEnd", function(e) {
			// update
			this.routeController.updateRoute();
			if (!this.routeController.attacked) {
				this.judge._checkIsGameOver();
			}
			// if route is complete, skip.
			// if route doesnt complete, check gameover
		}.bind(this));
		
		cc.eventManager.addCustomListener("pipeHidden", function(e) {
			// replace pipe
		}.bind(this));
		
		cc.eventManager.addCustomListener("enemyDied", function(e) {
			this.judge._checkIsGameCleared();
			this.judge._checkIsGameOver();
		}.bind(this));
		
		cc.eventManager.addCustomListener("startNewLevel", function(e) {
			this.judge.reset();
		}.bind(this));
	},
	addListener: function(listener, nodeOrPriority) {
		cc.eventManager.addListener(listener, nodeOrPriority)
	},
	dispatchEvent: function(event) {
		cc.eventManager.dispatchEvent(event);
	}
})