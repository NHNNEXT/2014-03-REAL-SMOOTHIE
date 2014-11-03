var Enemy = Block.extend({
	ctor:function (type) {
		this._super(EnemyType[type].resouceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ENEMY;
		this.HP = EnemyType[0].HP;
	},
	isOpened : function(dir) {
		return true;
	},
	isEnemy : function() {
		return true;
	}
});
