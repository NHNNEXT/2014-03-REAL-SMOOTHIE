var Treasure = Block.extend({
	ctor:function (type) {
		this._super(IsolationType[type].resourceName);
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ISOLATION;
		this.HP = IsolationType[1].HP;
		var treasureTapListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: this.treasureTouchHandler.onTouchBegan.bind(this),
			onTouchEnded: this.treasureTouchHandler.onTouchEnded.bind(this)
		});
		cc.eventManager.addListener(treasureTapListener.clone(), this);
	},

	isOpened : function(dir) {
		return false;
	}, 
});

Treasure.prototype.treasureTouchHandler = {
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
	"onTouchEnded": function (touch, event) { 
		var itemList = SMTH.STATUS.CURRENT_LEVEL.ITEMLIST;
		var accItemRatio = [];
		itemList.reduce(function(acc,item,idx) { accItemRatio[idx] = acc + item.ratio; return accItemRatio[idx]; },0);
		
		var randValue = Math.random() * accItemRatio[accItemRatio.length-1];
		var i = 0;
		while (randValue > accItemRatio[i]) i++;
		var itemImage = ItemType[itemList[i].id].image;
		this.setOpacity(0);
		var replacement = new cc.Sprite(itemImage);
		replacement.setPosition(cc.p(70,70));
		this.addChild(replacement);
	}
}