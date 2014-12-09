var EventManager = cc.Class.extend({
	ctor: function() {
		this.init();
	},
	init: function() {
		// format
//		this.listen("", function(e){
//			
//		}.bind(this));
	},
	notice: function(eventName, userData) {
		cc.eventManager.dispatchCustomEvent(eventName, userData);
	},
	listen: function(eventName, handlerFunction) {
		cc.eventManager.addCustomListener(eventName, handlerFunction);
	},
	fire: function() {
		cc.eventManager.removeAllListeners();
	}
	
});