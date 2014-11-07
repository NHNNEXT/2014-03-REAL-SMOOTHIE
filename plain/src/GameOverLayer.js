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

		
		this.gameoverImage = new cc.Sprite(res.sadSally_png);
		this.addChild(this.gameoverImage);
		this.gameoverImage.x = winsize.width/ 4.6;	
		this.gameoverImage.y = winsize.height / 2 + 205;
		
		this.overLabel = new cc.LabelTTF();
		this.overLabel.setString("GAME OVER");
		//this.overLabel.setFontName("LINE Bold");
		this.overLabel.setFontName("res/fonts/LINEBold.ttf");
        this.overLabel.setFontSize(80);
		this.overLabel.setColor( cc.color(230, 234, 210));
		
		// position the label on the center of the screen
		this.overLabel.setColor(cc.color(255, 255, 255));
		this.overLabel.x = winsize.width / 2;
		this.overLabel.y = winsize.height / 2 + 140;
		// add the label as a child to this layer
		this.addChild(this.overLabel);
		
		var playAgainNormal = new cc.Sprite(res.replayNormal_png);
		var playAgainSelected = new cc.Sprite(res.replaySelected_png);
		var playAgainDisabled = new cc.Sprite(res.replayNormal_png);
		var playAgain = new cc.MenuItemSprite(playAgainNormal, playAgainSelected, playAgainDisabled, function(){
			this.touchEvent();
		}.bind(this) );

		var menu = new cc.Menu(playAgain);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2;
        
        cc.audioEngine.playEffect(res.gameover_mp3);

	},

	test: function() {
		cc.log("test GameOver");
		return true;
	},

	touchEvent: function(touch, event) {
		cc.audioEngine.playEffect(res.button_mp3);
        this.parent.removeChild(this);
		cc.director.runScene(new HelloWorldScene());
	}

});