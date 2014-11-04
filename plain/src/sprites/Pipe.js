
var PIPE_CONTAINER = {}
PIPE_CONTAINER[PIPE_TYPE.RAND.L] = [];
PIPE_CONTAINER[PIPE_TYPE.RAND.I] = [];
PIPE_CONTAINER[PIPE_TYPE.RAND.X] = [];
PIPE_CONTAINER[PIPE_TYPE.RAND.T] = [];

var PIPE = {};
PIPE.RESOURCE_MAPPER = {};
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.L] = res.Pipe_2way_curve;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.I] = res.Pipe_2way_line;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.X] = res.Pipe_4way;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.T] = res.Pipe_3way;

var Pipe = Block.extend({
	ctor:function (initialPipeType) {
		this._super(PIPE.RESOURCE_MAPPER[initialPipeType]);
		this.pipeType = initialPipeType;
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.PIPE;
		this.active = false;
		this.delta = cc.p(0,0);
		var pipeTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: this.pipeTouchHandler.onTouchBegan,
			onTouchMoved: this.pipeTouchHandler.onTouchMoved.bind(this),
			onTouchEnded: this.pipeTouchHandler.onTouchEnded.bind(this),
		});
		SMTH.EVENT_MANAGER.addListener(pipeTouchListener.clone(), this);
		
		this.reset();
	},
	reset: function() {
		this.HP = PIPE_TYPE.HP;
		this.active = true;
		this.visible = true;
		this.opacity = 255;
		this.isRotten = false;
		this.scale = 1;
		this.connectedWith = [];
		this.setColor(cc.color(255,255,255));
	},
	update:function (dt) {
		/*
		if (this.HP <= 0) {
			this.active = false;
			this.destroy();
		}
		*/
	},
	rotateRight: function () {
		this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation + 90), cc.callFunc(function(){
			SMTH.STATUS.PLAY_STATE = SMTH.CONST.PLAY_STATE.IDEAL;
			SMTH.EVENT_MANAGER.dispatchEvent(new cc.EventCustom("rotateEnd"));
		}) ));
		
	},
	rotateLeft: function () {
		this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation - 90), cc.callFunc(function(){
			SMTH.STATUS.PLAY_STATE = SMTH.CONST.PLAY_STATE.IDEAL;
			SMTH.EVENT_MANAGER.dispatchEvent(new cc.EventCustom("rotateEnd"));
		}) ));
	},
	
	isOpened : function(dir) {
		var pipeInfo = PIPE_TYPE.INFO[this.pipeType];
		return pipeInfo[(360+dir-this.rotation) % 360]
	}, 
	
	isPipe : function() {
		return true;
	}
});


Pipe.prototype.pipeTouchHandler = {
	"onTouchBegan": function (touch, event) { 
		var target = event.getCurrentTarget();
		var locationInNode = target.convertToNodeSpace(touch.getLocation());    
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);

		if (cc.rectContainsPoint(rect, locationInNode)) {       
			cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			target.opacity = 180;
			return true;
		}
		return false;
	},
	"onTouchMoved": function (touch, event) {         
		var target = event.getCurrentTarget();
		this.delta = touch.getDelta();
		cc.log(touch.getDelta());
	},
	"onTouchEnded": function (touch, event) {         
		var target = event.getCurrentTarget();
		cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(255);
		if(this.HP <= 0 && this.isRotten === false) {
			return;
		} else if (target.rotation % 90 != 0) {
			return;
		} else {
			SMTH.STATUS.PLAY_STATE = SMTH.CONST.PLAY_STATE.ROTATING;
			SMTH.CONTAINER.TURN++;
			if (this.delta.x >= 0){
				target.rotateRight();
			} else if (this.delta.x < 0)  {
				target.rotateLeft();
			}
		}
		
	}
};

Pipe._create = function(type) {
	var pipe = new Pipe(type);
	PIPE_CONTAINER[type].push(pipe);
	return pipe;
};

Pipe.getOrCreate = function(type) {
	var pipeList = PIPE_CONTAINER[type];
	for (var i = 0; i < pipeList.length; i++) {
		var pipe = pipeList[i];
		if (pipe.active == false) {
			pipe.reset();
			return pipe;
		}
	}
	var pipe = Pipe._create(type);
	return pipe;
}

Pipe.getPipe = function(type) {
	// ALL RANDOM then choose pipe type
	if (type == 0) {
		type = 1000 + Math.floor(Math.random() * 4) * 1000;
	}
	// Random Rotate
	if (type % 1000 == 0) {
		var angle = 90 + Math.floor(Math.random() * 4) * 90;
		type += angle;
	}
	// PIPE
	var shape = type - type % 1000;
	var angle = type % 1000;
	var pipe = Pipe.getOrCreate(shape);
	pipe.rotation = angle;
	
	return pipe;
};