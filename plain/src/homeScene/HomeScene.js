var HomeScene = cc.Scene.extend({
	onEnter: function() {
		this._super();

		this.title;
		this.playMenu;
		this.facebookMenu;

		this._connectToggleHandlerCache = this._connectToggleHandler.bind(this);

		this.initSMTH();
					
		// 로컬 스토리지의 게임 세이브 데이터를 SAVE 글로벌 객체로 리스토어
		var savedGame = SMTH.DATA.load("savedGame") || "";
		if( savedGame.length == 0) {
			// 설치 후 첫 실행이므로 SAVE 전역 변수의 값을 로컬스토리지에 저장 
			cc.log("설치 후 첫 실행");
			SMTH.DATA.save("savedGame", JSON.stringify(SAVE));
		} else {
			cc.log("재실행 웰컴백!");
			if(savedGame.length > 0)
				SAVE = JSON.parse(savedGame);
		}

		// 만약에 로그인 된 상태라면 서버에 요청해서 savedGame 정보를 저장한다.
		if(SMTH.DATA.isLoggedIn()) {
			cc.log("ID: "+SMTH.DATA.load("id"));
			SMTH.DATA.fetchUserData({
				id: SMTH.DATA.load("id")
			});
		}		
							
		this._setBG();
		this._setPlayButton();	
		this._setInitialFacebookButton();	
        
        this._setTitle();
		
		this._startIntroAnimation();
		
		SMTH.EVENT_MANAGER.listen("fbLoggedIn", this._connectToggleHandlerCache);
		SMTH.EVENT_MANAGER.listen("fbLoggedOut", this._connectToggleHandlerCache);
	},
	_setInitialFacebookButton: function() {
		//로컬스토리지에 해당키에 값이 지는지 없는지 확인
		if(SMTH.DATA.isLoggedIn()) {
			var facebookBtn = this._createLogoutButton.apply(this);			
		} else {
			var facebookBtn = this._createConnectButton.apply(this);
		}
		
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		
		this.facebookMenu = new cc.Menu(facebookBtn);
		this.facebookMenu.setOpacity(0);
		this.addChild(this.facebookMenu, 1, 2);
		this.facebookMenu.x = winsize.width / 2;
		this.facebookMenu.y = winsize.height / 2 - 1200;		
	},
	_createLogoutButton: function() {
		var logoutNormal = new cc.Sprite(res.fbLogoutNormal_png);
		var logoutSelected = new cc.Sprite(res.fbLogoutSelected_png);
		var logoutDisabled = new cc.Sprite(res.fbLogoutNormal_png);		

		var logoutBtn = new cc.MenuItemSprite(logoutNormal, logoutSelected, logoutDisabled, function(){
			SMTH.FB.logout(function() {
				SMTH.DATA.removeUserInfo();
				cc.log("---- fbLoggedOut 이벤트 dispatched!");
				SMTH.EVENT_MANAGER.notice("fbLoggedOut");
			});			
		}.bind(this));
		return logoutBtn;
	},
	_createConnectButton: function() {
		var connectNormal = new cc.Sprite(res.fbConnectNormal_png);
		var connectSelected = new cc.Sprite(res.fbConnectSelected_png);
		var connectDisabled = new cc.Sprite(res.fbConnectNormal_png);
	
		var connectBtn = new cc.MenuItemSprite(connectNormal, connectSelected, connectDisabled, function(){
			SMTH.FB.login(function(facebookInfo) {					
				SMTH.DATA.updateUserInfo(facebookInfo);
				SMTH.DATA.fetchUserData({
					id: facebookInfo.id,
					callback: function() {
						cc.log("---- fbLoggedIn 이벤트 dispatched!");
						SMTH.EVENT_MANAGER.notice("fbLoggedIn");
					}
				});
			});											
		}.bind(this));
		return connectBtn;
	},
	_connectToggleHandler: function() { // 페이스북에 로그인 했다는 이벤트가 발생했을 때 할 일 // 페이스북  connect 버튼을 logout 버튼으로 바꾼다.
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var facebookBtn = null;
        this.removeChild(this.facebookMenu);

        if(SMTH.DATA.isLoggedIn())
	        facebookBtn = this._createLogoutButton.apply(this);
        else 
	        facebookBtn = this._createConnectButton.apply(this);

		this.facebookMenu = new cc.Menu(facebookBtn);
		this.addChild(this.facebookMenu, 1, 2);
		this.facebookMenu.x = centerPos.x;
		this.facebookMenu.y = centerPos.y - 200;			
	},
	initSMTH: function() {
        if (SMTH.EVENT_MANAGER != null) {
        	SMTH.EVENT_MANAGER.fire();
        }
        SMTH.EVENT_MANAGER = new EventManager();
	},
	startGame: function() {},
	_setBG: function() {
		this.addChild(new BackgroundLayer());
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var spriteBG = new cc.Sprite(res.BG_jpg);
		spriteBG.setPosition(centerPos);
		this.addChild(spriteBG);
		
		/* 움직이는 블러된 과일들 */
		var fruitBlur = new cc.Sprite(res.fruits_blur_png);
		fruitBlur.setPosition(0,0);
		this.addChild(fruitBlur);
		fruitBlur.setScale(2.3);
		
		fruitBlur.runAction(		
			cc.repeatForever(
				cc.sequence(
					cc.moveTo(40, winsize.width, winsize.height),
					cc.moveTo(40, 0, 0)
				)
			)
		);
	},
	_setTitle: function() {
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		this.title = new cc.Sprite(res.home_title_png);
		this.title.setPosition(centerPos.x, winsize.height + 100);
		this.title.setOpacity(0);
		this.addChild(this.title);
	},
	_startIntroAnimation: function() {
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
				
		this.title.runAction(
			cc.sequence(
				cc.spawn(
					cc.moveTo(0.6, centerPos.x, centerPos.y).easing(cc.easeInOut(5.0)), 
					cc.fadeIn(0.6)
				), 
				cc.spawn(
					cc.moveTo(0.6, centerPos.x, winsize.height - 300).easing(cc.easeInOut(5.0)),
					cc.callFunc(function() {					
						this.playMenu.runAction(
							cc.spawn(
								cc.moveTo(0.6, centerPos.x, centerPos.y - 50).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(0.6)
							)
						)
						this.facebookMenu.runAction(
							cc.spawn(
								cc.moveTo(0.6, centerPos.x, centerPos.y - 200).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(0.6)
							)
						)						
					}.bind(this))
				)

			)
		);		
	},
	_setPlayButton: function() {
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		var playNormal = new cc.Sprite(res.playNormal_png);
		var playSelected = new cc.Sprite(res.playSelected_png);
		var playDisabled = new cc.Sprite(res.playNormal_png);
		var play = new cc.MenuItemSprite(playNormal, playSelected, playDisabled, function() {
			if(SMTH.DATA.isLoggedIn()) {
				var pic_url = SMTH.CONTAINER.LOCALSTORAGE.getItem("picture");
				res.userPic = pic_url;
				cc.LoaderScene.preload([pic_url], function () {
				    cc.director.runScene(new MapScene());
				}, this);				
			} else {
				cc.director.runScene(new MapScene());
			}
		}.bind(this));
		
		this.playMenu = new cc.Menu(play);
		this.playMenu.setOpacity(0);
		this.addChild(this.playMenu, 1, 2);
		this.playMenu.x = winsize.width / 2;
		this.playMenu.y = winsize.height / 2 - 700;			
	},
	_setFacebookButton: function() {
		
	}
});



