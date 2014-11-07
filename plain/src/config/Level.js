(function() {
	var P = BLOCK.TYPE.PIPE.RAND.P;
	var IU = BLOCK.TYPE.PIPE.I.U;
	var IR = BLOCK.TYPE.PIPE.I.R;
	var F = BLOCK.TYPE.FRIEND;
	var E = BLOCK.TYPE.ENEMY;
	
	var LEVEL = {
		"TUTORIAL0": {
			"ID": 0,
            "TYPE": "PRESET",
			"MAP" : [
			         [E,E,E,E],
			         [IU,IU,IU,IU],
			         [IR,IR,IR,IR],
			         [IU,IU,IU,IU],
			         [F,F,F,F]
			         ].reverse(),
			"MAXTURN" : 20
		},
		"LEVEL0": {
            "ID": 1,
            "TYPE": "RANDOM",
			"MAP" : [
			       [E,E,E,E,E,E],
                     [P,P,P,P,P,P],
                     [P,P,P,P,P,P],
                     [P,P,P,P,P,P],
                     [P,P,P,P,P,P],
                     [P,P,P,P,P,P],
			       [P,F,F,F,F,P]
			       ].reverse(),
			"MAXTURN" : 40
        }
	};
	
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