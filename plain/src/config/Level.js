(function() {
	var P = BLOCK.TYPE.PIPE.RAND.P;
	var IU = BLOCK.TYPE.PIPE.I.U;
	var IR = BLOCK.TYPE.PIPE.I.R;
	var LD = BLOCK.TYPE.PIPE.L.D;
	var LR = BLOCK.TYPE.PIPE.L.R;
	var LL = BLOCK.TYPE.PIPE.L.L;
	var F = BLOCK.TYPE.FRIEND;
	var E = BLOCK.TYPE.ENEMY;
	var I = BLOCK.TYPE.ISOLATION;
	var T = BLOCK.TYPE.TREASURE;
	
	var LEVEL = {
		"MAP": {
			"TYPE": "PRESET",
			"MAP": [
			       [IR,IR,IR,IR,LD],
			       [LR,IR,IR,IR,LL],
			       ].reverse()
		},
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
					[P,T,P,P,I,P],
					[P,P,P,P,P,P],
					[P,P,P,P,P,P],
					[P,P,P,P,P,P],
					[P,F,F,F,F,P]
					].reverse(),
			"MAXTURN" : 40
		},
		"9X9TEST": {
			"ID": 2,
			"TYPE": "RANDOM",
			"MAP" : [
			         [E,E,E,E,E,E,E,E,E],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P,P,P],
			         [P,P,F,F,F,F,F,P,P]
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