var SAVE = {
	"FRIENDS": {
		"BROWN": {
			"type":5001,
			"item":"none",
			"cups": [1,0,0,0] // cup-level 정보만 보유 
		},
		"CONY": {
			"type":5001,
			"item":"none",
			"cups": [1,0,0,0]
		},
	},
	"ATTACK_ORDER": ["BROWN", "CONY"],
	"LAST_CLEAR": 0
}

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};