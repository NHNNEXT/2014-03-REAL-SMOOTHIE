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

		// 회원가입이 되어 있는 상태라면 서버에 전체 이미지를 보내 저장한다.
		if(this.local.getItem("isLoggedIn")) {
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
		
		var data = JSON.stringify({
			"id": id,
			"name": name,
			"picture": picture,
		});
		
		Ajax.getInstance().POST({
			url: "http://125.209.194.223:8080/userInfo/"+userId,
			data: data,
			// 인터넷이 연결되어있다면 서버에도 저장
			callback: function(response) {
				this.local.setItem("needUpload", "false"); 
				cc.log("pushUserData Succeed");
				if(callback)
					callback();
			},
			// 업로드 중 에러가 발생했다면, 로컬스토리지에 업로드가 필요하다고 저장
			error: function(response) {
				cc.log("pushUserData Error");
				this.local.setItem("needUpload", "true");
				if(callback)
					callback();
			}
		});		
	},

	fetchUserData: function(param) {
		var userId = param.id;
		var callback = param.callback;

		Ajax.getInstance().GET({
			url: "http://125.209.194.223:8080/userInfo/"+userId,
			// 인터넷이 연결되어있다면 서버에서 로딩
			callback: function(response) {
				cc.log("fetchUserData Succeed");
				var result = JSON.parse(response);
				var value = result["results"][0];
				callback(value);
			},
			// 아니라면 로컬스토리지에서 로딩
			error: function(response) {
				cc.log("fetchUserData Error");
			}
		});		
	},

});

SMTH.DATA = new DataModule();
