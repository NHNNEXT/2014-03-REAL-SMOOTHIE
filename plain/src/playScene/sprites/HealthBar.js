var HealthBar = cc.ProgressTimer.extend({
	ctor: function(left, right, onStart) {
		this._super(new cc.Sprite(res.hpfull_png));
		this.setType(cc.ProgressTimer.TYPE_BAR);
		this.setMidpoint(cc.p(0,0.5));
		
		this.dieAt = left;
		this.cureAt = right;
		this.currentHP = onStart;
		
		var percent = (onStart - left) / (right - left) * 100;
		this.setPercentage(percent);
		
		this.addChild(new cc.Sprite(res.hpempty_png), -1);
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
		
		var percent = (this.currentHP - this.dieAt) / (this.cureAt - this.dieAt) * 100;
		this.setPercentage(percent);
	},
	heal: function(hp) {
		this.currentHP += hp;

		var percent = (this.currentHP - this.dieAt) / (this.cureAt - this.dieAt) * 100;
		this.setPercentage(percent);
		
		if (this.currentHP >= this.cureAt) {
			this.getParent().HP = -1;
		}
	}
});
