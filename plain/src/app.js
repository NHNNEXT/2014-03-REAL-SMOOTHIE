
var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
                                      var levelArr = [];
                                      for( var i in SMTH.LEVEL ) {
                                      levelArr[SMTH.LEVEL[i].ID] = SMTH.LEVEL[i];
                                      }
                                      SMTH.STATUS.CURRENT_LEVEL = levelArr[SMTH.START_LEVEL_INDEX];
                                      SMTH.START_LEVEL_INDEX++;
                                      SMTH.START_LEVEL_INDEX = SMTH.START_LEVEL_INDEX % levelArr.length;
		/*
                                      if (SMTH.STATUS.CURRENT_LEVEL == SMTH.LEVEL.TUTORIAL0) {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.LEVEL0;
		} else {
			SMTH.STATUS.CURRENT_LEVEL = SMTH.LEVEL.TUTORIAL0;
		}
          */                            
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
