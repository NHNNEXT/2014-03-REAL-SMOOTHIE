var PIPE_TYPE = {
		"RAND" : {
			// P for All pipes
			"P": 360,
			"L": 1360,
			"I": 2360,
			"X": 3360,
			"T": 4360
		},
		"L" : {
			"U": 1000,
			"R": 1090,
			"D": 1180,
			"L": 1270
		},
		"I" : {
			"U": 2000,
			"R": 2090,
			"D": 2180,
			"L": 2270
		},
		"X" : {
			"U": 3000,
			"R": 3090,
			"D": 3180,
			"L": 3270
		},
		"T" : {
			"U": 4000,
			"R": 4090,
			"D": 4180,
			"L": 4270
		}, 
		"INFO": {
			1000: {0:true, 90:true, 180:false, 270:false},
			2000: {0:true, 90:false, 180:true, 270:false},
			3000: {0:true, 90:true, 180:true, 270:true},
			4000: {0:false, 90:true, 180:true, 270:true}
		},
		"HP" : 1
};

var BLOCK = {
		"TYPE": {
			"NULL" : 0,
			"PIPE" : PIPE_TYPE,
			"FRIEND" : 5000,
			"ENEMY" : 6000,
			"ISOLATION": 7000,
			"TREASURE": 8000,
		},
		"ROTATION": {
			UP: 0,
			RIGHT: 90,
			DOWN: 180,
			LEFT: 270		
		},
		"DIRECTION": {
			UP: 0,
			RIGHT: 90,
			DOWN: 180,
			LEFT: 270		
		},
		"SIZE": {
			WIDTH: 86,
			HEIGHT: 86
		}
};

