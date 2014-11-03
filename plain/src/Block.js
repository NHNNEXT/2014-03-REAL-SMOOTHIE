

var Block = cc.Sprite.extend({
	HP: null, // HP가 0이 되면 사라져야할 녀석
	type: null,
	row: null,
	column: null,
	active: null,
	connectedWith: null,
	visitFlag: false,
	ctor:function (resourceName) {
		this._super(resourceName);
	},
	_coordinateToPosition: function(row, column) {
		return cc.p(column*BLOCK.SIZE.WIDTH + BLOCK.SIZE.WIDTH/2 , row*BLOCK.SIZE.HEIGHT + BLOCK.SIZE.HEIGHT/2);
	},
	hurt: function() { // 파이프와 적이 파괴되는 경우를 생각해서 만든거임
		this.HP--;
		if(this.HP <= 0) {
			this.destroy();
		}
	},
	destroy: function () {
//		this.setOpacity(0);	
//		this.isRotten = true;
//		if (this.fading == true) {
//			return;
//		}
//		this.fading = true;
//		
//		cc.log(this.isRotten);
		this.runAction(cc.sequence(cc.callFunc(function(){
			cc.log("시작!");
		}),
		cc.scaleTo(1, 0), 
		cc.callFunc(function(){
			cc.log("끝!!");
			this.active = false;
			this.isRotten = true;
			this.visible = false;
			this.retain();
//			this.setOpacity(0);
		}.bind(this)) ));
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