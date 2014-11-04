var GameOverLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(0, 0, 0, 30));
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
		var button = new ccui.Button();
		button.setTouchEnabled(true);
		button.loadTextures(res.button_n, res.button_p, "");
		button.x = winsize.width / 2; 
		button.y = winsize.height / 2;
		button.addTouchEventListener(this.touchEvent, this);
		this.addChild(button);
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