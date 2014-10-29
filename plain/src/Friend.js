var Friend = Block.extend({
	ctor:function (type) {
		cc.log("init friend type : " + type);
		this._super(CharacterType[type].resouceName);
		this.init(type);
	},
	init: function() {
		
	}
});
