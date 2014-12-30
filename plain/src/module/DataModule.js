var DataModule = cc.Class.extend({
	ctor: function() {
		if (!SMTH.CONTAINER.LOCALSTORAGE) {
			SMTH.CONTAINER.LOCALSTORAGE = cc.sys.localStorage;
		}
		this.local = SMTH.CONTAINER.LOCALSTORAGE;
	},	
	isLoggedIn: function() { // true / false
		var loginStatus = this.local.getItem("isLoggedIn");
		return (loginStatus === "true")? true : false;
	},
	removeUserInfo: function() {
		this.save("name", undefined);
		this.save("id", undefined);
		this.save("picture", undefined);
		this.save("isLoggedIn", "false");	
	},
	updateUserInfo: function(facebookInfo) {
		this.save("name", facebookInfo.name);
		this.save("id", facebookInfo.id);
		this.save("picture", facebookInfo.picture);
		this.save("isLoggedIn", "true");
/*
		// 회원가입이 되어 있는 상태라면 서버에 전체 이미지를 보내 저장한다.
		if(this.local.getItem("isLoggedIn")) {
			this.pushUserData({
				id: this.local.getItem("id")
			});			
		}
*/
	},
	updateSavedGame: function() {
		// 저장된 게임정보를 Local Storage 에 저장한다.
		this.local.setItem("savedGame", JSON.stringify(SAVE));
		
		// 로그인 된 상태라면 서버에 pushUserData 를 통해 게임 데이터를 업데이트한다.
		if(this.local.getItem("isLoggedIn")) {
			cc.log("로그인 된 상태라, 서버에 pushUserData 를 통해 게임 데이터를 업데이트");
			this.pushUserData({
				id: this.local.getItem("id")
			});			
		}		
	},
	save: function(key, data) {
		var data_ = data;
		if (typeof data == "object") {
			data_ = JSON.stringify(data);
		}
		// 기본적으로 로컬스토리지에 저장

		this.local.setItem(key, data_);
	},
	load: function(key) {
		return this.local.getItem(key);
	},
	pushUserData: function(param) {
		var userId = param.id;
		var callback = param.callback;
		
		// 로컬 스토리지의 모든 자료를 시리얼 라이즈하기
		var id = this.local.getItem("id");
		var name = this.local.getItem("name");
		var picture = this.local.getItem("picture");
		var savedGame = this.local.getItem("savedGame");
		if(!savedGame) {
			this.local.setItem("savedGame", SAVE);
		}
		var savedGame = JSON.parse(this.local.getItem("savedGame"));
		
		var data = JSON.stringify({
			"id": id,
			"name": name,
			"picture": picture,
			"savedGame": savedGame
		});
		
		var requestURL =  "http://125.209.194.223:8080/userInfo/"+userId;
		cc.log("pushUserData : "+requestURL);
		
		Ajax.getInstance().POST({
			url: requestURL,
			data: data,
			// 인터넷이 연결되어있다면 서버에도 저장
			callback: function(response) {
				this.local.setItem("needUpload", "false"); 
				cc.log("pushUserData Succeed");
				if(callback)
					callback();
			}.bind(this),
			// 업로드 중 에러가 발생했다면, 로컬스토리지에 업로드가 필요하다고 저장
			error: function(response) {
				cc.log("pushUserData Error");
				this.local.setItem("needUpload", "true");
				if(callback)
					callback();
			}.bind(this)
		});		
	},

	fetchUserData: function(param) {
		var userId = param.id;
		var callback = param.callback;

		var requestURL =  "http://125.209.194.223:8080/userInfo/"+userId;
		cc.log("fetchUserData : "+requestURL);
		
		Ajax.getInstance().GET({
			url: requestURL,
			// 인터넷이 연결되어있다면 서버에서 로딩
			callback: function(response) {
				cc.log("fetchUserData Succeed");
				var result = JSON.parse(response);
				if(result["results"].length == 0) {
					// 서버에 사용자의 정보가 없다. 
					cc.log("But there is no such user.");
				} else {
					// 서버에 사용자의 정보가 있다. 
					var value = result["results"][0];
					cc.log("Fetched User Data: "+JSON.stringify(value));
					var data = JSON.parse(JSON.stringify(value));
					
					this.local.setItem("id", data.id);
					this.local.setItem("name", data.name);
					this.local.setItem("picture", data.picture);
					this.local.setItem("savedGame", JSON.stringify(data.savedGame));
					SAVE = JSON.parse(this.local.getItem("savedGame"));				
				}
				if(callback)
					callback();
			}.bind(this),
			// 아니라면 로컬스토리지에서 로딩
			error: function(response) {
				cc.log("fetchUserData Error");
			}
		});		
	},

});

SMTH.DATA = new DataModule();
