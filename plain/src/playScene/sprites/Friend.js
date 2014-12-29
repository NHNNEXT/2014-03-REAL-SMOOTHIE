var Friend = Block.extend({
	ctor:function (type) {
		this._super(FriendTypeInfo[type].resouceName);
		this.friendType = type;
		this.init();
	},
	init: function() {
		this.HP = 1;
		this.type = BLOCK.TYPE.FRIEND;
		var actionTo = cc.moveBy(1, cc.p(0, 8));
        var actionToBack = actionTo.reverse();
		var rep = new cc.RepeatForever(cc.sequence(actionTo, actionToBack), 5);
        this.runAction(rep);
	},
	setItem: function(item) {
		if (item === "none") {
			// yogurt
			this.item = "Item0000";
		} else
			this.item = item;
	},
	setCups: function(cupsLevel) {
		this.cups = [];
		for (var i in cupsLevel) {
			var cupLevel = cupsLevel[i];
			var cup = new Cup(cupLevel);
			cup.x = 20 + 30*i;
			cup.y = 0;
			cup.scale = 0.15;
			this.addChild(cup);
			this.cups.push(cup);
		}
	},
	addSmoothie: function(smoothie) {
		var remain = smoothie.amount;
		for (var i in this.cups) {
			var cup = this.cups[i];
			// 컵에 스무디를 따르고 남은 스무디는 다음 컵에 따른다.
			var remain = cup.addSmoothie(smoothie);
			if (remain == 0) return;
			smoothie.amount = remain;
		}
	},
	getSmoothie: function() {
		var smoothie = null;
		for (var i in this.cups) {
			var cup = this.cups[i];
			if (cup.content == null) continue;
			if (smoothie == null)
				smoothie = cup.content;
			else {
				smoothie.mix(cup.content);
			}
		}
		return smoothie;
	},
	useSmoothie: function() {
		// 스무디를 모두 사용함
		// 컵을 모두 비움
		var result = this.getSmoothie();
		for (var i in this.cups) {
			var cup = this.cups[i];
			cup.content = null;
			cup.resetColor();
		}
		return result;
	},
	isOpened : function(dir) {
		return true;
	},
	isFriend : function() {
		return true;
	}
});
