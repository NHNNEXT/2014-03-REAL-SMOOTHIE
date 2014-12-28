var FacebookModule = cc.Class.extend({
	ctor: function() {
		this.fb = plugin.FacebookAgent.getInstance();
		this.init();
	},
	init: function() {
		if(this.fb._isLoggedIn === false && SMTH.CONTAINER.LOCALSTORAGE) { 
			SMTH.CONTAINER.LOCALSTORAGE.removeItem("facebookInfo");
		}
	},
	getProfilePicUrl: function() {
		if(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")) {
			var pic_url = JSON.parse(SMTH.CONTAINER.LOCALSTORAGE.getItem("facebookInfo")).picture;
			return pic_url;	
		} else return null;
	},
	logout: function(callback) {
		this.fb.logout(function(code){
		    if(code == plugin.FacebookAgent.CODE_SUCCEED){ //logout succeed
				callback();
		    } else {
		        cc.log("Logout failed, error #" + code + ": " + response);
		    }
		}.bind(this));
	},
	login: function(callback) {
		this.fb.login([], function(code, response){
		    if(code == plugin.FacebookAgent.CODE_SUCCEED){
				this.fb.api("/me?fields=id,name,picture", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
				    if (type == plugin.FacebookAgent.CODE_SUCCEED) {
				        var facebookInfo = {
					        name: response.name,
					        id: response.id,
					        picture: response.picture.data.url
				        };
						callback(facebookInfo);
				    } else {
				        cc.log("Graph API request failed, error #" + code + ": " + response);
				    }
				});					        
		    } else {
		        cc.log("Login failed, error #" + code + ": " + response);
		    }
		}.bind(this));
	}
});

SMTH.FB = new FacebookModule();