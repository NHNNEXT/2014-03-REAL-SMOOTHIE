
var PlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
                                     
		this.initSMTH();
		
		this.addChild(new BackgroundLayer());
		this.addChild(new GameLayer());
		
		var additionalLayers = SMTH.STATUS.CURRENT_LEVEL.ADDITIONAL_LAYERS;
		for (var i in additionalLayers) {
			var layer = new additionalLayers[i]();
			this.addChild(layer);
			layer.init();
			layer.run();
		}
//		this.tutorial = new TutorialLayerFactory();
//		var tutorialLayer = this.tutorial.getLayer(SMTH.STATUS.CURRENT_LEVEL.ID)
//		if (tutorialLayer !== null) {
//			tutorialLayer.init();
//			this.addChild(tutorialLayer);
//			tutorialLayer.run();
//		}
		
	    var screenSize = cc.view.getFrameSize();

		var mapNormal = new cc.Sprite(res.map_png);
		var mapSelected = new cc.Sprite(res.map_png);
		var mapDisabled = new cc.Sprite(res.map_png);
		var map = new cc.MenuItemSprite(mapNormal, mapSelected, mapDisabled, function() {
			cc.director.runScene(new MapScene());
		}.bind(this));
		var mapMenu = new cc.Menu(map);
		this.addChild(mapMenu, 1, 2);
		mapMenu.x = 70;
		mapMenu.y = 70;	
		
		
		if(SMTH.DATA.isLoggedIn()) {

			var userSprite = new cc.Sprite(res.userPic);
			this.addChild(userSprite);
			userSprite.x = 180;
			userSprite.y = 70;
			
			var userLabel = new cc.LabelTTF();
			userLabel.setFontName(res.LINEBold_ttf);
			userLabel.setFontSize(35);
			userLabel.setColor( cc.color(255,255,255));
			//JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).name
			cc.log();
			userLabel.setString(JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).name);
			userLabel.x = 330;
			userLabel.y = 60;
			this.addChild(userLabel);			
		}
		
		var fbId = 123;
		
//		var fbInfo = SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo");
//		var fbId = fbInfo.id || 1234567890;
//		
//		SMTH.MODULE.DATA.load(fbId, function() {
//			cc.log("QWEQWE"+JSON.stringify(SMTH.LOAD_CACHE));
//		});
//		var data = {"name": "yg"};
//		SMTH.MODULE.DATA.save(fbId, data, function() {
//			cc.log("@@@#@#");
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
