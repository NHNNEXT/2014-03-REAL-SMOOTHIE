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
		
		this.labelBG = new cc.LayerColor(cc.color(255, 255, 255), 100, 50);
		var labelSize = this.labelBG.getContentSize();
//		this.labelBG.setAnchorPoint(0, 0);
//		this.labelBG.anchorX = labelSize.width / 2;
//		this.labelBG.anchorY = labelSize.height / 2 ;
		this.labelBG.x = size.width / 2 - labelSize.width / 2;
		this.labelBG.y = size.height / 2 + 450 - labelSize.height / 2;
		
		if(SMTH.STATUS.CURRENT_LEVEL.ID === 0 ) {
			this.stageLabel = new cc.LabelTTF("PRESET 3X4 STAGE", "Arial", 38);
		} else if(SMTH.STATUS.CURRENT_LEVEL.ID === 1) {
			this.stageLabel = new cc.LabelTTF("RANDOM 4X4 STAGE", "Arial", 38);
		}
		this.stageLabel.setColor(cc.color(0, 0, 0));
		this.stageLabel.x = size.width / 2;
		this.stageLabel.y = size.height / 2 + 500;
		
		this.turnLabel = new cc.LabelTTF(SMTH.CONTAINER.TURN + " / " + SMTH.STATUS.CURRENT_LEVEL.MAXTURN, "Arial", 38);
		this.turnLabel
		// position the label on the center of the screen
		this.turnLabel.setColor(cc.color(0, 0, 0));
//		var labelSize = this.turnLabel.getContentSize();
//		this.turnLabel.anchorX = labelSize.width / 2;
//		this.turnLabel.anchorY = labelSize.height / 2 ;
		
		this.turnLabel.x = size.width / 2;
		this.turnLabel.y = size.height / 2 + 450;
		
		this.addChild(this.labelBG);
		this.addChild(this.turnLabel);
		this.addChild(this.stageLabel);
		
		this.scheduleUpdate();
	}, 
	update: function() {
		if(SMTH.CONTAINER.TURN <= SMTH.STATUS.CURRENT_LEVEL.MAXTURN){
			this.turnLabel.setString(SMTH.CONTAINER.TURN + "/" + SMTH.STATUS.CURRENT_LEVEL.MAXTURN);
		}
	}
});