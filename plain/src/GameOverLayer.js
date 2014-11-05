var GameOverLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(0, 0, 0, 220));
		this.init();
	},

	init: function() {
		var winsize = cc.director.getWinSize();
		this.setContentSize(winsize);
		var GameClearTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.test
		});
		cc.eventManager.addListener(GameClearTouchListener.clone(), this);
//		this.setTouchEnabled(true);
//		this.setColor(cc.color(255, 255, 255));
		// Create the button
//		var button = new ccui.Button();
//		button.setTouchEnabled(true);
//		button.loadTextures(res.button_n, res.button_p, "");
//		button.x = winsize.width / 2; 
//		button.y = winsize.height / 2;
//		button.addTouchEventListener(this.touchEvent, this);
//		this.addChild(button);
		
		this.overLabel = new cc.LabelTTF("GAME OVER", "Arial", 38);
		// position the label on the center of the screen
		this.overLabel.setColor(cc.color(255, 255, 255));
		this.overLabel.x = winsize.width / 2;
		this.overLabel.y = winsize.height / 2 + 140;
		// add the label as a child to this layer
		this.addChild(this.overLabel);
		
		var playAgainNormal = new cc.Sprite(res.menu_png, cc.rect(378, 0, 126, 33));
		var playAgainSelected = new cc.Sprite(res.menu_png, cc.rect(378, 33, 126, 33));
		var playAgainDisabled = new cc.Sprite(res.menu_png, cc.rect(378, 33 * 2, 126, 33));
		var playAgain = new cc.MenuItemSprite(playAgainNormal, playAgainSelected, playAgainDisabled, function(){
			this.touchEvent();
		}.bind(this) );

		var menu = new cc.Menu(playAgain);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2;
	},

	test: function() {
		cc.log("test GameOver");
		return true;
	},

	touchEvent: function(touch, event) {
		this.parent.removeChild(this);		
		cc.director.runScene(new HelloWorldScene());
	}

});