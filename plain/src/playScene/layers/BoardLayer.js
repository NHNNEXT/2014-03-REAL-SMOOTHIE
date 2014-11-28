
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
//		SMTH.CONTAINER.PIPES[row*levelCol+col] = new NullBlock();

		var replacement = new NullBlock();
		if(block.isEnemy() && block.treasure) {
			replacement = new Treasure(1);
		} else if(block.isEnemy() && !block.treasure) {
			replacement = new Isolation(0);
		}
		// 블록의 화면 상의 위치를 세
		replacement.setPositionByRowCol(row, col);
		this.addChild(replacement);
		// 컨테이너 배열의 해당 인덱스에 참조를 저장
		SMTH.CONTAINER.PIPES[row*levelCol+col] = replacement;
	},/*
	clearCorpse: function() { // isRotten 인 블록을 null로 채운다.
		var pipes = SMTH.CONTAINER.PIPES;
		for(var i in pipes) {
			if(pipes[i].isRotten) {
				pipes[i] = null;			
			}
		}		
	},*/
	fallBlock: function(){
		while(this._fallOneStep()){
			this._printBlockSnapshot();
		};
		this._printBlockSnapshot();
	},
	_fallOneStep: function() {
		// 한칸만 이동하도록 한다.
		var pipes = SMTH.CONTAINER.PIPES;
		// blockSwaped
		var blockSwaped = false;
		
		for (var r = 0; r < this._level.row; r++) {
			for (var c = 0; c < this._level.col; c++) {
				var pipe = this._getBlockWithRowAndColumn(r,c);
				if(pipe.type === BLOCK.TYPE.NULL && pipe.fillBlockExecuted === undefined) {
					var blank = pipe;
					// 나의 위에 있는 블록에 이리온나 라고 호출한다.
					// 내 위치에 할당 
					if(this._fillBlock(r,c) !== 0){
						blockSwaped = true;
					}
				}
			}
		}
		
		for (var r = 0; r < this._level.row; r++) {
			for (var c = 0; c < this._level.col; c++) {
				var pipe = this._getBlockWithRowAndColumn(r,c);
				delete pipe.fillBlockExecuted;
			}
		}
		
		this._updateBlockPotisionRender();
		return blockSwaped;
	},
	_fillBlock: function(row, col) {
		// row가 맨 윗줄을 의미하면 새로운 파이프블록을 랜덤하게 생성해서 반환한다.
		if(row === this._level.row-1) {
			var newBlock = new Pipe(Pipe.getRandomPipeType(360));
			this.addChild(newBlock);
			return newBlock;
		}
		
		var block = this._getBlockWithRowAndColumn(row, col);
		// block에 방문 플래그를 단다.
		block.fillBlockExecuted = true;
		// 블록이 내려갈 수 있는 놈이면 반환 한다.
		if(block.type !== BLOCK.TYPE.NULL && !block.fixed) {
			return block;
		}
		
		var result = this._fillBlock(row+1, col); // result : 내려갈 수 있는 유효한 블록이 반환됨 or 블록이 올 예정이라면 "기다려" 값이옴 or 끝까지 갔는데 확보실패했다면 "기다리지마"
		if(result instanceof Block) {
			this._swapBlock(block, result);
			return 1;
		} else if (result > 0) {
			// 기다려
			return result + 1;
		}
		/*
		this._fillBlock(row+1, col-1);
		this._fillBlock(row+1, col+1);
		*/
		return 0;
	},
	_swapBlock: function(b1, b2) {
		// 두번째 블록이 보드 위에 있는 게 아니라 새로 생성된 블록이라면 r1, c1 에 넣고 원래있던 블록을 소멸시킨다.
		// 모델을 바꾸고
		//// 파이프의 row col 을 교환
		//// 컨테이너에서 r1, c1, r2, c2 에 저장된 참조를 교환
		var levelCol = this._level.col;
		if(b2.row === undefined && b2.col === undefined) {
			b2.row = b1.row;
			b2.col = b1.col;
			SMTH.CONTAINER.PIPES[b2.row*levelCol+b2.col] = b2;
		} else {
			var temp = cc.p(b2.row, b2.col);
			b2.row = b1.row;
			b2.col = b1.col;
			b1.row = temp.x;
			b1.col = temp.y;		
			SMTH.CONTAINER.PIPES[b1.row*levelCol+b1.col] = b1;
			SMTH.CONTAINER.PIPES[b2.row*levelCol+b2.col] = b2;
		}
	},
	_updateBlockPotisionRender: function() { // 모델의(컨테이너) 좌표에 맞게 화면 상의 블록 스프라이트 좌표들을 업데이트하기  
		var pipes = SMTH.CONTAINER.PIPES;
		for(var i in pipes) {
			var pipe = pipes[i];
			// TODO : 추후 애니메이션으로 바꿔야
			pipe.setPositionByRowCol(pipe.row, pipe.col);
		}
	},
	_isUpsideEmpty: function(index){
		var pipes = SMTH.CONTAINER.PIPES;
		var colSize = this._level.col;
		var rowSize = this._level.row;
		
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
			if(type === 0) result+="0";
			else if(type === 5000) result+="♥";	
			else if(type === 6000) result+="♣";
			else if(type === 7000) result+="ㅁ";
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
