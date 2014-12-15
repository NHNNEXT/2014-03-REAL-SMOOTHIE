(function() {
	

var IU = BLOCK.TYPE.PIPE.I.U;
var IR = BLOCK.TYPE.PIPE.I.R;
var LU = BLOCK.TYPE.PIPE.L.U;
var LD = BLOCK.TYPE.PIPE.L.D;
var LR = BLOCK.TYPE.PIPE.L.R;
var LL = BLOCK.TYPE.PIPE.L.L;
var TU = BLOCK.TYPE.PIPE.T.U;
var TD = BLOCK.TYPE.PIPE.T.D;
var TR = BLOCK.TYPE.PIPE.T.R;
var TL = BLOCK.TYPE.PIPE.T.L;
var X = BLOCK.TYPE.PIPE.X.U;
var T  = BLOCK.TYPE.TREASURE;
	
var MapSetting = {
	"MAP": [
	    [X, LD, LR, IR, TD, IR, LD],
	    [IU, LU, TD, LD, LR, IR, TD],
	    [LU, IR, LD, LU, X, IR, LD],
	    [TU, TU, TD, TU, TD, TU, TR],
	    [TL, LL, LR, TD, LD, IU, IU],
	    [LU, IR, TR, LR, X, TD, TR],
	    [LR, IR, TD, TR, LU, IR, LL]
	].reverse(),
	"LEVEL": [
	     cc.p(0,0),
	     cc.p(0,3),
	     cc.p(1,6),
	     cc.p(1,1),
	     cc.p(3,0),
	     cc.p(3,2),
	     cc.p(3,5),
	     cc.p(5,6),
	     cc.p(6,4),
	     cc.p(6,0)
	]
}

var SMTH = window.SMTH || {};
SMTH.MAPS = MapSetting;

window.SMTH = SMTH;

})()