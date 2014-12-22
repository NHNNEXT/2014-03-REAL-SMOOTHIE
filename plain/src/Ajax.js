var Ajax = cc.Class.extend({
	_ajaxInstance : null,
	
	ctor:function(){
		//this._super();	
	},
	
	_responseData : function(request, callback, error) {
		if (request.readyState == 4 && (request.status >= 200 && request.status <= 207)) {			
			var response = request.responseText;
			callback(response);
		} else {
			error(response);
		}
	},

	_exec : function (config) {
		var method = config.method,
		headerObj = config.headers || null,
		url = config.url,
		callback = config.callback;
		error = config.error;
		data = config.data || null;
		
		if (url == undefined) {
			cc.warn("undefined url");
			return;
		}
		
		var request = cc.loader.getXMLHttpRequest();
		if (request == undefined) {
			cc.warn("Unable to create request");
			return;
		}
		
		var request = cc.loader.getXMLHttpRequest();
		request.open(method, url, true);
		
		if (callback !== undefined) {
			request.onreadystatechange = function () {
				this._responseData(request, callback, error);
			}.bind(this);
		}

		request.send(data);
	},
	
	// 공개 메서드 선언	
	GET: function (config) {
		config.method = "GET";
		this._exec(config);
	},

	POST: function (config) {
		config.method = "POST";
		config.headers = {
				"Content-Type": "application/x-www-form-urlencoded"
		};
		this._exec(config);
	}
});


Ajax.getInstance = function () {
	if (!this._ajaxInstance) {
		this._ajaxInstance = new Ajax();
		return this._ajaxInstance;
	} else {
		return this._ajaxInstance;
	}
	return null;
};