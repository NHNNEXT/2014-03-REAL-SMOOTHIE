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
					cc.director.runScene(new PlayScene());
				}, this);
		closeItem.attr({
			x: size.width - 70,
			y: 50,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var mixer = new cc.MenuItemImage(
				res.mixer_png,
				res.mixer_png,
				function () {
					cc.log("Mix!")
				}, this);
		mixer.attr({
			x: size.width / 2,
			y: 100,
			scale: 0.1,
			anchorX: 0.5,
			anchorY: 0.5
		});
		
		var mixMenu = cc.Menu(mixer);
		mixMenu.x = 0;
		mixMenu.y = 0;
		this.addChild(mixMenu, 2);
		
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
		this.turnLabel.setString("Remaining " + (SMTH.STATUS.CURRENT_LEVEL.MAXTURN - SMTH.CONTAINER.TURN));
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
		this.turnLabel.setString("Remaining " + (SMTH.STATUS.CURRENT_LEVEL.MAXTURN - SMTH.CONTAINER.TURN));		
		}
	}
});