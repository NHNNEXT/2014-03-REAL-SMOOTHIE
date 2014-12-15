var SelectorLayer = cc.LayerColor.extend({
	ctor:function () {
		this._super(cc.color(255, 255, 255, 220));
		this.init();
	},

	init: function() {
		// 캐릭터 선택창 설정
	},

	touchEvent: function(touch, event) {
		//선택에 따른 이벤트 발생 게임시작
	}
});