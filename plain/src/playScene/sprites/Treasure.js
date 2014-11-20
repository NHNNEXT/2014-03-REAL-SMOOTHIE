var Treasure = Block.extend({
	ctor:function (type) {
		this._super(IsolationType[type].resouceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ISOLATION;
		this.HP = IsolationType[1].HP;
	},

	isOpened : function(dir) {
		return false;
	}, 
});