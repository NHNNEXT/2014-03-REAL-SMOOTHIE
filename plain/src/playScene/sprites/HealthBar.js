var HealthBar = cc.Sprite.extend({
	ctor: function(min, max, onStart) {
		// 배경: 흰 HP bar
		this._super(res.hpempty_png);
		
		this.hpBar = this.createIndicator(new cc.Sprite(res.hpfull_png));
		this.addChild(this.hpBar, 2);
		
		this.healIndicator = this.createIndicator(new cc.Sprite(res.hpempty_png));
		this.healIndicator.setColor(cc.color(80,255,40));
		this.addChild(this.healIndicator, 1);
		
		this.damageIndicator = this.createIndicator(new cc.Sprite(res.hpempty_png));
		this.damageIndicator.setColor(cc.color(251, 2, 8));
		this.addChild(this.damageIndicator, 3);
		
		this.remainIndicator = this.createIndicator(new cc.Sprite(res.hpfull_png));
		this.addChild(this.remainIndicator, 4);
		
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
		cc.log("HHHH"+hp);
		var percent = this.getPercentageOf();
		this.hpBar.setPercentage(percent);
		
		if (this.currentHP <= this.dieAt) {
			SMTH.EVENT_MANAGER.notice("enemyDied", this.getParent());
		}
	},
	blink: function(hpDist) {
		if (hpDist == 0) return;

		var fadeout = cc.fadeOut(0.5);
		var blinkingAction = new cc.RepeatForever(cc.sequence(fadeout, fadeout.reverse()));
		var newPercentage = this.getPercentageOf(this.currentHP + hpDist);
		
		if (hpDist > 0) {
			// 회복
			this.healIndicator.setOpacity(255);
			this.healIndicator.setPercentage(newPercentage);
			this.healIndicator.runAction(blinkingAction);
		} else {
			// 데미지
			this.damageIndicator.setOpacity(255);
			this.remainIndicator.setOpacity(255);
			this.damageIndicator.setPercentage(this.getPercentageOf());
			this.remainIndicator.setPercentage(newPercentage);
			this.damageIndicator.runAction(blinkingAction);
		}
	},
	stopBlinking: function() {
		this.healIndicator.stopAllActions();
		this.damageIndicator.stopAllActions();
		
		this.healIndicator.setOpacity(0);
		this.damageIndicator.setOpacity(0);
		this.remainIndicator.setOpacity(0);
	},
	getPercentageOf: function(hp) {
		if (hp == undefined) hp = this.currentHP;
		var percent = (hp - this.dieAt) / (this.cureAt - this.dieAt) * 100;
		return percent;
	}
});
