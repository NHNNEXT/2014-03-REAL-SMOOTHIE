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
	},
	save: function(key, data, callback) {
		if (typeof data == "object") {
			data = JSON.stringify(data);
		}
		// 기본적으로 로컬스토리지에 저장
		this.local.setItem(key, data);
		
		Ajax.getInstance().POST({
			url: "http://125.209.194.223:8080/userInfo/"+key,
			data: data,
			// 인터넷이 연결되어있다면 서버에도 저장
			callback: function(response) {
				SMTH.CONTAINER.LOCALSTORAGE.setItem("needUpload", "false"); 
				cc.log("save Data");
				if(callback)
					callback();
			},
			// 업로드 중 에러가 발생했다면, 로컬스토리지에 업로드가 필요하다고 저장
			error: function(response) {
				cc.log("error");
				SMTH.CONTAINER.LOCALSTORAGE.setItem("needUpload", "true");
				if(callback)
					callback();
			}
		});
		
	},
	load: function(key, callback) {
		// 로컬이 더 최신인 경우 로컬에서 로드
		if (this.local.getItem("needUpload") == "true") {
			var value = SMTH.CONTAINER.LOCALSTORAGE.getItem(key);
			callback(value);
			return;
		}
		
		Ajax.getInstance().GET({
			url: "http://125.209.194.223:8080/userInfo/"+key,
			// 인터넷이 연결되어있다면 서버에서 로딩
			callback: function(response) {
				cc.log("load Data");
				var result = JSON.parse(response);
				var value = result["results"][0];
				callback(value);
			},
			// 아니라면 로컬스토리지에서 로딩
			error: function(response) {
				cc.log("error");
				var value = SMTH.CONTAINER.LOCALSTORAGE.getItem(key);
				callback(value);
			}
		});
	}
});

SMTH.MODULE = SMTH.MODULE || {};
SMTH.MODULE.DATA = new DataModule();