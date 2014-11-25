(function() {
	var P  = BLOCK.TYPE.PIPE.RAND.P;
	var IU = BLOCK.TYPE.PIPE.I.U;
	var IR = BLOCK.TYPE.PIPE.I.R;
	var LD = BLOCK.TYPE.PIPE.L.D;
	var LR = BLOCK.TYPE.PIPE.L.R;
	var LL = BLOCK.TYPE.PIPE.L.L;
	var F  = BLOCK.TYPE.FRIEND;
	var E  = BLOCK.TYPE.ENEMY;
	var I  = BLOCK.TYPE.ISOLATION;
	var T  = BLOCK.TYPE.TREASURE;
	
	var LEVEL = {
		"MAP": {
			"TYPE": "PRESET",
			"MAP": [
			       [IR,IR,IR,IR,LD],
			       [LR,IR,IR,IR,LL],
			       ].reverse()
		},
		"STAGE1": {
			"ID": 0,
			"TYPE": "PRESET",
			"TREASURE" : 0,
			"EMEMYLIST" : [
			{"id":0,"hp":1},
			{"id":0,"hp":1}
			],
			"RANDOMRATIO" : {
				"PIPE":[0,1,0,0], // L - I - X - T
				"ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
           "MAP" : [
                    [E ,E ],
                    [IU,IR],
                    [IR,IR],
                    [IU,IR],
                    [F ,F ]
                    ].reverse(),
            "MAXTURN" : 10
		},
		"LEVEL0": {
            "ID": 1,
            "TYPE": "RANDOM",
            "EMEMYLIST" : [
            {"id":0,"hp":5,},
            {"id":0,"hp":5,},
            {"id":0,"hp":5,},
            {"id":0,"hp":5,},
            {"id":0,"hp":5,},
            {"id":0,"hp":5,},
            ],
            "FIXEDPIPE" : [cc.p(2,2), cc.p(4,4)],
            "RANDOMRATIO" : {
            	"PIPE":[1,1,1,1],
            	"ROTATE":[1,1,1,1]
            },
			"MAP" : [
					[E,E,E ,E,E ,E],
					[P,P,P ,P,P ,P],
					[P,T,P ,P,IU,P],
					[P,P,P ,P,P ,P],
					[P,P,IU,P,P ,P],
					[P,P,P ,P,P ,P],
					[P,F,F ,F,F ,P]
					].reverse(),
			"MAXTURN" : 40
		},
		"9X9TEST": {
			"ID": 2,
			"TYPE": "RANDOM",
			"EMEMYLIST" : [
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			{"id":0,"hp":5,},
			],
			"RANDOMRATIO" : {
				"PIPE":[1,1,1,1],
				"ROTATE":[1,1,1,1]
			},
			"MAP" : [
			         [E,E,E,E,E,E,E],
			         [P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P],
			         [P,P,P,P,P,P,P],
			         [P,F,F,F,F,F,P]
			         ].reverse(),
			"MAXTURN" : 40
		}
	};
	
	for (var key in LEVEL) {
		var level = LEVEL[key];
		level.row = level.MAP.length;
		level.col = level.MAP[0].length;
	}
	
	var SMTH = window.SMTH || {};
	SMTH.LEVEL = LEVEL;
	
	window.SMTH = SMTH;
})()