
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
		this.HP = PIPE_TYPE.HP;
		this.active = false;
		
		this.connectedWith = [];

		var pipeTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			delta: "",
			swallowTouches: false,
			onTouchBegan: this.pipeTouchHandler.onTouchBegan,
			onTouchMoved: this.pipeTouchHandler.onTouchMoved,
			onTouchEnded: this.pipeTouchHandler.onTouchEnded.bind(this),
		});
		cc.eventManager.addListener(pipeTouchListener.clone(), this);		
	},
	setPosition: function(initialPipeRotation, row, column) {
		this.rotation = initialPipeRotation;
		this.row = row;
		this.column = column;

		var position = this._coordinateToPosition(this.row, this.column);
		this.x = position.x;
		this.y = position.y;
	},
	_coordinateToPosition: function(row, column) {
		return cc.p(column*BLOCK.SIZE.WIDTH + BLOCK.SIZE.WIDTH/2 , row*BLOCK.SIZE.HEIGHT + BLOCK.SIZE.HEIGHT/2);
	},
	update:function (dt) {
		// Keys are only enabled on the browser
		/*
		if (!cc.sys.isNative) {
			if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= winSize.height) {
				this.y += dt * this.speed;
			}
			if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
				this.y -= dt * this.speed;
			}
			if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x >= 0) {
				this.x -= dt * this.speed;
			}
			if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && this.x <= winSize.width) {
				this.x += dt * this.speed;
			}
		}

		if (this.HP <= 0) {
			this.active = false;
			this.destroy();
		}
		this._timeTick += dt;
		if (this._timeTick > 0.1) {
			this._timeTick = 0;
			if (this._hurtColorLife > 0) {
				this._hurtColorLife--;
			}
		}
		*/
	},
	rotateRight: function () {
		this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation + 90), cc.callFunc(function(){
			SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_IDEAL;
		}) ));
		
	},
	rotateLeft: function () {
		this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation - 90), cc.callFunc(function(){
			SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_IDEAL;
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
	},
	"onTouchEnded": function (touch, event) {         
		var target = event.getCurrentTarget();
		cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(255);
		if(this.HP <= 0 && this.isRotten === false) {
			return;
		} else {
			SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_ROTATING;
			if ((this.delta === undefined || this.delta.x >= 0) && target.rotation%90==0) {
				target.rotateRight();
			} else if ((this.delta === undefined || this.delta.x < 0) && target.rotation%90==0)  {
				target.rotateLeft();
			}
		}
		
	}
};

Pipe._create = function(type) {
	var pipe = new Pipe(type);
	pipe.active = true;
	pipe.visible = true;
	pipe.HP = 1;
	pipe.isRotten = false;
	PIPE_CONTAINER[type].push(pipe);
	
	return pipe;
};

Pipe.getOrCreate = function(type) {
	var pipeList = PIPE_CONTAINER[type];
	for (var i = 0; i < pipeList.length; i++) {
		var pipe = pipeList[i];
		if (pipe.active == false) {
			pipe.active = true;
			pipe.visible = true;
			pipe.HP = 1;
			pipe.isRotten = false;
			pipe.scale = 1;
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
	var pipeShape = type - type % 1000;
	var pipe = Pipe.getOrCreate(pipeShape);
	var angle = type % 1000;
	pipe.rotation = angle;
	
	return pipe;
};
//Pipe.isPipe = function(type) {
//	return type < 5000;
//}