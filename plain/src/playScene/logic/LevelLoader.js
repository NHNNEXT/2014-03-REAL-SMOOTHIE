var LevelLoader = cc.Class.extend({
	ctor: function(level) {
		this._level = level;
		this.init();
	},
	init: function() {
		var enemies =  this._level.EMEMYLIST.slice(0);
		
		for (var r in this._level.MAP) {
			var row = this._level.MAP[r];
			for (var c in row) {
				var pipeType = row[c];
				// PIPE
				if (pipeType < 5000) {
					// Random Rotate
					if (pipeType % 1000 == 360) {
						pipeType = Pipe.getRandomPipeType(pipeType);
					}
					var pipe = new Pipe(pipeType);
					pipe.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES.push(pipe);
				}
				// FRIEND
				else if (pipeType < 6000) {
                    var friend = new Friend(0);
                    friend.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES.push(friend);
				}
				// ENEMY
				else if (pipeType < 7000) {
					var enemyInfo =  enemies.shift();
					var enemy = new Enemy(enemyInfo.id);
					enemy.setHP(enemyInfo.hp);
					enemy.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES.push(enemy);
				} 
				// ISOLATION
				else if (pipeType < 8000) {
					var isolation = new Isolation(0);
					isolation.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES.push(isolation);
				}
				// TREASURE
				else if (pipeType < 9000) {
					var treasure = new Treasure(1);
					treasure.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES.push(treasure);
				}
                                 
			}
		}
	},
});