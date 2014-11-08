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
                    cc.audioEngine.playEffect(res.button_mp3);
					cc.log("Menu is clicked!");
					cc.director.runScene(new HelloWorldScene());
				}, this);
		closeItem.attr({
			x: size.width - 70,
			y: 50,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(closeItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);

		this.stageLabel = new cc.LabelTTF();
        
        this.stageLabel.setFontName(res.LINEBold_ttf);
        this.stageLabel.setFontSize(50);
		this.stageLabel.setColor( cc.color(190, 219, 57));

        var levelDescription = SMTH.STATUS.CURRENT_LEVEL.TYPE + " " + SMTH.STATUS.CURRENT_LEVEL.MAP[0].length + "X" + SMTH.STATUS.CURRENT_LEVEL.MAP.length + " STAGE";
                                  
        this.stageLabel.setString(levelDescription);
                                  
		this.stageLabel.x = size.width / 2;
		this.stageLabel.y = size.height / 2 + 500;
		
		this.turnLabel = new cc.LabelTTF();
		this.turnLabel.setString(SMTH.CONTAINER.TURN + " / " + SMTH.STATUS.CURRENT_LEVEL.MAXTURN);
		this.turnLabel.setFontSize(38);
        this.turnLabel.setFontName(res.LINEBold_ttf);                         

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