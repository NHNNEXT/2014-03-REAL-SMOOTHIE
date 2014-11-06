var Route = cc.Class.extend({
	ctor:function (friend) {
		this.start = friend;
		this.init();
	},

	init:function () {
		this.blocks = [];
		this.friends = [];
		this.destroied = 0;
		this.numberOfEnemies = 0;
		
		this.searchRoute(this.start);
		this.pickFriends();
		this.countEnemy();
	},
	
	searchRoute : function(block) {
		// 사전 체크 
		if (this.blocks.indexOf(block) >= 0) return;
		this.blocks.push(block);
		// 사후 체크
		if (block.isEnemy()) return;
		
		for(var p in block.connectedWith) {
			this.searchRoute(block.connectedWith[p]);
		}
	},
	pickFriends: function() {
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.isFriend()) {
				this.friends.push(block);
			}
		}
	},
	countEnemy: function() {
		for (var i = this.blocks.length - 1;  i >= 0; i--) {
			var block = this.blocks[i];
			if (block.type == BLOCK.TYPE.ENEMY) {
				this.numberOfEnemies += 1;
			}
		}
	},
	
	hurt: function() {
		for (var i in this.blocks) {
			var block = this.blocks[i];
			if (block.type != BLOCK.TYPE.FRIEND) {
				block.hurt(this.friends.length);
			}
		}
		
		// Route 사라지는 이펙트 적용
		SMTH.EFFECT_MANAGER.hideRoute(this);
	}

});