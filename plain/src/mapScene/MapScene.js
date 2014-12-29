var MapScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		this.addChild(new BackgroundLayer());
		this.addChild(new MapLayer());
		this.init();
		
	},
	init: function() {
	    var screenSize = cc.view.getFrameSize();

		var powerNormal = new cc.Sprite(res.power_png);
		var powerSelected = new cc.Sprite(res.power_png);
		var powerDisabled = new cc.Sprite(res.power_png);
		var power = new cc.MenuItemSprite(powerNormal, powerSelected, powerDisabled, function() {
			cc.director.runScene(new HomeScene());
		}.bind(this));
		var powerMenu = new cc.Menu(power);
		this.addChild(powerMenu, 1, 2);
		powerMenu.x = 70;
		powerMenu.y = 70;	
		
		if(SMTH.DATA.isLoggedIn()) { 
			
/*
			var userSprite = new cc.Sprite(res.userPic);
			this.addChild(userSprite);
			userSprite.x = 180;
			userSprite.y = 70;
*/
			
			var userLabel = new cc.LabelTTF();
			userLabel.setFontName(res.LINEBold_ttf);
			userLabel.setFontSize(35);
			userLabel.setColor( cc.color(255,255,255));
			//JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).name
			userLabel.setString(JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).name);
			userLabel.x = 330;
			userLabel.y = 60;
			this.addChild(userLabel);			
		}
	}
	

});