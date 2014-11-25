var Enemy = Block.extend({
	ctor:function (type) {
        this._super(EnemyType[type].resouceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ENEMY;
		this.HP = EnemyType[0].HP;
		
       	this.hpBar = new HealthBar(-1, 1, 0);
        this.hpBar.x = 70;
		this.addChild(this.hpBar);
		
		var actionTo = cc.scaleBy(1.5, 1.04);
        var actionToBack = actionTo.reverse();
		var rep = new cc.RepeatForever(cc.sequence(actionTo, actionToBack), 5);
		this.runAction(rep);

	},
	setHP : function(hp) {
		this.hpBar.setHP(hp);
	},
	hurt: function(damage, callback) {
		this.hpBar.heal(damage);
		callback();
	},
	isOpened : function(dir) {
		return true;
	},
	isEnemy : function() {
		return true;
	}
});
