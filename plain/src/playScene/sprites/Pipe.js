
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
			onTouchBegan: this.pipeTouchHandler.onTouchBegan.bind(this),
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
		// 모든 터치이벤트리스너를 돌며 이 파이프를 선택한 것인지 계산한다.
		var target = event.getCurrentTarget();
		var locationInNode = target.convertToNodeSpace(touch.getLocation());    
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		// 선택한 파이프를 찾았다면-
		if (cc.rectContainsPoint(rect, locationInNode)) {
			this.deltaX = 0;
			
			this.guidePipe = new Pipe(this.pipeType);
			this.guidePipe.setPosition(cc.p(70,70));
			// 파이프가 돌아가면 좌표계도 같이 돌아간다. 0도로 해놓으면 항상 같은 모양이 나온다.
			this.guidePipe.setRotation(0);
			this.guidePipe.opacity = 30;
			this.addChild(this.guidePipe);
			
			//cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			target.opacity = 180;
			return true;
		}
		return false;
	},
	"onTouchMoved": function (touch, event) {         
		var target = event.getCurrentTarget();
		this.deltaX += touch.getDelta().x;
		
		var angle = Math.sqrt(Math.sqrt(Math.abs(this.deltaX) / cc.director.getWinSize().width)) * 120;
		if (this.deltaX < 0) angle = -angle;
		this.guidePipe.setRotation(angle);
	},
	"onTouchEnded": function (touch, event) {         
		var target = event.getCurrentTarget();
		//cc.log("sprite onTouchesEnded.. ");
		target.setOpacity(255);
		
		this.removeChild(this.guidePipe);
		
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
			if (this.deltaX >= 0) {
				target.rotateRight();
			} else if (this.deltaX < 0)  {
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