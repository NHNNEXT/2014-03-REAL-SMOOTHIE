var Enemy = Block.extend({
	ctor:function (type) {
		this._super(EnemyType[type].resouceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ENEMY;
		this.HP = EnemyType[0].HP;
		this.hpLabel = new cc.LabelTTF();
		this.hpLabel.setFontName("LINEBold");
		this.hpLabel.setFontSize(38);
		this.hpLabel.setColor( cc.color(255, 255, 240));
		this.hpLabel.setString(this.HP);
		// position the label on the center of the screen
		this.hpLabel.x = 140*2 / 3;
		this.hpLabel.y = 0;
		this.hpLabel.anchorX = 0;
		this.hpLabel.anchorY = 0;
		this.addChild(this.hpLabel);
		
		this.scheduleUpdate();
	},
	isOpened : function(dir) {
		return true;
	},
	isEnemy : function() {
		return true;
	},
	update : function() {
		this.hpLabel.setString(this.HP);
	}
});
