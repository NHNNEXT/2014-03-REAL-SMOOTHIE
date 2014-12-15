var HealthBar = cc.Sprite.extend({
	ctor: function(min, max, onStart) {
		// 배경: 흰 HP bar
		this._super(res.hpempty_png);
		
		var hpWhite = new cc.Sprite(res.hpempty_png);
		var hpGradient = new cc.Sprite(res.hpfull_png);
		
		this.hpBar = this.createIndicator(hpGradient);
		this.addChild(this.hpBar);
		
		this.healIndicator = this.createIndicator(hpWhite);
		this.addChild(this.healIndicator, -2);
		
		this.damageIndicator = this.createIndicator(hpWhite);
		this.addChild(this.damageIndicator, -2);
		
		this.remainIndicator = this.createIndicator(hpGradient);
		this.addChild(this.remainIndicator, -2);
		
		this.dieAt = min;
		this.cureAt = max;
		this.currentHP = onStart;

		var percent = (onStart - min) / (max - min) * 100;
		this.hpBar.setPercentage(percent);
		
		this.setChildrenOnCenter();
	},
	createIndicator: function(sprite) {
		var indicator = new cc.ProgressTimer(sprite);
		indicator.setType(cc.ProgressTimer.TYPE_BAR);
		indicator.setMidpoint(cc.p(0,0.5));
		indicator.setPercentage(0);
		return indicator;
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
		this.hpBar.setPercentage(percent);
	},
	heal: function(hp) {
		this.currentHP += hp;

		var percent = this.getPercentageOf();
		this.hpBar.setPercentage(percent);
		
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
		cc.log("hul");
		this.indicator.setOpacity(255);
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
