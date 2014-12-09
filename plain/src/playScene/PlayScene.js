
var PlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
                                     
		this.initSMTH();
		
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
	},
	
	initSMTH: function() {
		var levelArr = [];
		for( var i in SMTH.LEVEL ) {
			levelArr[SMTH.LEVEL[i].ID] = SMTH.LEVEL[i];
		}
		SMTH.STATUS.CURRENT_LEVEL = levelArr[SMTH.START_LEVEL_INDEX];
		SMTH.START_LEVEL_INDEX++;
		SMTH.START_LEVEL_INDEX = SMTH.START_LEVEL_INDEX % levelArr.length;
		
		if (SMTH.EVENT_MANAGER != null) {
			SMTH.EVENT_MANAGER.fire();
		}
		SMTH.EVENT_MANAGER = new EventManager();
	}
});
