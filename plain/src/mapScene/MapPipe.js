var MapPipe = Block.extend({
	ctor:function (initialPipeType) {
		// 파이프 타입만 정해준 경우 랜덤하게 회전
		if (initialPipeType % 1000 == 360) {
			this.pipeType = Pipe.getRandomPipeType(initialPipeType);
		} else {
			this.pipeType = initialPipeType;
		}

		var angle = this.pipeType % 1000;
		this.shape = this.pipeType - angle;
		this._super(PIPE_RESOURCE_MAPPER[this.shape]);
		this.rotation = angle;
	},
	
	setListener: function(level) {
		var pipeTouchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: this.pipeTouchHandler.onTouchBegan.bind(this),
			onTouchEnded: this.pipeTouchHandler.onTouchEnded.bind(this, level),
		});
		cc.eventManager.addListener(pipeTouchListener.clone(), this);
	}

});

MapPipe.prototype.pipeTouchHandler = {
		"onTouchBegan": function (touch, event) { 
			// 모든 터치이벤트리스너를 돌며 이 파이프를 선택한 것인지 계산한다.
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());    
			var s = target.getContentSize();
			var rect = cc.rect(0, 0, s.width, s.height);
			// 선택한 파이프를 찾았다면-
			if (cc.rectContainsPoint(rect, locationInNode)) {
				return true;
			}
			return false;
		},
		"onTouchEnded": function (level, touch, event) {   
			var target = event.getCurrentTarget();
			// runscene - level
			cc.log(level);
			SMTH.START_LEVEL_INDEX = level;
			cc.director.runScene(new PlayScene());
		}
};