
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
		
	    var screenSize = cc.view.getFrameSize();

		var mapNormal = new cc.Sprite(res.map_png);
		var mapSelected = new cc.Sprite(res.map_png);
		var mapDisabled = new cc.Sprite(res.map_png);
		var map = new cc.MenuItemSprite(mapNormal, mapSelected, mapDisabled, function() {
			SMTH.STATUS.CHAR_SELECTED = null;
			cc.director.runScene(new MapScene());
		}.bind(this));
		var mapMenu = new cc.Menu(map);
		this.addChild(mapMenu, 1, 2);
		mapMenu.x = 70;
		mapMenu.y = 70;	
	},
	
	initSMTH: function() {
		var levelArr = [];
		for( var i in SMTH.LEVEL ) {
			levelArr[SMTH.LEVEL[i].ID] = SMTH.LEVEL[i];
		}
		cc.log("StartLEvelIndex: "+SMTH.START_LEVEL_INDEX);
		// 마지막 라운드 실행 시 StartlevelIndex == 0 으로 돌아가게 됨. 그런데 게임오버시 --1 -> idx == -1
		// idx < 0 일 경우 처리 로직
		SMTH.START_LEVEL_INDEX = (SMTH.START_LEVEL_INDEX + levelArr.length) % levelArr.length;
		
		SMTH.STATUS.CURRENT_LEVEL = levelArr[SMTH.START_LEVEL_INDEX];
		SMTH.START_LEVEL_INDEX++;
		SMTH.START_LEVEL_INDEX = SMTH.START_LEVEL_INDEX % levelArr.length;
		
		if (SMTH.EVENT_MANAGER != null) {
			SMTH.EVENT_MANAGER.fire();
		}
		SMTH.EVENT_MANAGER = new EventManager();
	}
});
