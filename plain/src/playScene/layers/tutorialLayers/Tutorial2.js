var Tutorial2 = TutorialLayer.extend({
	ctor: function() {
		this._super();
		this.setDescription("Drag Left to rotate left!");
	},

	run: function() {
		this.runAction(cc.repeatForever(cc.sequence(
				cc.callFunc(function() {
					var pos = this.getPositionOf(3,1);
					this.guideFinger.x = pos.x;
					this.guideFinger.y = pos.y;
					this.pressFinger.x = pos.x;
					this.pressFinger.y = pos.y;
				}.bind(this)),
				cc.delayTime(0.5),
				cc.callFunc(function() {
					this.toggle();
				}.bind(this)),
				cc.delayTime(0.5),
				cc.callFunc(function() {
					this.guideFinger.runAction(cc.moveBy(1,-100,0))
					this.pressFinger.runAction(cc.moveBy(1,-100,0))
				}.bind(this)),
				cc.delayTime(1.5),
				cc.callFunc(function() {
					this.toggle();
				}.bind(this)),
				cc.delayTime(0.5)
		)));
	}
});