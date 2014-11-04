var StatusLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		var size = cc.director.getWinSize();

		var closeItem = new cc.MenuItemImage(
				res.CloseNormal_png,
				res.CloseSelected_png,
				function () {
					cc.log("Menu is clicked!");
					cc.director.runScene(new HelloWorldScene());
				}, this);
		closeItem.attr({
			x: size.width - 20,
			y: 20,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(closeItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);
		
		this.clearLabel = new cc.LabelTTF(SMTH.CONTAINER.TURN + "/" + SMTH.STATUS.CURRENT_LEVEL.MAXTURN, "Arial", 38);
		// position the label on the center of the screen
		this.clearLabel.setColor(cc.color(0, 0, 0));
		this.clearLabel.x = size.width / 2 - 25;
		this.clearLabel.y = size.height / 2 + 500;
		// add the label as a child to this layer
		this.clearLabel.anchorX = 0;
		this.clearLabel.anchorY = 0;
		this.addChild(this.clearLabel);
		this.scheduleUpdate();
	}, 
	update: function() {
		this.clearLabel.setString(SMTH.CONTAINER.TURN + "/" + SMTH.STATUS.CURRENT_LEVEL.MAXTURN);
	}
});