var MapLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.init();
		var winSize = cc.director.getWinSize()
		this.setPosition((winSize.width - 7 * BLOCK.SIZE.WIDTH)/2, (winSize.height - 7 * BLOCK.SIZE.HEIGHT)/2);
		
		this.autoCorrect();
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
			
			var stageLabel = new cc.LabelTTF();
			stageLabel.setFontName(res.LINEBold_ttf);
			stageLabel.setFontSize(50);
			stageLabel.setColor( cc.color(0,0,0));
			stageLabel.setString(parseInt(level)+1);
			stageLabel.x = levelPipe.x;
			stageLabel.y = levelPipe.y;
			this.addChild(stageLabel);
			
			// add TouchListener
			levelPipe.setListener(level);
		}
		
	},
	autoCorrect: function() {
		for (var r in SMTH.MAPS.MAP) {
			var row = SMTH.MAPS.MAP[r];
			for (var c in row) {
				var pipeType = row[c];
				var angle = pipeType % 1000;
				var idx = parseInt(r * 7) + parseInt(c);
				var pipe = this.pipes[idx];
				var time = Math.abs(pipe.rotation - angle) / 120
				pipe.runAction(cc.sequence(cc.delayTime(idx * 0.2), cc.rotateTo(time, angle)));
			}
		}
	}
});