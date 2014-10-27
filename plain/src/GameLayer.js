var GameLayer = cc.Layer.extend({
	clickCount: null,
	clicked: null,
	_rectArr : null,
	_boardController: null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this.addChild(new BoardLayer());
	}
	

});


var onTouchBegan = function (touch, event) { 
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
}
var onTouchMoved = function (touch, event) {         
	var target = event.getCurrentTarget();
	this.delta = touch.getDelta();
}
var onTouchEnded = function (touch, event) {         
	var target = event.getCurrentTarget();
	cc.log("sprite onTouchesEnded.. ");
	target.setOpacity(255);
	if (this.delta.x >= 0 && target.rotation%90==0) {
		target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation + 90)));
	} else if (this.delta.x < 0 && target.rotation%90==0)  {
		target.runAction(cc.sequence(cc.rotateTo(0.5, target.rotation - 90)));
	}
	var animationLayer = target.parent;
	animationLayer.clicked();
}
