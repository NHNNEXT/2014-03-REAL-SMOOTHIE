
var HomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
//        this.initSMTH();
        
        this.addChild(new BackgroundLayer());
        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var spriteBG = new cc.Sprite(res.BG_jpg);

        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
/*
                                var fruitsBlur = new cc.Sprite(res.fruits_blur_png);
                                CCFadeTo *fadeIn = [CCFadeTo actionWithDuration:0.5 opacity:127];
 CCSequence *pulseSequence = [CCSequence actionOne:fadeIn two:fadeOut];
  
                                
                                var title = new cc.Sprite(res.home_title_png);
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
                                
    startGame: function() {

    }
});
