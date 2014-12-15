var HomeScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		//        this.initSMTH();
		this.addChild(new BackgroundLayer());
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var spriteBG = new cc.Sprite(res.BG_jpg);
		spriteBG.setPosition(centerPos);
		this.addChild(spriteBG);
		
		var fruitBlur = new cc.Sprite(res.fruits_blur_png);
		fruitBlur.setPosition(0,0);
		this.addChild(fruitBlur);
		fruitBlur.setScale(2.3);
		
		/*
		fruitBlur.runAction(		
			cc.RepeatForever(
				cc.sequence(
					cc.moveTo(40, winsize.width, winsize.height),
					cc.moveTo(40, 0, 0)
				)
			)
		);
*/
		
		var title = new cc.Sprite(res.home_title_png);
		title.setPosition(centerPos.x, winsize.height + 100);
		title.setOpacity(0);
		this.addChild(title);
		/*
		fbConnectNormal_png: "res/fb_connect.png",
		fbConnectSelected_png: "res/fb_connect.png",
		fbLogoutNormal_png: "res/fb_logout.png",
		fbLogoutSelected_png: "res/fb_logout.png",
		playNormal_png: "res/play_btn.png",
		playSelected_png: "res/play_btn.png",
		*/
		
		var playNormal = new cc.Sprite(res.playNormal_png);
		var playSelected = new cc.Sprite(res.playSelected_png);
		var playDisabled = new cc.Sprite(res.playNormal_png);
		var play = new cc.MenuItemSprite(playNormal, playSelected, playDisabled, function() {
			//this.touchEvent();
		}.bind(this));
		var playMenu = new cc.Menu(play);
		playMenu.setOpacity(0);
		this.addChild(playMenu, 1, 2);
		playMenu.x = winsize.width / 2;
		playMenu.y = winsize.height / 2 - 700;		

	
	/*
		cc.loader.loadJs("", [
		    "frameworks/cocos2d-html5/external/pluginx/Plugin.js",
		    "frameworks/cocos2d-html5/external/pluginx/platform/facebook_sdk.js",
		    "frameworks/cocos2d-html5/external/pluginx/platform/facebook.js"
		], function(){
			SMTH.EVENT_MANAGER.notice("facebookSDKLoaded");		
		});
*/
/*
		SMTH.EVENT_MANAGER.listen("facebookSDKLoaded", function(e) {			
		});
*/
		facebook = plugin.FacebookAgent.getInstance();
			
		var connectNormal = new cc.Sprite(res.fbConnectNormal_png);
		var connectSelected = new cc.Sprite(res.fbConnectSelected_png);
		var connectDisabled = new cc.Sprite(res.fbConnectNormal_png);
		
		var fb_connect_handler = null;
		
		var connect = new cc.MenuItemSprite(connectNormal, connectSelected, connectDisabled, function(){
			facebook.isLoggedIn(function(code, response){
			    if(code == plugin.FacebookAgent.CODE_SUCCEED){
			        cc.log("isLoggedIn : " + response["isLoggedIn"])
			    } else {
			        cc.log("Check failed, error #" + code + ": " + response);
			    }
			});
		});
		


		
		
		var connectMenu = new cc.Menu(connect);
		connectMenu.setOpacity(0);
		this.addChild(connectMenu, 1, 2);
		connectMenu.x = winsize.width / 2;
		connectMenu.y = winsize.height / 2 - 1200;	
		/*
;*/		
		
		title.runAction(
			cc.sequence(
				cc.spawn(
					cc.moveTo(2.5, centerPos.x, centerPos.y).easing(cc.easeInOut(5.0)), 
					cc.fadeIn(2.5)
				), 
				cc.spawn(
					cc.moveTo(2.3, centerPos.x, winsize.height - 300).easing(cc.easeInOut(5.0)),
					cc.callFunc(function() {					
						playMenu.runAction(
							cc.spawn(
								cc.moveTo(2.3, centerPos.x, centerPos.y).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(2.5)
							)
						)
						connectMenu.runAction(
							cc.spawn(
								cc.moveTo(2.3, centerPos.x, centerPos.y - 200).easing(cc.easeInOut(5.0)), 
								cc.fadeIn(2.5)
							)
						)
						cc.log("!!!");
						
					}.bind(this))
				)

			)
		);

/*
                                 var fruitsBlur = new cc.Sprite(res.fruits_blur_png);
                                 CCFadeTo *fadeIn = [CCFadeTo actionWithDuration:0.5 opacity:127];
                                 CCSequence *pulseSequence = [CCSequence actionOne:fadeIn two:fadeOut];
                                 */
		//        this.addChild(new GameLayer());
		//		Ajax.getInstance().POST({
		//			url: "http://httpbin.org/post",
		//			data: "name=sally",
		//			callback: function(response) {
		//				cc.log(response);
		//			}
		//		});
		//		Ajax.getInstance().POST({
		//			url: "http://httpbin.org/post",
		//			data: "name=sally",
		//			callback: function(response) {
		//				cc.log(response);
		//			}
		//		});
	},
	initSMTH: function() {
/*
        var levelArr = [];
        for( var i in SMTH.LEVEL ) {
        levelArr[SMTH.LEVEL[i].ID] = SMTH.LEVEL[i];
        }
        SMTH.STATUS.CURRENT_LEVEL = levelArr[SMTH.START_LEVEL_INDEX];
        SMTH.START_LEVEL_INDEX++;
        SMTH.START_LEVEL_INDEX = SMTH.START_LEVEL_INDEX % levelArr.length;
        
        if (SMTH.EVENT_MANAGER != null) {
        SMTH.EVENT_MANAGER.fire();
        }
        SMTH.EVENT_MANAGER = new EventManager();
   */
	},
	startGame: function() {}
});