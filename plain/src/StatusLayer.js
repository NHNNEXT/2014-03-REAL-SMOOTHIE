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

		this.stageLabel = new cc.LabelTTF();
		this.stageLabel.setFontName("LINEBold");
		this.stageLabel.setFontSize(50);
		this.stageLabel.setColor( cc.color(190, 219, 57));

		if(SMTH.STATUS.CURRENT_LEVEL.ID === 0 ) {			
			this.stageLabel.setString("PRESET 3X4 STAGE");
		} else if(SMTH.STATUS.CURRENT_LEVEL.ID === 1) {
			this.stageLabel.setString("RANDOM 4X4 STAGE");
		}
		this.stageLabel.x = size.width / 2;
		this.stageLabel.y = size.height / 2 + 500;
		
		this.turnLabel = new cc.LabelTTF();
		this.turnLabel.setString(SMTH.CONTAINER.TURN + " / " + SMTH.STATUS.CURRENT_LEVEL.MAXTURN);
		this.turnLabel.setFontSize(38);
		this.turnLabel.setFontName("LINEBold");
		this.turnLabel.setColor(cc.color(255, 255, 255));
		
		this.turnLabel.x = size.width / 2;
		this.turnLabel.y = size.height / 2 + 450;
		
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