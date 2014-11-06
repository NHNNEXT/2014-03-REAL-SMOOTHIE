

var Block = cc.Sprite.extend({
	HP: null, // HP가 0이 되면 사라져야할 녀석
	type: null, // BLOCK.TYPE.PIPE || BLOCK.TYPE.FRIEND || BLOCK.TYPE.ENEMY
	row: null,
	column: null,
	active: null,
	connectedWith: null,
	ctor:function (resourceName) {
		this._super(resourceName);
		this.connectedWith = [];
		// 여기에 init()이 있으면 init()이 두 번 호출됨.
	},
	setPositionByRowCol: function(row, column) {
		this.row = row;
		this.column = column;

		var position = this._coordinateToPosition(this.row, this.column);
		this.setPosition(position);
	},
	_coordinateToPosition: function(row, column) {
		var width = BLOCK.SIZE.WIDTH;
		var height = BLOCK.SIZE.HEIGHT;
		return cc.p(column*width + width/2 , row*height + height/2);
	},
	hurt: function(attack) { // 파이프와 적이 파괴되는 경우를 생각해서 만든거임
		this.HP -= attack;
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