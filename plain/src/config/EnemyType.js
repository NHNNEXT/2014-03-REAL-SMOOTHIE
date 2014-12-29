var EnemyType = {
	"EMPTY": 6000,
	"CONY": 6001,
	"CONY_CARROT": 6002
}

var EnemyTypeInfo = {
	6001: {
		name: "cony",
		attr: [1,1,1,1,1],
		resourceName: res.cony
	},
	6002: {
		name: "cony",
		attr: [1,2,1,1,0.5], // 신쓴단매짠
		resourceName: res.cony_headsick,
	}
}