var SelectorLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(255, 0, 0, 220));
		this.init();
	},

	init: function() {
		// 캐릭터 선택창 설정
		var winsize = cc.director.getWinSize();
		this.setContentSize(winsize);
		var GameClearTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.test
		});
		cc.eventManager.addListener(GameClearTouchListener.clone(), this);

		this.clearLabel = new cc.LabelTTF();
		this.clearLabel.setFontName(res.LINEBold_ttf);
		this.clearLabel.setFontSize(50);
		this.clearLabel.setColor( cc.color(20, 20, 20));
		this.clearLabel.setString("Character Selector");

		// position the label on the center of the screen
		this.clearLabel.x = winsize.width / 2;
		this.clearLabel.y = winsize.height / 2 + 110;
		// add the label as a child to this layer
		this.addChild(this.clearLabel);

		var playNextNormal = new cc.Sprite(res.nextNormal_png);
		var playNextSelected = new cc.Sprite(res.nextSelected_png);
		var playNextDisabled = new cc.Sprite(res.nextNormal_png);
		var playNext = new cc.MenuItemSprite(playNextNormal, playNextSelected, playNextDisabled,
				function(){this.touchEvent();}.bind(this) );

		var menu = new cc.Menu(playNext);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2;
		
	},
	
	test: function() {
		cc.log("test Character Selector");
		return true;
	},

	touchEvent: function(touch, event) {
		//선택에 따른 이벤트 발생 게임시작
		cc.audioEngine.playEffect(res.button_mp3);
		this.parent.removeChild(this);
//		cc.director.runScene(new PlayScene());
	}
});