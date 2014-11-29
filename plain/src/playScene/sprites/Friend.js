var Friend = Block.extend({
	ctor:function (type) {
		this._super(FriendTypeInfo[type].resouceName);
		this.init();
	},
	init: function() {
		this.HP = 1;
		this.type = BLOCK.TYPE.FRIEND;
		var actionTo = cc.moveBy(1, cc.p(0, 8));
        var actionToBack = actionTo.reverse();
		var rep = new cc.RepeatForever(cc.sequence(actionTo, actionToBack), 5);
        this.runAction(rep);
	},
	isOpened : function(dir) {
		return true;
	},
	isFriend : function() {
		return true;
	}
});
