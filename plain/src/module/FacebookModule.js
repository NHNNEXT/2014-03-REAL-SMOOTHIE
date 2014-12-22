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
	}
});

SMTH.FB = new FacebookModule();