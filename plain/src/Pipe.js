var PIPE = {
	"TYPE": {
		L_TYPE: 0, 
		I_TYPE: 1,
		X_TYPE: 2,
		T_TYPE: 3
	},
	"ROTATION": {
		UP: 0,
		RIGHT: 90,
		DOWN: 180,
		LEFT: 270		
	},
	"DIRECTION": {
		UP: 0,
		RIGHT: 90,
		DOWN: 180,
		LEFT: 270		
	},
	"RESOURCE_MAPPER": {},
	"SIZE": {
		WIDTH: 140,
		HEIGHT: 140
	}
};

var PIPE_TYPE = {};
PIPE_TYPE[PIPE.TYPE.L_TYPE] = {0:true, 90:true, 180:false, 270:false};
PIPE_TYPE[PIPE.TYPE.I_TYPE] = {0:true, 90:false, 180:true, 270:false};
PIPE_TYPE[PIPE.TYPE.T_TYPE] = {0:false, 90:true, 180:true, 270:true};
PIPE_TYPE[PIPE.TYPE.X_TYPE] = {0:true, 90:true, 180:true, 270:true};

var PIPE_CONTAINER = {}
PIPE_CONTAINER[PIPE.TYPE.L_TYPE] = [];
PIPE_CONTAINER[PIPE.TYPE.I_TYPE] = [];
PIPE_CONTAINER[PIPE.TYPE.X_TYPE] = [];
PIPE_CONTAINER[PIPE.TYPE.T_TYPE] = [];

PIPE.RESOURCE_MAPPER[PIPE.TYPE.L_TYPE] = res.Pipe_2way_curve;
PIPE.RESOURCE_MAPPER[PIPE.TYPE.I_TYPE] = res.Pipe_2way_line;
PIPE.RESOURCE_MAPPER[PIPE.TYPE.X_TYPE] = res.Pipe_4way;
PIPE.RESOURCE_MAPPER[PIPE.TYPE.T_TYPE] = res.Pipe_3way;

var Pipe = cc.Sprite.extend({
	type: null, // 파이프 종
	rotation: null, // 회전된 방향(각도?)
	directions: null, // [4] 으로 초기화. 파이프가 열려있는 방
	row: null,
	column: null,
	active: null,
	connectedWith: null,
	visitFlag: false,
	ctor:function (initialPipeType) {
		this._super(PIPE.RESOURCE_MAPPER[initialPipeType]);
		this.type = initialPipeType;
		this.init();
	},
	init: function() {
		this.active = false;
		
		this.connectedWith = [];

		var pipeTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			delta: "",
			swallowTouches: false,
			onTouchBegan: this.pipeTouchHandler.onTouchBegan,
			onTouchMoved: this.pipeTouchHandler.onTouchMoved,
			onTouchEnded: this.pipeTouchHandler.onTouchEnded,
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
		return cc.p(column*PIPE.SIZE.WIDTH + PIPE.SIZE.WIDTH/2 , row*PIPE.SIZE.HEIGHT + PIPE.SIZE.HEIGHT/2);
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
	destroy:function () {
		/*
		MW.LIFE--;

		var explosion = Explosion.getOrCreateExplosion();
		explosion.x = this.x;
		explosion.y = this.y;

		if (MW.SOUND) {
			cc.audioEngine.playEffect(res.shipDestroyEffect_mp3);
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
		var pipetype = PIPE_TYPE[this.type];
		return pipetype[(360+dir-this.rotation) % 360]
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
		SMTH.CONTAINER.PLAY_STATE = SMTH.PLAY_STATE.PLAY_STATE_ROTATING;
		if ((this.delta === undefined || this.delta.x >= 0) && target.rotation%90==0) {
			target.rotateRight();
		} else if ((this.delta === undefined || this.delta.x < 0) && target.rotation%90==0)  {
			target.rotateLeft();
		}
	}
};

Pipe._create = function(type) {
	var pipe = new Pipe(type);
	pipe.active = true;
	PIPE_CONTAINER[type].push(pipe);
	
	return pipe;
};

Pipe.getOrCreate = function(type) {
	var pipeList = PIPE_CONTAINER[type];
	for (var i = 0; i < pipeList.length; i++) {
		var pipe = pipeList[i];
		if (pipe.active == false) {
			pipe.active = true;
			return pipe;
		}
	}
	var pipe = Pipe._create(type);
	return pipe;
}


