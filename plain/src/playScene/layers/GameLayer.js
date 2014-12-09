var GameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this.controller = new GameController();
		//localStorage Test
		//로컬스토리지를 SMTH.CONTAINER.LOCALSTORAGE 전역으로 설정한다.
		SMTH.CONTAINER.LOCALSTORAGE = cc.sys.localStorage;
		//로컬스토리지에 해당키에 값이 지는지 없는지 확인
		if(SMTH.CONTAINER.LOCALSTORAGE.getItem("test")) {
			//해당키의 자료가 로컬스토리지에 있으면, 값을 증가시킨다.
			var test = SMTH.CONTAINER.LOCALSTORAGE.getItem("test");
			test++;
			SMTH.CONTAINER.LOCALSTORAGE.setItem("test", test);
		} else {
			//해당키의 자료가 로컬스토리지에 없으면 초기화 시킨다.
			SMTH.CONTAINER.LOCALSTORAGE.setItem("test", 0);
		}
		cc.log("local:" + SMTH.CONTAINER.LOCALSTORAGE.getItem("test"));
		this.addChild(new BoardLayer());
		this.addChild(new StatusLayer());
		
	}

});
