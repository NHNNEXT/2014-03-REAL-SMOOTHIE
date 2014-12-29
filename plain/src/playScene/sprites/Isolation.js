var Isolation = Block.extend({
	ctor:function (type) {
		this._super(IsolationType[type].resourceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ISOLATION;
		this.HP = IsolationType[0].HP;
	},
	
	isOpened : function(dir) {
		return false;
	}, 
});