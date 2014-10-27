
var layerInstanceCache = {
	GameLayer:null
}

var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
		layerInstanceCache.GameLayer = new GameLayer()
		this.addChild(new BackgroundLayer());
		this.addChild(layerInstanceCache.GameLayer);
		this.addChild(new StatusLayer());
		
		Ajax.getInstance().POST({
			url: "http://httpbin.org/post",
			data: "name=sally",
			callback: function(response) {
				cc.log(response);
			}
		});
		Ajax.getInstance().POST({
			url: "http://httpbin.org/post",
			data: "name=sally",
			callback: function(response) {
				cc.log(response);
			}
		});
	}
});
