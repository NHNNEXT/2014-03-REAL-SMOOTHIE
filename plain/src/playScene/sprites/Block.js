var Block = cc.Sprite.extend({
	ctor:function (resourceName) {
		this._super(resourceName);
		// Block 공통 변수 설정
		this.HP = null; // HP가 0이 되면 사라져야할 녀석
		this.type = null; // BLOCK.TYPE.PIPE || BLOCK.TYPE.FRIEND || BLOCK.TYPE.ENEMY
		this.row = -1;
		this.col = -1;
		this.connectedWith = [];
		this.visitFlag = false;
		this.fixed = false;
		this.animationQueue = [];
		
		this.setScaleX(BLOCK.SIZE.WIDTH/140);
		this.setScaleY(BLOCK.SIZE.HEIGHT/140);
		// 여기에 init()이 있으면 init()이 두 번 호출됨.
	},
	getContainerIndex: function() {
		var levelCol = SMTH.CONTAINER.BOARD._level.col;
		return parseInt(this.row*levelCol)+parseInt(this.col);
	},
	setPositionByRowCol: function(row, col) {
		this.row = row;
		this.col = col;
				
		var position = this._coordinateToPosition(this.row, this.col);
		this.setPosition(position);
	},
	appendAnimation: function(action) {
		if (action == null) return;
		this.animationQueue.push(action);
	},
	moveToProperPosition: function() {
		var position = this._coordinateToPosition(this.row, this.col);
		if (this.x == position.x && this.y == position.y) {
			return cc.delayTime(0.2);
		}
		return cc.moveTo(0.2, position);
	},
	_coordinateToPosition: function(row, col) {
		var width = BLOCK.SIZE.WIDTH;
		var height = BLOCK.SIZE.HEIGHT;
		return cc.p(col*width + width/2 , row*height + height/2);
	},
	
	hurt: function(smoothie) {
		// 파이프는 1씩 닳도록 오버라이딩 
		// 적은 자신의 속성과 비교하여 데미지 계산하도록 오버라이딩 
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