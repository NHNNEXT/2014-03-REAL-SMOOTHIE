

var Block = cc.Sprite.extend({
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
	}
});