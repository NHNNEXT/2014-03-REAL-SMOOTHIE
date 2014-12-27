var HomeScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.initSMTH();

		this.title;
		this.playMenu;
		this.facebookMenu;
			
		this._setBG();
		
		
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

		// get Global facebook instance
		facebook = plugin.FacebookAgent.getInstance();
		
		//로컬스토리지를 SMTH.CONTAINER.LOCALSTORAGE 전역으로 설정한다.
		SMTH.CONTAINER.LOCALSTORAGE = cc.sys.localStorage;
		
		if(facebook._isLoggedIn === false && SMTH.CONTAINER.LOCALSTORAGE) {
			SMTH.CONTAINER.LOCALSTORAGE.removeItem("facebookInfo");
		}
		
		this._setPlayButton();	

		//로컬스토리지에 해당키에 값이 지는지 없는지 확인
		if(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")) {
			var facebookBtn = createLogout.apply(this);			
		} else {
			var facebookBtn = createConnect.apply(this);
		}
		
		function createConnect() {
			var connectNormal = new cc.Sprite(res.fbConnectNormal_png);
			var connectSelected = new cc.Sprite(res.fbConnectSelected_png);
			var connectDisabled = new cc.Sprite(res.fbConnectNormal_png);
		
			var connectBtn = new cc.MenuItemSprite(connectNormal, connectSelected, connectDisabled, function(){
				facebook.login([], function(code, response){
				    if(code == plugin.FacebookAgent.CODE_SUCCEED){
						facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
						    if (type == plugin.FacebookAgent.CODE_SUCCEED) {
						        cc.log(response);
						        var facebookInfo = SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo") || "{}";
								facebookInfo = JSON.parse(facebookInfo);
								facebookInfo.name = response.name;
								facebookInfo.id = response.id;
								SMTH.CONTAINER.LOCALSTORAGE.setItem("facebookInfo", JSON.stringify(facebookInfo));
								
								cc.log(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo"));
								if(Object.keys(facebookInfo).length >= 3) {
									SMTH.EVENT_MANAGER.notice("fbLoggedIn");
								}
						    } else {
						        cc.log("Graph API request failed, error #" + code + ": " + response);
						    }
						});
						facebook.api("/me/picture", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
						    if (type == plugin.FacebookAgent.CODE_SUCCEED) {
						        var facebookInfo = SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo") || "{}";
								facebookInfo = JSON.parse(facebookInfo);
								facebookInfo.picture = response.data.url;
								SMTH.CONTAINER.LOCALSTORAGE.setItem("facebookInfo", JSON.stringify(facebookInfo));
								cc.log(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo"));
								if(Object.keys(facebookInfo).length >= 3) {
									SMTH.EVENT_MANAGER.notice("fbLoggedIn");
								}
						    } else {
						        cc.log("Graph API request failed, error #" + code + ": " + response);
						    }
						});
						
				        cc.log("login succeeded");
				        cc.log("AccessToken: " + response["accessToken"]);
				        var permissions = response["permissions"];
				        var str = "Permissions: ";
				        for (var i = 0; i < permissions.length; ++i) {
				            str += permissions[i] + " ";
				        }
				        cc.log("Permissions: " + str);
				        this.removeChild(facebookMenu);
				        
						facebookBtn = createLogout.apply(this);
						facebookMenu = new cc.Menu(facebookBtn);
						this.addChild(facebookMenu, 1, 2);
						facebookMenu.x = centerPos.x;
						facebookMenu.y = centerPos.y - 200;	
						        
				    } else {
				        cc.log("Login failed, error #" + code + ": " + response);
				    }
				}.bind(this));										
			}.bind(this));
			return connectBtn;
		}

		function createLogout() {
			var logoutNormal = new cc.Sprite(res.fbLogoutNormal_png);
			var logoutSelected = new cc.Sprite(res.fbLogoutSelected_png);
			var logoutDisabled = new cc.Sprite(res.fbLogoutNormal_png);		

			var logoutBtn = new cc.MenuItemSprite(logoutNormal, logoutSelected, logoutDisabled, function(){
				facebook.logout(function(code){
				    if(code == plugin.FacebookAgent.CODE_SUCCEED){ //logout succeed
				        cc.log("logout succeed");
				        SMTH.CONTAINER.LOCALSTORAGE.removeItem("facebookInfo");

				        this.removeChild(facebookMenu);
				        
						facebookBtn = createConnect.apply(this);
						facebookMenu = new cc.Menu(facebookBtn);
						this.addChild(facebookMenu, 1, 2);
						facebookMenu.x = centerPos.x;
						facebookMenu.y = centerPos.y - 200;					
						SMTH.EVENT_MANAGER.notice("fbLoggedOut");

				    } else {
				        cc.log("Logout failed, error #" + code + ": " + response);
				    }
				}.bind(this));										
			}.bind(this));
			return logoutBtn;			
		}			
		
		this.facebookMenu = new cc.Menu(facebookBtn);
		this.facebookMenu.setOpacity(0);
		this.addChild(this.facebookMenu, 1, 2);
		this.facebookMenu.x = winsize.width / 2;
		this.facebookMenu.y = winsize.height / 2 - 1200;
        
        this._setTitle();
		

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
		
		this.title.runAction(
			cc.sequence(
				cc.spawn(
					cc.moveTo(2.5, centerPos.x, centerPos.y).easing(cc.easeInOut(5.0)), 
					cc.fadeIn(2.5)
				), 
				cc.spawn(
					cc.moveTo(2.3, centerPos.x, winsize.height - 300).easing(cc.easeInOut(5.0)),
					cc.callFunc(function() {					
						this.playMenu.runAction(
							cc.spawn(
								cc.moveTo(2.3, centerPos.x, centerPos.y - 50).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(2.5)
							)
						)
						this.facebookMenu.runAction(
							cc.spawn(
								cc.moveTo(2.3, centerPos.x, centerPos.y - 200).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(2.5)
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
			if(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")) {
				var pic_url = JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).picture;
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



