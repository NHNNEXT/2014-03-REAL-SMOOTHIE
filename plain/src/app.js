
var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
		
		if (SMTH.STATUS.CURRENT_LEVEL == SMTH.LEVEL.TUTORIAL0) {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.LEVEL0;
		} else {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.TUTORIAL0;
		}
		SMTH.EFFECT_MANAGER = new EffectManager();
		SMTH.EVENT_MANAGER = new EventManager();

		this.addChild(new BackgroundLayer());
		this.addChild(new BoardLayer());
		this.addChild(new StatusLayer());
		
		// for initial route check
		SMTH.EVENT_MANAGER.notice("rotateEnd");

	}
});
