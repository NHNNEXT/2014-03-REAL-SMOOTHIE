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
var NN = BLOCK.TYPE.NULL;
	
var MapSetting = {
	"MAP": [
	    [TL, LD, LR, IR, TD, IR, LD],
	    [IU, LU, TD, LD, LR, IR, TD],
	    [LU, IR, IR, LL, LU, TU, LD],
	    [TU, IR, IR, IR, IR, TD, LL],
	    [IU, NN, LR, IR, IR, TU, LD],
	    [LU, IR, LL, LR, LD, LU, TR],
	    [LR, IR, IR, TR, LU, IR, LL]
	].reverse(),
	"LEVEL": [
	     cc.p(0,0),
	     cc.p(0,3),
	     cc.p(1,6),
	     cc.p(1,2),
	     cc.p(3,0),
	     cc.p(3,5),
	     cc.p(5,6),
	     cc.p(6,4),
	     cc.p(5,2),
	     cc.p(6,0)
	],
	"COLOR": [
	    [cc.p(0,0)],
	    [cc.p(0,1),cc.p(0,2),cc.p(0,3)],
	    [cc.p(1,3),cc.p(1,4),cc.p(0,4),cc.p(0,5),cc.p(0,6),cc.p(1,6)],
	    [cc.p(1,5),cc.p(2,6),cc.p(2,5),cc.p(2,4),cc.p(2,3),cc.p(2,2),cc.p(1,2)],
	    [cc.p(1,1),cc.p(1,0),cc.p(2,0),cc.p(3,0)],
	    [cc.p(3,1),cc.p(3,2),cc.p(3,3),cc.p(3,4),cc.p(3,5)],
	    [cc.p(3,6),cc.p(4,6),cc.p(4,5),cc.p(4,4),cc.p(5,4),cc.p(5,5),cc.p(5,6)],
	    [cc.p(6,6),cc.p(6,5),cc.p(6,4)],
	    [cc.p(6,3),cc.p(6,2),cc.p(5,2)],
	    [cc.p(5,3),cc.p(4,3),cc.p(4,2),cc.p(4,1),cc.p(4,0),cc.p(5,1),cc.p(5,0),cc.p(6,1),cc.p(6,0)]
	]
}

var SMTH = window.SMTH || {};
SMTH.MAPS = MapSetting;

window.SMTH = SMTH;

})()