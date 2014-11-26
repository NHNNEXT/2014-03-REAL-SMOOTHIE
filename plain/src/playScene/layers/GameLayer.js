var GameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		SMTH.CONTAINER.BOARD = new BoardLayer();
		this.addChild(SMTH.CONTAINER.BOARD);
		this.addChild(new StatusLayer());
	}

});
