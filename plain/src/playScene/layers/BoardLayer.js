
var BoardLayer = cc.Layer.extend ({

	ctor:function () {
		this._super();
		this.init();
	},

	init: function() {
		this._level = SMTH.STATUS.CURRENT_LEVEL;
		SMTH.STATUS.GAME_STATE = SMTH.CONST.GAME_STATE.NOT_END;

		//SMTH.CONTAINER안에 pipe를 초기화
		SMTH.CONTAINER.PIPES =[];

		var row = this._level.row;
		var col = this._level.col;
		var winSize = cc.director.getWinSize()
                                  
		this._createMap(row, col);
		this.setPosition((winSize.width - col * BLOCK.SIZE.WIDTH)/2, (winSize.height - row * BLOCK.SIZE.HEIGHT)/2);
                                  
        cc.audioEngine.setMusicVolume(0.7);
        cc.audioEngine.playMusic(res.GamePlayBGM_mp3, true);
                                  
        SMTH.EVENT_MANAGER.notice("gameStart");
	},

	_createMap : function(row, col) { 
		var map = this._level.MAP;
		var levelLoader = new LevelLoader(this._level);
		for (var r = 0; r < row; r++) {
			for (var c = 0; c < col; c++) {
				var block = SMTH.CONTAINER.PIPES[r*col+c]; // 좌표에 레퍼런스 할당.
				this.addChild(block); // 화면에 배치 
			}
		}
	},
	replaceBlock: function(block) {
		var row = Number(block.row);
		var col = Number(block.col);
		var levelCol = this._level.col;
		
		this.removeChild(block);
		var replacement;
		if(block.isEnemy() && block.treasure) {
			replacement = new Treasure(1);
			replacement.setPositionByRowCol(row, col);
			this.addChild(replacement);
			SMTH.CONTAINER.PIPES[row*levelCol+col] = replacement;
		} else {
//			replacement = new Pipe(BLOCK.TYPE.PIPE.RAND.P);
		}
	},
	fallBlock: function(){
		//this._fallOneStep();
		this._printBlockSnapshot();
	},
	_fallOneStep: function() {
		// 한칸만 이동하도록 한다.
		var pipes = SMTH.CONTAINER.PIPES;
		for(var i in pipes) {
			if(pipes[i].isRotten) {
				// 위의 블록이 isRotten(null블록) 이거나 out of board 라면 재귀 종료
				var block =  this._getBlockWithRowAndColumn(pipes[i].row,pipes[i].col);				
			}
		}		
	},
	_getBlockWithRowAndColumn: function(row,col) {
		var pipes = SMTH.CONTAINER.PIPES;
		var introw = parseInt(row);
		var intcol = parseInt(col);
		var index = introw*(this._level.col) + intcol;
		return pipes[index];
	},
	_printBlockSnapshot: function() {
		var pipes = SMTH.CONTAINER.PIPES;
		var result ="";
		var resultArr =[];
		for(var i in pipes) {
			var type = pipes[i].type;
			//cc.log(JSON.stringify(type));
			if(type === 5000) result+="♥";	
			else if(type === 6000) result+="♣";
			else if(type === PIPE_TYPE) {
				var pipeTypeCode= pipes[i].pipeType;
				var pipeKind = Math.floor(pipeTypeCode/1000);
				var pipeDirection = pipeTypeCode%1000;
				if(pipeKind === 0) result+="P";	
				if(pipeKind === 1) result+="L";	
				if(pipeKind === 2) {
					if(pipeDirection===90 ||pipeDirection===270) result+="ㅡ";
					else result+="I";
				}
				if(pipeKind === 3) result+="X";
				if(pipeKind === 4) result+="T";	
			}
			if(i != 0 && i%this._level.col-1 ===0) {
				//result+="\n";
				resultArr.push(result);
				result="";
			}
		}
		resultArr.reverse();
		cc.log("\n"+resultArr.join("\n"));
	}
});
