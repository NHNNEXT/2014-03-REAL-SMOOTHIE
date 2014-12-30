var Tutorial1 = TutorialLayer.extend({
	ctor: function() {
		this._super();
	},
	run: function() {
		this.runAction(cc.repeatForever(cc.sequence(
			cc.callFunc(function() {
				var pos = this.getPositionOf(2,0);
				this.guideFinger.x = pos.x;
				this.guideFinger.y = pos.y;
				this.pressFinger.x = pos.x;
				this.pressFinger.y = pos.y;
				this.setDescription("Drag straw to rotate");
			}.bind(this)),
			cc.delayTime(0.5),
			cc.callFunc(function() {
				this.toggle();
			}.bind(this)),
			cc.delayTime(0.5),
			cc.callFunc(function() {
				this.guideFinger.runAction(cc.moveBy(1,100,0))
				this.pressFinger.runAction(cc.moveBy(1,100,0))
			}.bind(this)),
			cc.delayTime(1.5),
			cc.callFunc(function() {
				this.toggle();
			}.bind(this)),
			cc.delayTime(0.5),
			cc.callFunc(function() {
				var pos = this.getPositionOf(4,0);
				this.guideFinger.runAction(cc.moveTo(0.5,pos))
				this.pressFinger.runAction(cc.moveTo(0.5,pos))
				this.setDescription("Click patients to heal them");
			}.bind(this)),
			cc.delayTime(1),
			cc.callFunc(function() {
				this.toggle();
			}.bind(this)),
			cc.delayTime(0.5),
			cc.callFunc(function() {
				this.toggle();
			}.bind(this)),
			cc.delayTime(1)
		)));
	}
});