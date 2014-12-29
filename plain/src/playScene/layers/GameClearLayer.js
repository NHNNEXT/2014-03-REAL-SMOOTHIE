var GameClearLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(255, 255, 255, 220));
		this.init();
	},

	init: function() {
//		this.sendResult();
		
		var winsize = cc.director.getWinSize();
		this.setContentSize(winsize);
		var GameClearTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.test
		});
		cc.eventManager.addListener(GameClearTouchListener.clone(), this);
		
        this.gameclearImage = new cc.Sprite(res.happySally_png);
        this.addChild(this.gameclearImage);
        this.gameclearImage.x = winsize.width/ 2 ;
        this.gameclearImage.y = winsize.height / 2 +260;
                                          
		this.clearLabel = new cc.LabelTTF();
        this.clearLabel.setFontName(res.LINEBold_ttf);
        this.clearLabel.setFontSize(50);
        this.clearLabel.setColor( cc.color(20, 20, 20));
        this.clearLabel.setString("GAME CLEAR!");
                                          
        // position the label on the center of the screen
		this.clearLabel.x = winsize.width / 2;
		this.clearLabel.y = winsize.height / 2 + 110;
		// add the label as a child to this layer
		this.addChild(this.clearLabel);
        
		cc.audioEngine.setMusicVolume(0.4);
        cc.audioEngine.playEffect(res.gameclear_mp3);
		
        var playNextNormal = new cc.Sprite(res.nextNormal_png);
        var playNextSelected = new cc.Sprite(res.nextSelected_png);
        var playNextDisabled = new cc.Sprite(res.nextNormal_png);
		var playNext = new cc.MenuItemSprite(playNextNormal, playNextSelected, playNextDisabled,
				function(){this.touchEvent();}.bind(this) );
		
		var menu = new cc.Menu(playNext);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2;
		
		
		if(SAVE.LAST_CLEAR <= SMTH.STATUS.CURRENT_LEVEL.ID + 1) {
			SAVE.LAST_CLEAR = SMTH.STATUS.CURRENT_LEVEL.ID + 1;
		}
        SMTH.DATA.updateSavedGame();                      
	},

	test: function() {
		cc.log("test GameClear");
		return true;
	},
	
	touchEvent: function(touch, event) {
        cc.audioEngine.playEffect(res.button_mp3);
		this.parent.removeChild(this);
		cc.audioEngine.stopAllEffects();
		cc.director.runScene(new PlayScene());
	},
	
	sendResult : function() {
		Ajax.getInstance().POST({
			url: "http://10.73.45.135:8080/api/saveresult",
			data: "moves=" + SMTH.CONTAINER.TURN,
			callback: function(response) {
				cc.log(response);
			}
		});
	}
	
});