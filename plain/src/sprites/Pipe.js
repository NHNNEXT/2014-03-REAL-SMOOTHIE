
var PIPE = {};
PIPE.RESOURCE_MAPPER = {};
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.L] = res.Pipe_2way_curve;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.I] = res.Pipe_2way_line;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.X] = res.Pipe_4way;
PIPE.RESOURCE_MAPPER[PIPE_TYPE.RAND.T] = res.Pipe_3way;

var Pipe = Block.extend({
	ctor:function (initialPipeType) {
		
		// 파이프 타입만 정해준 경우 랜덤하게 회전
		if (initialPipeType % 1000 == 0) {
			this.pipeType = Pipe.getRandomPipeType(initialPipeType);
		} else {
			this.pipeType = initialPipeType;
		}
		
		var angle = this.pipeType % 1000;
		this.shape = this.pipeType - angle;
		
		this._super(PIPE.RESOURCE_MAPPER[this.shape]);
		this.rotation = angle;

		this.init();
	},
	init: function() {
		// PIPE만의 고유한 변수 및 값 설정
		this.type = BLOCK.TYPE.PIPE;
		this.delta = cc.p(0,0);
		this.HP = PIPE_TYPE.HP;
		this.isRotten = false;
		
		var pipeTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: this.pipeTouchHandler.onTouchBegan,
			onTouchMoved: this.pipeTouchHandler.onTouchMoved.bind(this),
			onTouchEnded: this.pipeTouchHandler.onTouchEnded.bind(this),
		});
		cc.eventManager.addListener(pipeTouchListener.clone(), this);
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
        cc.audioEngine.playEffect(res.rotateRight_mp3);

		this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation + 90), cc.callFunc(function(){
			SMTH.EVENT_MANAGER.notice("pipeRotateEnd");
		}) ));
		
	},
	rotateLeft: function () {
		cc.audioEngine.playEffect(res.rotateLeft_mp3);
                        
        this.runAction(cc.sequence(cc.rotateTo(0.2, this.rotation - 90), cc.callFunc(function(){
			SMTH.EVENT_MANAGER.notice("pipeRotateEnd");
		}) ));
	},
	
	isOpened : function(dir) {
		var pipeInfo = PIPE_TYPE.INFO[this.shape];
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
			// 사라질 파이프는 입력 무시
			return;
		} else if (target.rotation % 90 != 0) {
			// 회전 중 입력 무시
			return;
		} else if (SMTH.CONTAINER.TURN >= SMTH.STATUS.CURRENT_LEVEL.MAXTURN) {
			// 턴 초과시 입력 무시
			return;
		} else {
			SMTH.CONTAINER.TURN++;
			if (this.delta.x >= 0) {
				target.rotateRight();
			} else if (this.delta.x < 0)  {
				target.rotateLeft();
			}
		}
		
	}
};

Pipe.getRandomPipeType = function(initialPipeType) {
	var pipeType = initialPipeType;
	
	// ALL RANDOM then choose pipe type
	if (initialPipeType == 0) {
		pipeType = 1000 + Math.floor(Math.random() * 4) * 1000;
	}
	// Random Rotate
	var angle = 90 + Math.floor(Math.random() * 4) * 90;
	
	return pipeType + angle;
}