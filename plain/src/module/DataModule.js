var DataModule = cc.Class.extend({
	ctor: function() {
		if (!SMTH.CONTAINER.LOCALSTORAGE) {
			SMTH.CONTAINER.LOCALSTORAGE = cc.sys.localStorage;
		}
		this.local = SMTH.CONTAINER.LOCALSTORAGE;
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
				cc.log(response);
				callback();
			},
			// 업로드 중 에러가 발생했다면, 로컬스토리지에 업로드가 필요하다고 저장
			error: function(response) {
				cc.log("error");
				cc.log(response);
				SMTH.CONTAINER.LOCALSTORAGE.setItem("needUpload", "true");
				callback();
			}
		});
		
	},
	load: function(key, callback) {
		// 로컬이 더 최신인 경우 로컬에서 로드
		if (this.local.getItem("needUpload") == "true") {
			SMTH.LOAD_CACHE = JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem(key));
			callback();
			return;
		}
		
		Ajax.getInstance().GET({
			url: "http://125.209.194.223:8080/userInfo/"+key,
			// 인터넷이 연결되어있다면 서버에서 로딩
			callback: function(response) {
				cc.log("load Data");
				cc.log(response);
				var result = JSON.parse(response);
				SMTH.LOAD_CACHE = result["results"][0];
				callback();
			},
			// 아니라면 로컬스토리지에서 로딩
			error: function(response) {
				cc.log("error");
				cc.log(response);
				var result = JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem(key));
				SMTH.LOAD_CACHE = result;
				callback();
			}
		});
	}
});

SMTH.MODULE = SMTH.MODULE || {};
SMTH.MODULE.DATA = new DataModule();