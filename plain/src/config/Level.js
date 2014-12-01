(function() {
	var P  = BLOCK.TYPE.PIPE.RAND.P;
	var IU = BLOCK.TYPE.PIPE.I.U;
	var IR = BLOCK.TYPE.PIPE.I.R;
	var LU = BLOCK.TYPE.PIPE.L.U;
	var LD = BLOCK.TYPE.PIPE.L.D;
	var LR = BLOCK.TYPE.PIPE.L.R;
	var LL = BLOCK.TYPE.PIPE.L.L;
	var TD = BLOCK.TYPE.PIPE.T.D;
	var TR = BLOCK.TYPE.PIPE.T.R;
	var TL = BLOCK.TYPE.PIPE.T.L;
	var X = BLOCK.TYPE.PIPE.X.U;
	var F  = BLOCK.TYPE.FRIEND.SALLY;
	var E  = BLOCK.TYPE.ENEMY.CONY;
	var I  = BLOCK.TYPE.ISOLATION;
	var T  = BLOCK.TYPE.TREASURE;
	
	var LEVEL = {
		"STAGE1": {
			"ID": 0,
			"TITLE": "Connect Straw",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":1,"treasure":false},
			    {"id":6001,"hp":1,"treasure":false}
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
		"STAGE2": {
			"ID": 1,
			"TITLE": "Turn Left",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":1,"treasure":false},
			    {"id":6001,"hp":1,"treasure":false}
			],
			"RANDOMRATIO" : {
			   "PIPE":[1,1,1,1], // L - I - X - T
			   "ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
			"MAP" : [
			        [E ,I ,I ,E ],
			        [LU,LL,P ,IU],
			        [P ,IU,P ,IU],
			        [P ,IU,LU,LL],
			        [I ,F ,F , I]
			        ].reverse(),
	        "MAXTURN" : 10
		},
		"STAGE3": {
			"ID": 2,
			"TITLE": "One Shot Two Heal",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":1,"treasure":false},
			    {"id":6001,"hp":1,"treasure":false},
			    {"id":6001,"hp":1,"treasure":false},
			    {"id":6001,"hp":1,"treasure":false}
			],
			"RANDOMRATIO" : {
			   "PIPE":[1,1,1,1], // L - I - X - T
			   "ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
			"MAP" : [
			        [E ,E ,E ,E ],
			        [LU,TD,TD,LL],
			        [P ,IU,IU,P ],
			        [P ,IU,IU,P ],
			        [I ,F ,F , I]
			        ].reverse(),
	        "MAXTURN" : 10
		},
		"STAGE4": {
			"ID": 3,
			"TITLE": "Suck Twice",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":2,"treasure":false},
			    {"id":6001,"hp":2,"treasure":false}
			],
			"RANDOMRATIO" : {
				"PIPE":[1,1,1,1], // L - I - X - T
				"ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
			"MAP" : [
					[E ,I ,E ],
					[IU,P ,IU],
					[IR,P ,IR],
					[IU,P ,IU],
					[F ,I ,F ]
					].reverse(),
			"MAXTURN" : 10
		},
		"STAGE5": {
			"ID": 4,
			"TITLE": "Two Cup in one chance",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":2,"treasure":false},
			    {"id":6001,"hp":2,"treasure":false},
			    {"id":6001,"hp":2,"treasure":false}
			],
			"RANDOMRATIO" : {
			   "PIPE":[1,1,1,1], // L - I - X - T
			   "ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
			"MAP" : [
			        [E ,E ,E ],
			        [IU,IU,P ],
			        [IR,IR,P ],
			        [TL,TR,P ],
			        [F ,F ,I ]
			        ].reverse(),
	        "MAXTURN" : 10
		},
		"STAGE6": {
			"ID": 5,
			"TITLE": "Treasure!",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6001,"hp":2,"treasure":true},
			    {"id":6001,"hp":2,"treasure":true},
			    {"id":6001,"hp":2,"treasure":true}
			],
			"ITEMLIST": [
			             {"id":"Item0001", "ratio": 1},
			             {"id":"Item0001", "ratio": 1}
			],
			"RANDOMRATIO" : {
			   "PIPE":[1,1,1,1], // L - I - X - T
			   "ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
			},
			"MAP" : [
			        [E ,E ,E ],
			        [P ,P ,P ],
			        [P ,P ,P ],
			        [P ,P ,P ],
			        [F ,I ,F ]
			        ].reverse(),
	        "MAXTURN" : 15
		},
		"STAGE7": {
			"ID": 6,
			"TITLE": "Carrot Smoothie",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
               {"id":6002,"hp":2,"treasure":true},
               {"id":6001,"hp":2,"treasure":true},
               {"id":6002,"hp":2,"treasure":true}
               ],
            "ITEMLIST": [
               {"id":"Item0001", "ratio": 1},
               {"id":"Item0001", "ratio": 1}
            ],
            "RANDOMRATIO" : {
        	   "PIPE":[1,1,1,1], // L - I - X - T
        	   "ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
            },
            "MAP" : [
				[E ,E ,E ],
				[P ,P ,P ],
				[P ,P ,P ],
				[P ,P ,P ],
				[P ,P ,P ],
				[F ,I ,F ]
	            ].reverse(),
            "MAXTURN" : 15
		},
		"STAGE8": {
			"ID": 7,
			"TITLE": "Something Fixed",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
               {"id":6001,"hp":2,"treasure":true},
               {"id":6002,"hp":2,"treasure":true},
               {"id":6001,"hp":2,"treasure":true}
            ],
            "ITEMLIST": [
	            {"id":"Item0001", "ratio": 1},
	            {"id":"Item0001", "ratio": 1}
	        ],
            "RANDOMRATIO" : {
            	"PIPE":[1,1,1,1], // L - I - X - T
            	"ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
            },
            "FIXEDPIPE" : [cc.p(3,1)],
            "MAP" : [
                 [E ,E ,E ],
                 [P ,P ,P ],
                 [P ,X ,P ],
                 [P ,P ,P ],
                 [P ,P ,P ],
                 [F ,I ,F ]
             ].reverse(),
             "MAXTURN" : 15
		},
		"STAGE9": {
			"ID": 8,
			"TITLE": "Strange Empty",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
               {"id":6001,"hp":2,"treasure":true},
               {"id":6002,"hp":2,"treasure":true},
               {"id":6001,"hp":2,"treasure":true},
               {"id":6002,"hp":2,"treasure":true},
               {"id":6001,"hp":2,"treasure":true}
            ],
            "ITEMLIST": [
	            {"id":"Item0001", "ratio": 1},
	            {"id":"Item0001", "ratio": 1}
	        ],
            "RANDOMRATIO" : {
            	"PIPE":[1,1,1,1], // L - I - X - T
            	"ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
            },
            "FIXEDPIPE" : [cc.p(3,1), cc.p(3,2), cc.p(3,3)],
            "MAP" : [
				[E ,E ,E ,E ,E],
				[P ,P ,P ,P ,P],
				[P ,P ,P ,P ,P],
				[P ,TL,TD,TR,P],
				[P ,P ,P ,P ,P],
				[P ,P ,P ,P ,P],
				[I ,F ,I ,F ,I]
             ].reverse(),
             "MAXTURN" : 15
		},
		"STAGE10": {
			"ID": 9,
			"TITLE": "Try All Together",
			"TYPE": "PRESET",
			"EMEMYLIST" : [
			    {"id":6002,"hp":2,"treasure":true},
				{"id":6001,"hp":2,"treasure":true},
				{"id":6002,"hp":2,"treasure":true},
				{"id":6001,"hp":2,"treasure":true},
				{"id":6002,"hp":2,"treasure":true}
			],
           "ITEMLIST": [
                        {"id":"Item0001", "ratio": 1},
                        {"id":"Item0001", "ratio": 1}
            ],
            "RANDOMRATIO" : {
            	"PIPE":[1,1,1,1], // L - I - X - T
            	"ROTATE":[1,1,1,1] // 360 - 90 - 180 - 270
            },
            "FIXEDPIPE" : [cc.p(5,0), cc.p(5,4), cc.p(2,3)],
            "MAP" : [
                     [E ,E ,E ,E ,E],
                     [LU,P ,P ,P ,LL],
                     [P ,P ,P ,P ,P],
                     [P ,P ,IR,P ,P],
                     [P ,P ,P ,P ,P],
                     [P ,P ,P ,P ,P],
                     [I ,F ,I ,F ,I]
             ].reverse(),
             "MAXTURN" : 15
		}
		/*,
		"LEVEL0": {
            "ID": 6,
            "TYPE": "RANDOM",
            "EMEMYLIST" : [
                {"id":6001,"hp":5,"treasure":true},
                {"id":6001,"hp":5,"treasure":true},
                {"id":6001,"hp":5,"treasure":true},
                {"id":6001,"hp":5,"treasure":true},
                {"id":6001,"hp":5,"treasure":true},
                {"id":6001,"hp":5,"treasure":true}
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
			"ID": 7,
			"TYPE": "RANDOM",
			"EMEMYLIST" : [
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true},
				{"id":6001,"hp":5,"treasure":true}
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
		}*/
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