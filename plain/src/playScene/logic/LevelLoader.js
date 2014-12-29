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
					// type == 5000, empty type. will be filled after select
					block = new Friend(type);
//					block.setItem(friendInfo.item);
//					block.setCups(friendInfo.cups);
				}
				// ENEMY
				else if (type < 7000) {
					var enemyInfo =  enemies.shift();
					block = new Enemy(enemyInfo.id);
					block.setHP(enemyInfo.hp);
					block.setTreasure(enemyInfo.treasure);
					block.setSickness(enemyInfo.sick);
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
					if(fixedPipes[i].x == r && fixedPipes[i].y == c) {
						block.fixed = true;
						var fixedSign = new cc.Sprite(res.fixed_sign);
						fixedSign.setPosition(cc.p(70,70));
						block.addChild(fixedSign);
					}
				}
				
				block.setPositionByRowCol(r, c);
				SMTH.CONTAINER.PIPES.push(block);             
			}
		}
	},
	setFriends: function(friends) {
		var fIdx = 0;
		for (var r in this._level.MAP) {
			var row = this._level.MAP[r];
			for (var c in row) {
				var type = row[c];
				if (type == BLOCK.TYPE.FRIEND.EMPTY) {
					// getOriginal
					var idx = r * this._level.col + c
					var originalBlock = SMTH.CONTAINER.PIPES[idx];
					var friendType = friends[fIdx];
					fIdx++;
					// replace
					var block = new Friends(friendType);
					block.setPositionByRowCol(r, c);
					SMTH.CONTAINER.PIPES[idx] = block;
					
					SMTH.CONTAINER.BOARD.removeChild(originalBlock);
					SMTH.CONTAINER.BOARD.addChild(block);
				}
			}
		}
	}
});