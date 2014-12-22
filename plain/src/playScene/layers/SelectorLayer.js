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

		this.SelectorLabel = new cc.LabelTTF();
		this.SelectorLabel.setFontName(res.LINEBold_ttf);
		this.SelectorLabel.setFontSize(50);
		this.SelectorLabel.setColor( cc.color(20, 20, 20));
		this.SelectorLabel.setString("Character Selector");

		// position the label on the center of the screen
		this.SelectorLabel.x = winsize.width / 2;
		this.SelectorLabel.y = winsize.height / 2 + 250;
		// add the label as a child to this layer
		this.addChild(this.SelectorLabel);
		
		var friendInfo = SAVE.FRIENDS["BROWN"];
		char1 = new Friend(friendInfo.type);
		char2 = new Friend(friendInfo.type);
		char3 = new Friend(friendInfo.type);
		char1.setPositionByRowCol(4, 3);
		char2.setPositionByRowCol(4, 4);
		char3.setPositionByRowCol(4, 5);
		this.addChild(char1);
		this.addChild(char2);
		this.addChild(char3);

		var playNextNormal = new cc.Sprite(res.nextNormal_png);
		var playNextSelected = new cc.Sprite(res.nextSelected_png);
		var playNextDisabled = new cc.Sprite(res.nextNormal_png);
		var playNext = new cc.MenuItemSprite(playNextNormal, playNextSelected, playNextDisabled,
				function(){this.touchEvent();}.bind(this) );

		var menu = new cc.Menu(playNext);
		this.addChild(menu, 1, 2);
		menu.x = winsize.width / 2;
		menu.y = winsize.height / 2 - 250;
		
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