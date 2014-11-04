var GameClearLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(255, 255, 255, 10));
		this.init();
	},

	init: function() {
		this.sendResult();
		
		var winsize = cc.director.getWinSize();
		this.setContentSize(winsize);
		var GameClearTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.test
		});
		cc.eventManager.addListener(GameClearTouchListener.clone(), this);
		
		this.clearLabel = new cc.LabelTTF(SMTH.CONTAINER.TURN, "Arial", 38);
		// position the label on the center of the screen
		this.clearLabel.setColor(cc.color(0, 0, 0));
		this.clearLabel.x = winsize.width / 2;
		this.clearLabel.y = winsize.height / 2 + 140;
		// add the label as a child to this layer
		this.clearLabel.anchorX = 0;
		this.clearLabel.anchorY = 0;
		this.addChild(this.clearLabel);

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
		cc.log("test clear");
		return true;
	},
	
	touchEvent: function(touch, event) {
		this.parent.removeChild(this);		
		cc.director.runScene(new HelloWorldScene());
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