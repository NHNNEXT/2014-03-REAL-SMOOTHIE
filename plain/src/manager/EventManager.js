var EventManager = cc.Class.extend({
	ctor: function() {
		this.routeController = new RouteController();
		this.init();
	},
	init: function() {
		cc.eventManager.addCustomListener("rotateEnd", function(e) {
			// update
			this.routeController.updateRoute();
			// if route is complete, skip.
			// if route doesnt complete, check gameover
		}.bind(this));
		
		cc.eventManager.addCustomListener("pipeHidden", function(e) {
			// replace pipe
		}.bind(this));
		
		cc.eventManager.addCustomListener("enemyDied", function(e) {
			// replace to pipe, check game clear/over
		}.bind(this));
		
	},
	addListener: function(listener, nodeOrPriority) {
		cc.eventManager.addListener(listener, nodeOrPriority)
	},
	dispatchEvent: function(event) {
		cc.eventManager.dispatchEvent(event);
	},
	other: function() {
		{
			this._corpseCollector();
			this._fillBoard();
			this._checkIsGameCleared();
			this._checkIsGameOver();
		}
	}
})