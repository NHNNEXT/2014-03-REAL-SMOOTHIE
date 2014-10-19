
var HelloWorldLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size
		var size = cc.director.getWinSize();

		// add a "close" icon to exit the progress. it's an autorelease object
		var closeItem = new cc.MenuItemImage(
				res.CloseNormal_png,
				res.CloseSelected_png,
				function () {
					cc.log("Menu is clicked!");
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

		/////////////////////////////
		// 3. add your codes below...
		// add a label shows "Hello World"
		// create and initialize a label
		var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
		// position the label on the center of the screen
		helloLabel.x = size.width / 2;
		helloLabel.y = 0;
		// add the label as a child to this layer
		this.addChild(helloLabel, 5);

		// add "HelloWorld" splash screen"
		this.sprite = new cc.Sprite(res.HelloWorld_png);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2,
			scale: 0.5,
			rotation: 180
		});
		this.addChild(this.sprite, 0);

		this.sprite.runAction(
				cc.sequence(
						cc.rotateTo(2, 0),
						cc.scaleTo(2, 1, 1)
				)
		);
		helloLabel.runAction(
				cc.spawn(
						cc.moveBy(2.5, cc.p(0, size.height - 40)),
						cc.tintTo(2.5,255,125,0)
				)
		);
		return true;
	}
});

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

//Create a "one by one" touch event listener (processes one touch at a time)
var listener1 = cc.EventListener.create({
	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	delta: "",
	swallowTouches: true,
	onTouchBegan: function (touch, event) { 
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
	},
	onTouchMoved: function (touch, event) {         
		var target = event.getCurrentTarget();
		this.delta = touch.getDelta();
	},
	onTouchEnded: function (touch, event) {         
		var target = event.getCurrentTarget();
		cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(180);
		if (this.delta.x > 0 && target.rotation%90==0) {
			target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation + 90)));
		} else if (this.delta.x < 0 && target.rotation%90==0)  {
			target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation - 90)));
		}
	}
});

var AnimationLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();
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

		for (var i in rect_arr) {
			cc.eventManager.addListener(listener1.clone(), rect_arr[i]);
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
					cc.director.popScene();
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

var HelloWorldScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new HelloWorldLayer();
		//this.addChild(layer);
		this.addChild(new BackgroundLayer());
		this.addChild(new AnimationLayer());
		this.addChild(new StatusLayer());
	}
});

