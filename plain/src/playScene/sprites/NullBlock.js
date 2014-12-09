var NullBlock = Block.extend({
	ctor:function () {
		// 로직만을 위한 블록이므로 혹시라도 남아있다면 눈에 띄어야 한다. 
		this._super(IsolationType[0].resouceName);
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
