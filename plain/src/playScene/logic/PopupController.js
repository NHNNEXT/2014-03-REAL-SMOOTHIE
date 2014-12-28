var PopupController = cc.Class.extend({
	ctor: function () {
		this.init();
	},
	init: function() {
		this.currentScene = cc.director.getRunningScene();
		this.initListener();
		this.winsize = cc.director.getWinSize();
	},
	popup: function(layer, zindex) {
		cc.log("popup");
		if (zindex == undefined) {
			zindex = 0;
		}
//		cc.director.pause();
		//popup 에니메이션 설정
		layer.setPosition(cc.p(0, this.winsize.height));
		this.currentScene.addChild(layer, zindex);
		var easeMoveBy = cc.moveTo(1,cc.p(0,0)).easing(cc.easeBounceOut(0.5));
		layer.runAction(easeMoveBy);
	},
	initListener: function() {
		SMTH.EVENT_MANAGER.listen("gameOver", function(e) {
			this.popup(new GameOverLayer());
		}.bind(this));
		
		SMTH.EVENT_MANAGER.listen("gameClear", function(e) {
			this.popup(new GameClearLayer());
		}.bind(this));
		
		SMTH.EVENT_MANAGER.listen("characterSelector", function(e) {
			this.popup(new SelectorLayer(), 10);
		}.bind(this));
	}
});