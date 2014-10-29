var BLOCK_TYPE = {
		"PIPE" : 0,
		"FRIEND" :  1,
		"ENEMY" : 2
};

var P = BLOCK_TYPE.PIPE;
var F = BLOCK_TYPE.FRIEND;
var E = BLOCK_TYPE.ENEMY;

var BoardType = {
	row: 6,
	col: 4,
	FRIENDS : {
		ROW: [],
		COL: [],
		POS: [cc.p(0,0), cc.p(1,0), cc.p(2,0), cc.p(3,0)]
	},
	EMENY : {
		ROW: [],
		COL: [],
		POS: []
	},
	MAP : [
	       [E,E,E,E],
	       [P,P,P,P],
	       [P,P,P,P],
	       [P,P,P,P],
	       [P,P,P,P],
	       [F,F,F,F]
	]
}



