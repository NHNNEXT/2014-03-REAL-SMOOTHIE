
var BackgroundLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},

	init:function () {
		var winsize = cc.director.getWinSize();
		var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
		var spriteBG = new cc.Sprite(res.BG_jpg);
		spriteBG.setPosition(centerPos);
		this.addChild(spriteBG);
	}
});

var onTouchBegan = function (touch, event) { 
	var target = event.getCurrentTarget();  
	var locationInNode = target.convertToNodeSpace(touch.getLocation());    
	var s = target.getContentSize();
	var rect = cc.rect(0, 0, s.width, s.height);

	if (cc.rectContainsPoint(rect, locationInNode)) {       
		cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
		target.opacity = 230;
		return true;
	}
	return false;
}
var onTouchMoved = function (touch, event) {         
	var target = event.getCurrentTarget();
	this.delta = touch.getDelta();
}
var onTouchEnded = function (touch, event) {         
	var target = event.getCurrentTarget();
	cc.log("sprite onTouchesEnded.. ");
	target.setOpacity(180);
	if (this.delta.x >= 0 && target.rotation%90==0) {
		target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation + 90)));
	} else if (this.delta.x < 0 && target.rotation%90==0)  {
		target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation - 90)));
	}
	var animationLayer = target.parent;
	animationLayer.clicked();
}



var AnimationLayer = cc.Layer.extend({
	clickCount: null,
	clicked: null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();
		this.clickCount = 0;
		this.clicked = function() {
			this.clickCount += 1;
			cc.log(this.clickCount);
		};
		var initX = 100;
		var initY = 300;
		var rect1 = new cc.Sprite(res.Rect_png);
		var rectWidth = rect1.width;
		var rectHeight = rect1.height;

		var rect_arr = new Array(16);
		var rextX = initX;
		var rextY = initY

		var pipes = [];
		pipes.push(res.Pipe_2way_line);
		pipes.push(res.Pipe_2way_curve);
		pipes.push(res.Pipe_3way);
		pipes.push(res.Pipe_4way);

		for(var i=0 ; i<16 ; i++) {
			var r = Math.floor(Math.random() * 4);
			rect_arr[i] = new cc.Sprite(pipes[r]);

			if(i%4 == 0 && i != 0) {
				rextY += rectHeight
				rextX = initX;
			}
			rect_arr[i].attr({x: rextX + (i%4)*rectWidth, y: rextY});
			rect_arr[i].opacity = 180;
		}
		
		//Create a "one by one" touch event listener (processes one touch at a time)
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			delta: "",
			swallowTouches: false,
			onTouchBegan: onTouchBegan,
			onTouchMoved: onTouchMoved,
			onTouchEnded: onTouchEnded,
		});
		
		for (var i in rect_arr) {
			cc.eventManager.addListener(listener.clone(), rect_arr[i]);
			this.addChild(rect_arr[i]);
		}
	}
	
});

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
	}
});

var networkLayer = cc.Layer.extend({
	xmlHttp:null,
	theUrl:null,
	ctor:function () {
		this._super();
		this.init();
	},

	init: function () {
		this.theUrl = "localhost:8080";
		this.xmlHttp = new XMLHttpRequest();
		this.xmlHttp.open( "GET", this.theUrl, false );
		this.xmlHttp.send( null );
		cc.log("hihi");
		request.onreadystatechange = function() {
			var result = request.responseText;
			cc.log(result);
		}
	}
});

var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		cc.log("Scene Started!");
		this.addChild(new BackgroundLayer());
		this.addChild(new AnimationLayer());
		this.addChild(new StatusLayer());
		this.addChild(new networkLayer());
	}
});
