var TutorialLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.guideFinger = new cc.Sprite(res.finger_png);
		this.pressFinger = new cc.Sprite(res.fingerPress_png);
	},
	init: function() {
		this.setPosition(SMTH.CONTAINER.BOARD.getPosition());
		
		this.fingerToShow = 0;
		this.guideFinger.setAnchorPoint(0.4, 0.8);
		this.guideFinger.setScale(0.5);
		this.pressFinger.setAnchorPoint(0.4, 0.8);
		this.pressFinger.setScale(0.5);
		this.guideFinger.setOpacity(255);
		this.pressFinger.setOpacity(0);
		this.addChild(this.guideFinger);
		this.addChild(this.pressFinger);
		
		var touchAndRemove = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				this.parent.removeChild(this);
				return true;
			}.bind(this)
		});
		cc.eventManager.addListener(touchAndRemove.clone(), this);
	},
	setDescription: function(desc) {
		var description = new cc.LabelTTF("", res.LINEBold_ttf, 35);
		description.setColor( cc.color(190, 219, 57));
		description.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		description.setString(desc);
		description.x = SMTH.STATUS.CURRENT_LEVEL.col / 2 * BLOCK.SIZE.WIDTH;
		description.y = -100;
		this.addChild(description);
	},
	run: function() {
		// Animations are implemented here
	},
	toggle: function() {
		if (this.fingerToShow == 0) {
			this.guideFinger.setOpacity(0);
			this.pressFinger.setOpacity(255);
			this.fingerToShow = 1;
		} else {
			this.guideFinger.setOpacity(255);
			this.pressFinger.setOpacity(0);
			this.fingerToShow = 0;
		}
	},
	getPositionOf: function(row, col) {
		var columns = SMTH.STATUS.CURRENT_LEVEL.col;
		var block = SMTH.CONTAINER.PIPES[row*columns + col];
		return block.getPosition();
	}
});