var SMTH = SMTH || {};

SMTH.CONTAINER = {
	PIPES: [],
	TURN: null
};

SMTH.STATUS = {
	"PLAY_STATE": null,
	"CURRENT_LEVEL": null
}

SMTH.CONST = {};

SMTH.CONST.PLAY_STATE = {
	"IDEAL": 0,
	"ROTATING": 1,
	"KILLING": 2
};

SMTH.EVENT_MANAGER = cc.eventManager;
SMTH.EFFECT_MANAGER = null;