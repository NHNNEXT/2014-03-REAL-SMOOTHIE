var GameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function (levelConfig) {
		this.addChild(new BoardLayer());
		this.addChild(new StatusLayer());
	}

});
