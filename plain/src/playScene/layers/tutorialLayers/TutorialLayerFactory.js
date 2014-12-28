var TutorialLayerFactory = cc.Class.extend({
	ctor: function() {
		
	}
});

TutorialLayerFactory.prototype.getLayer = function(level) {
	if (level == 0) {
		return new Tutorial1();
	} else if (level == 1) {
		return new Tutorial2();
	} else if (level == 2) {
		return new Tutorial3();
	} else return null;
}