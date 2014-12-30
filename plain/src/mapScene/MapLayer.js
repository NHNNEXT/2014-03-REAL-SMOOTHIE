var MapLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.init();
		var winSize = cc.director.getWinSize()
		this.setPosition((winSize.width - 7 * BLOCK.SIZE.WIDTH)/2, (winSize.height - 7 * BLOCK.SIZE.HEIGHT)/2);
		
		this.preopenCleared();
		this.openNewStage();
	}, 
	init: function() {
		this.pipes = [];
		for (var r in SMTH.MAPS.MAP) {
			var row = SMTH.MAPS.MAP[r];
			for (var c in row) {
				var pipeType = row[c];
				var pipe = new MapPipe(pipeType);
				pipe.setPositionByRowCol(r,c);
				// 랜덤으로 방향 뒤섞기
				pipe.setRotation(Math.floor(Math.random()*4)*90);
				this.pipes.push(pipe);
				this.addChild(pipe);
			}
		}

		for (var level in SMTH.MAPS.LEVEL) {
			var p = SMTH.MAPS.LEVEL[level];
			var idx = 7 * p.x + p.y;
			var levelPipe = this.pipes[idx];
			
			
		}
		
	},
	preopenCleared: function() {
		var cleared = SAVE.LAST_CLEAR;
		cc.log("PREOPEN: "+cleared);
		for (var l = 0; l < cleared; l++) {
			var blockList = SMTH.MAPS.COLOR[l];
			for (var i in blockList) {
				var blockPos = blockList[i];
				var r = blockPos.x;
				var c = blockPos.y;
				var pipeType = SMTH.MAPS.MAP[r][c];
				var angle = pipeType % 1000;
				var idx = parseInt(r * 7) + parseInt(c);
				var pipe = this.pipes[idx];
				pipe.rotation = angle;
				pipe.setColor(cc.color(245,235,56))
			}
			// 레벨 공개
			var levelPipePos = blockList[blockList.length-1];
			var levelPipe = this.pipes[levelPipePos.x * 7 + levelPipePos.y];
			
			var levelCircle = new cc.Sprite(res.levelCircle_png);
			levelCircle.x = levelPipe.x;
			levelCircle.y = levelPipe.y;
			levelCircle.scale = 0.4;
			this.addChild(levelCircle);
			
			var stageLabel = new cc.LabelTTF();
			stageLabel.setFontName(res.LINEBold_ttf);
			stageLabel.setFontSize(50);
			stageLabel.setColor( cc.color(0,0,0));
			stageLabel.setString(parseInt(l)+1);
			stageLabel.x = levelPipe.x;
			stageLabel.y = levelPipe.y;
			this.addChild(stageLabel);
			
			pipe.setListener(l);
		}
		
	},
	openNewStage: function() {
		var clear = SAVE.LAST_CLEAR;
		var routeIdx = 0;
		var blockList = SMTH.MAPS.COLOR[clear];
		for (var i in blockList) {
			var blockPos = blockList[i];
			var r = blockPos.x;
			var c = blockPos.y;
			var pipeType = SMTH.MAPS.MAP[r][c];
			var angle = pipeType % 1000;
			var idx = parseInt(r * 7) + parseInt(c);
			var pipe = this.pipes[idx];
			var time = Math.abs(pipe.rotation - angle) / 120
			pipe.runAction(cc.sequence(
					cc.delayTime(routeIdx * 0.1), 
					cc.rotateTo(0.5, angle), 
					cc.callFunc(function(pipe) {
						pipe.setColor(cc.color(245,235,56))
					}.bind(this, pipe))
			));
			routeIdx++;
		}
		
		// 레벨 공개
		var levelPipePos = blockList[blockList.length-1];
		var levelPipe = this.pipes[levelPipePos.x * 7 + levelPipePos.y];
		
		var levelCircle = new cc.Sprite(res.levelCircle_png);
		levelCircle.x = levelPipe.x;
		levelCircle.y = levelPipe.y;
		levelCircle.scale = 0.4;
		levelCircle.setOpacity(0);
		this.addChild(levelCircle);

		var stageLabel = new cc.LabelTTF();
		stageLabel.setFontName(res.LINEBold_ttf);
		stageLabel.setFontSize(50);
		stageLabel.setColor( cc.color(0,0,0));
		stageLabel.setString(parseInt(clear)+1);
		stageLabel.x = levelPipe.x;
		stageLabel.y = levelPipe.y;
		stageLabel.setOpacity(0);
		this.addChild(stageLabel);
		
		levelCircle.runAction(cc.sequence(
				cc.delayTime(routeIdx * 0.1 + 0.25),
				cc.fadeIn(0.5)
		));
		stageLabel.runAction(cc.sequence(
				cc.delayTime(routeIdx * 0.1 + 0.25),
				cc.fadeIn(0.5)
		));
		pipe.setListener(clear);
	}
});