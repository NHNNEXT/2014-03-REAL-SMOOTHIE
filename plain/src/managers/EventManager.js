var EventManager = cc.Class.extend({
	ctor: function() {
		this.routeController = new RouteController();
		this.init();
	},
	init: function() {
		// format
		this.handle("", function(e) {
			
		}.bind(this));
	},
	notice: function(eventName, userData) {
		cc.eventManager.dispatchCustomEvent(eventName, userData);
	},
	handle: function(eventName, handlerFunction) {
		cc.eventManager.addCustomListener(eventName, handlerFunction);
	}
	
});