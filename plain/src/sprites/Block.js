

var Block = cc.Sprite.extend({
	HP: null, // HP가 0이 되면 사라져야할 녀석
	type: null, // BLOCK.TYPE.PIPE || BLOCK.TYPE.FRIEND || BLOCK.TYPE.ENEMY
	row: null,
	column: null,
	active: null,
	connectedWith: null,
	visitFlag: false,
	ctor:function (resourceName) {
		this._super(resourceName);
		// 여기에 init()이 있으면 init()이 두 번 호출됨.
	},
	_coordinateToPosition: function(row, column) {
		var width = BLOCK.SIZE.WIDTH;
		var height = BLOCK.SIZE.HEIGHT;
		return cc.p(column*width + width/2 , row*height + height/2);
	},
	hurt: function() { // 파이프와 적이 파괴되는 경우를 생각해서 만든거임
		this.HP--;
//		if(this.HP <= 0) {
//			this.destroy();
//		}
	},
	destroy: function (callback) {
		this.runAction(cc.sequence(
			// 왜지? 왜 집에서 다시 하니까 fadeOut이 잘 되지?
			cc.fadeOut(1), 
			cc.callFunc(function(){
				this.active = false;
				this.isRotten = true;
				this.visible = false;
				if (this.isPipe()) {
					this.retain();
				}
				if (callback != null || callback != undefined) callback();
			}.bind(this))
		));
	},
	isPipe : function() {
		return false;
	},
	isEnemy : function() {
		return false;
	},
	isFriend : function() {
		return false;
	}
});