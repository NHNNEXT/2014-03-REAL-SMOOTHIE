var Character = cc.Sprite.extend({
	ctor:function (type) {
		this._super(CharacterType[type].resouceName);
		this.init(type);
	},
	init: function() {
		
	}
});
