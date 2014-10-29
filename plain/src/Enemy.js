var Enemy = Block.extend({
	ctor:function (type) {
		this._super(EnemyType[type].resouceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ENEMY;
	},
	isOpened : function(dir) {
		return true;
	}
});
