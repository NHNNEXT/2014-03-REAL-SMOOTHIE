var Enemy = Block.extend({
	ctor:function (type) {
		this._super(EnemyTypeInfo[type].resouceName);
        this.enemyType = type;
		this.init();
	},
	init: function() {
		this.type = BLOCK.TYPE.ENEMY;
		this.HP = 1;
		this.treasure = false;
		this.isBlinking = false;
		
       	this.hpBar = new HealthBar(-1, 1, 0);
        this.hpBar.x = 70;
		this.addChild(this.hpBar);
		
		var enemyTapListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: this.enemyTapListener.onTouchBegan.bind(this),
			onTouchEnded: this.enemyTapListener.onTouchEnded.bind(this)
		});
		
		cc.eventManager.addListener(enemyTapListener.clone(), this);
		
		var actionTo = cc.scaleBy(1.5, 1.04);
        var actionToBack = actionTo.reverse();
		var rep = new cc.RepeatForever(cc.sequence(actionTo, actionToBack), 5);
		this.runAction(rep);

	},
	setTreasure: function(treasure) {
		this.treasure = treasure;
	},
	setHP : function(hp) {
		this.hpBar.setHP(hp);
	},
	setSickness: function(sickness) {
		this.sickness = sickness;
	},
	hurt: function(smoothie) {
		// 일단 양에 비례하는 방식으로 
		if (smoothie === null) {
			return;
		}
		var damage = smoothie.amount / 100;
		this.hpBar.heal(damage);
		// TODO: hpBar가 Full면 그림을 바꾸기 
		if(this.hpBar.getPercentageOf() === 100) {
			cc.log("코니: 고마워^^ 나 상태가 좋아진듯!")
		}
		this.stopBlinking();
		
	},
	willBeHealed: function(smoothie) {
		this.hpBar.stopBlinking();
		var damage = smoothie.amount / 100;
		this.expectedDamage = damage;
		this.hpBar.blink(damage);
		this.isBlinking = true;
	},
	stopBlinking: function() {
		this.hpBar.stopBlinking();
		this.isBlinking = false;
	},
	isOpened : function(dir) {
		return true;
	},
	isEnemy : function() {
		return true;
	}
});

Enemy.prototype.enemyTapListener = {
		"onTouchBegan": function (touch, event) { 
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
			SMTH.EVENT_MANAGER.notice("slurp");
		}
}
