var NullBlock = Block.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.NULL;
		this.HP = 1;
	},
	isOpened : function(dir) {
		return false;
	},
	isEnemy : function() {
		return false;
	}
});
