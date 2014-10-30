
var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
		
		SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.LEVEL0;
		this.addChild(new BackgroundLayer());
		this.addChild(new GameLayer());
		this.addChild(new StatusLayer());
		
		
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
