var CupLevel = [
    // Level 0
    {
    	"capacity": 0,
    	"image": res.no_cup
    },{
    	"capacity": 150,
    	"image": res.papercup_small
    },{
    	"capacity": 200,
    	"image": res.papercup_big
    }

];

var MotorLevel = [
    // Level 0
	{
		"amount": 100
	}
];
var CutterLevel = [
	// Level 0
	{
	   "fineness": 1
	}
];

var MixerLevel = {
		"CUP": CupLevel,
		"MOTOR": MotorLevel,
		"CUTTER": CutterLevel
}