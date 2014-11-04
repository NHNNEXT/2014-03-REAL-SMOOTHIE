var EventManager = cc.Class.extend({
	ctor: function() {
		this.init();
	},
	init: function() {
		cc.eventManager.addCustomListener("rotateEnd", function(e) {
			
		});
	}
})