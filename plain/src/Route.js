var Route = cc.Class.extend({
	pipes : null,
	friend : null,
	numberOfEnemies: 0,
	ctor:function (friend) {
		this.friend = friend;
		this.init();
	},

	init:function () {
		this.pipes = [];
		this.searchRoute(this.friend);
		this.countEnemy();
	},
	
	searchRoute : function(pipe) {
		if(this.pipes.indexOf(pipe) >= 0) return;
		
		this.pipes.push(pipe);
		
		for(var p in pipe.connectedWith) {
			this.searchRoute(pipe.connectedWith[p]);
		}
	},
	
	countEnemy: function() {
		for (var i = this.pipes.length - 1;  i >= 0; i--) {
			var pipe = this.pipes[i];
			if (pipe.type == BLOCK_TYPE.ENEMY) {
				this.numberOfEnemies += 1;
			}
		}
	},
	
	colorRed: function() {
		for (var i in this.pipes) {
			var pipe = this.pipes[i];
			if (pipe.type != BLOCK_TYPE.FRIEND) {
				pipe.setColor(cc.color(255, 0, 0));
			}
		}
	}

});