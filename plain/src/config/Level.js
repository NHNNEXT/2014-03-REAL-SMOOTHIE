(function() {
	var P = BLOCK_TYPE.PIPE;
	var F = BLOCK_TYPE.FRIEND;
	var E = BLOCK_TYPE.ENEMY;
	
	var LEVEL = {
		"LEVEL0": {
			"MAP" : [
			       [E,E,E,E],
			       [P,P,P,P],
			       [P,P,P,P],
			       [P,P,P,P],
			       [P,P,P,P],
			       [F,F,F,F]
			       ].reverse()
		}
	}
	
	for (var key in LEVEL) {
		var level = LEVEL[key];
		cc.log("Level: " + level);
		level.row = level.MAP.length;
		level.col = level.MAP[0].length;
	}
	
	var SMTH = window.SMTH || {};
	SMTH.LEVEL = LEVEL;
	
	window.SMTH = SMTH;
})()