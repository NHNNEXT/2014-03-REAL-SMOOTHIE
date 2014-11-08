
var Block = cc.Sprite.extend({
	ctor:function (resourceName) {
		this._super(resourceName);
		// Block 공통 변수 설정
		this.HP = null; // HP가 0이 되면 사라져야할 녀석
		this.type = null; // BLOCK.TYPE.PIPE || BLOCK.TYPE.FRIEND || BLOCK.TYPE.ENEMY
		this.row = null;
		this.col = null;
		this.connectedWith = [];
		this.visitFlag = false;
		
		this.setScaleX(BLOCK.SIZE.WIDTH/140);
		this.setScaleY(BLOCK.SIZE.HEIGHT/140);
		// 여기에 init()이 있으면 init()이 두 번 호출됨.
	},
	
	setPositionByRowCol: function(row, col) {
		this.row = row;
		this.col = col;

		var position = this._coordinateToPosition(this.row, this.col);
		this.setPosition(position);
	},
	_coordinateToPosition: function(row, col) {
		var width = BLOCK.SIZE.WIDTH;
		var height = BLOCK.SIZE.HEIGHT;
		return cc.p(col*width + width/2 , row*height + height/2);
	},
	
	hurt: function() { // 파이프와 적이 파괴되는 경우를 생각해서 만든거임
		this.HP--;
		if(this.HP <= 0) {
			this.destroy();
		}
	},
	destroy: function () {
//		if (this.fading == true) {
//			return;
//		}
//		this.fading = true;

		this.runAction(cc.sequence(
			cc.fadeOut(1), 
			cc.callFunc(function(){
				this.active = false;
				this.isRotten = true;
				this.visible = false;
				this.retain();
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