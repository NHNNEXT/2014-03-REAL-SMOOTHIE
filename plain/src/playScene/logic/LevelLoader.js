var LevelLoader = cc.Class.extend({
	ctor: function(level) {
		this._level = level;
		this.init();
	},
	init: function() {
		var enemies =  this._level.EMEMYLIST.slice(0);
		var fixedPipes = this._level.FIXEDPIPE;
		
		SMTH.CONTAINER.PIPES = [];
		
		for (var r in this._level.MAP) {
			var row = this._level.MAP[r];
			for (var c in row) {
				var type = row[c];
				var block;
				// PIPE
				if (type < 5000) {
					// Random Rotate
					if (type % 1000 == 360) {
						type = Pipe.getRandomPipeType(type);
					}
					block = new Pipe(type);
				}
				// FRIEND
				else if (type < 6000) {
					block = new Friend(5001);
				}
				// ENEMY
				else if (type < 7000) {
					var enemyInfo =  enemies.shift();
					block = new Enemy(enemyInfo.id);
					block.setHP(enemyInfo.hp);
					block.setTreasure(enemyInfo.treasure);
				} 
				// ISOLATION
				else if (type < 8000) {
					block = new Isolation(0);
				}
				// TREASURE
				else if (type < 9000) {
					block = new Treasure(1);
				}
				
				for(var i in fixedPipes) {
					if(fixedPipes[i].x == r && fixedPipes[i].y == c) block.fixed = true;
				}
				
				block.setPositionByRowCol(r, c);
				SMTH.CONTAINER.PIPES.push(block);             
			}
		}
	},
});