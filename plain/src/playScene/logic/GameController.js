var GameController = cc.Class.extend({
	ctor: function() {
		this.init();
		this.initListener();
	},
	init: function() {
		SMTH.CONTAINER.TURN = 0;
	},
	initListener: function() {
		SMTH.EVENT_MANAGER.listen("gameStart", function(e){
			this.currentScene = cc.director.getRunningScene();
			this.routeController = new RouteController();
			this.boardController = new BoardController();
			// 시작하면 색칠해주기
			this.routeController.updateRoute();
		}.bind(this));

		SMTH.EVENT_MANAGER.listen("turnEnd", function(e) {
			var GAME_STATE = SMTH.CONST.GAME_STATE;
			this.routeController.updateRoute();

			// 이미 종료 판단이 내려진 경우
			if (SMTH.STATUS.GAME_STATE != GAME_STATE.NOT_END) {
				return;
			}

			var status = Judge.checkGameEnd();
			SMTH.STATUS.GAME_STATE = status;
			if (status == GAME_STATE.GAME_OVER) {
				this.currentScene.addChild(new GameOverLayer());
				cc.log("OVER");
			} else if (status == GAME_STATE.GAME_CLEAR) {
				this.currentScene.addChild(new GameClearLayer());
				cc.log("CLEAR");
			}
		}.bind(this));
		
		// 믹서기가 눌렸을 때 실행될 로직
		SMTH.EVENT_MANAGER.listen("mix", function(e) {
			for (var i in SMTH.CONTAINER.PIPES) {
				var block = SMTH.CONTAINER.PIPES[i];
				if (block.type == BLOCK.TYPE.FRIEND) {
					// TODO: MotorLevel 채워넣어야 함
					// TODO: CutterLevel 채워넣어야 함
					var amount = MotorLevel[0].generateAmount;
					var fineness = CutterLevel[0].fineness;
					var smoothie = new Smoothie(block.item, amount, fineness);
					block.addSmoothie(smoothie);
				}
			}
			SMTH.EVENT_MANAGER.notice("turnEnd");
		});
	}
});