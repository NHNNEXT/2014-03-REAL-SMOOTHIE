var Enemy = Block.extend({
	ctor:function (type) {
		this._super(EnemyType[type].resouceName);
		this.init(type);
	},
	init: function() {

	}
});
