var BLOCK_TYPE = {
		"PIPE" : 0,
		"FRIEND" :  1,
		"ENEMY" : 2
};

var P = BLOCK_TYPE.PIPE;
var F = BLOCK_TYPE.FRIEND;
var E = BLOCK_TYPE.ENEMY;

var BoardType = {
		MAP : [
		       [E,E,E,E],
		       [P,P,P,P],
		       [P,P,P,P],
		       [P,P,P,P],
		       [F,F,F,F]
		       ]
}
BoardType.row = BoardType.MAP.length;
BoardType.col = BoardType.MAP[0].length;


BoardType.MAP.reverse();
