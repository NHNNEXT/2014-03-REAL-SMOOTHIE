var GameLayer = cc.Layer.extend({
	clickCount: null,
	clicked: null,
	_rectArr : null,
	_boardController: null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function (levelConfig) {
		this.addChild(new BoardLayer());
	}

});
