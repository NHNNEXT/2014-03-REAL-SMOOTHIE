var Friend = Block.extend({
	ctor:function (type) {
		cc.log("init friend type : " + type);
		this._super(CharacterType[type].resouceName);
		this.init();
	},
	init: function() {
		this.HP = 1;
		this.type = BLOCK.TYPE.FRIEND;
	},
	isOpened : function(dir) {
		return true;
	},
	isFriend : function() {
		return true;
	}
});
