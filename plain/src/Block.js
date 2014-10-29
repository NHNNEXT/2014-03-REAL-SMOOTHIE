var Block = cc.Sprite.extend({
	type: null,
	row: null,
	column: null,
	active: null,
	connectedWith: null,
	rotation: null,
	visitFlag: false,
	ctor:function (resourceName) {
		cc.log("block : " + resourceName);
		this._super(resourceName);
		this.init();
	},
	init: function() {

	},
	
	_coordinateToPosition: function(row, column) {
		return cc.p(column*PIPE.SIZE.WIDTH + PIPE.SIZE.WIDTH/2 , row*PIPE.SIZE.HEIGHT + PIPE.SIZE.HEIGHT/2);
	}
});