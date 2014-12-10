var HealthBar = cc.ProgressTimer.extend({
	ctor: function(left, right, onStart) {
		this._super(new cc.Sprite(res.hpfull_png));
		this.setType(cc.ProgressTimer.TYPE_BAR);
		this.setMidpoint(cc.p(0,0.5));
		
		this.dieAt = left;
		this.cureAt = right;
		this.currentHP = onStart;
		
		var height = this._getHeight();		
		this.setPosition(undefined, 26);

		var percent = (onStart - left) / (right - left) * 100;
		this.setPercentage(percent);
		
		this.addChild(new cc.Sprite(res.hpempty_png), -2);
		
		this.indicator = new cc.Sprite(res.hpempty_png);
		this.addChild(this.indicator, -1);
		
		this.setChildrenOnCenter();
	}, 
	setChildrenOnCenter: function() {
		var width = this._getWidth();
		var height = this._getHeight();
		
		var children = this.getChildren();
		for (var i in children) {
			var child = children[i];
			child.x = width / 2;
			child.y = height / 2;
		}
	},
	setHP: function(hp) {
		this.cureAt = hp;
		this.dieAt = -hp;
		
		var percent = this.getPercentageOf();
		this.setPercentage(percent);
	},
	heal: function(hp) {
		this.currentHP += hp;

		var percent = this.getPercentageOf();
		this.setPercentage(percent);
		
		if (this.currentHP >= this.cureAt) {
			this.getParent().HP = -1;
		}
	},
	blink: function(heal) {
		// TODO: 아직 치료되는 양이 아니라 전체가 깜빡이는 수준
//		var start = this.getPercentage() / 100 * this.width;
//		var end = this.getPercentageOf(this.currentHP + heal) / 100 * this.width;
//		var width = end - start;
//		this.indicator.setScale(width / this.width, 0.1);
		this.indicator.setColor(cc.color(100,250,70));
		var fadeout = cc.fadeOut(0.5);
		this.blinkingAction = new cc.RepeatForever(cc.sequence(fadeout, fadeout.reverse()));

		this.indicator.runAction(this.blinkingAction);
	},
	stopBlinking: function() {
		this.indicator.setColor(cc.color(255,255,255));
		this.indicator.stopAction(this.blinkingAction);
	},
	getPercentageOf: function(hp) {
		if (hp == undefined) hp = this.currentHP;
		var percent = (hp - this.dieAt) / (this.cureAt - this.dieAt) * 100;
		return percent;
	}
});
