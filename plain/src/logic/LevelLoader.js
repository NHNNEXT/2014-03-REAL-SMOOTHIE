var LevelLoader = cc.Class.extend({
	ctor: function(level) {
		this._level = level;
		this.init();
	},
	init: function() {
		for (r in this._level.MAP) {
			var row = this._level.MAP[r];
			for (c in row) {
				var pipeType = row[c];
				// ALL RANDOM then choose pipe type
				if (pipeType == 0) {
					pipeType = 1000 + Math.floor(Math.random() * 4) * 1000;
				}
				// Random Rotate
				if (pipeType % 1000 == 0) {
					var angle = 90 + Math.floor(Math.random() * 4) * 90;
					pipeType += angle;
				}
				// PIPE
				if (pipeType < 5000) {
					var pipeShape = pipeType - pipeType % 1000;
					var angle = pipeType % 1000;
					var pipe = Pipe.getOrCreate(pipeShape);
					pipe.rotation = angle;
					SMTH.CONTAINER.PIPES.push(pipe);
					pipe.setPositionByRowCol(r, c);
				}
				// FRIEND
				else if (pipeType < 6000) {
                    var friend = new Friend(0);
					SMTH.CONTAINER.PIPES.push(friend);
					var pos = friend._coordinateToPosition(r, c);
					friend.x = pos.x;
					friend.y = pos.y;
                                  friend.setScaleX(BLOCK.SIZE.WIDTH/140);
                                  friend.setScaleY(BLOCK.SIZE.HEIGHT/140);
				}
				// ENEMY
				else if (pipeType < 7000) {
                    var enemy = new Enemy(0);
					SMTH.CONTAINER.PIPES.push(enemy);
					var pos = enemy._coordinateToPosition(r, c);
					enemy.x = pos.x;
                    enemy.y = pos.y;
                    enemy.setScaleX(BLOCK.SIZE.WIDTH/140);
                    enemy.setScaleY(BLOCK.SIZE.HEIGHT/140);
				}
                                 
			}
		}
	}
});