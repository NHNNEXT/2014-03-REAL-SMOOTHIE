var BLOCK = {
		"TYPE": {
			PIPE: 0,
			FRIEND: 1,
			ENEMY : 2
		},
		"ROTATION": {
			UP: 0,
			RIGHT: 90,
			DOWN: 180,
			LEFT: 270		
		},
		"DIRECTION": {
			UP: 0,
			RIGHT: 90,
			DOWN: 180,
			LEFT: 270		
		},
		"SIZE": {
			WIDTH: 140,
			HEIGHT: 140
		}
};

var Block = cc.Sprite.extend({
	type: null,
	row: null,
	column: null,
	active: null,
	connectedWith: null,
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