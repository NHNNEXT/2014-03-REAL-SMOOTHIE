
var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
		
		if (SMTH.STATUS.CURRENT_LEVEL == SMTH.LEVEL.TUTORIAL0) {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.LEVEL0;
		} else {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.TUTORIAL0;
		}
		this.addChild(new BackgroundLayer());
		this.addChild(new GameLayer());		
		
//		Ajax.getInstance().POST({
//			url: "http://httpbin.org/post",
//			data: "name=sally",
//			callback: function(response) {
//				cc.log(response);
//			}
//		});
//		Ajax.getInstance().POST({
//			url: "http://httpbin.org/post",
//			data: "name=sally",
//			callback: function(response) {
//				cc.log(response);
//			}
//		});
	}
});
