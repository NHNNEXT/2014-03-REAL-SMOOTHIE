var Ajax = cc.Class.extend({
	_ajaxInstance : null,
	_request : null,
	
	ctor:function(){
		//this._super();	
	},
	
	init:function () {
		this._request= cc.loader.getXMLHttpRequest();
		return true;
	},
	
	_responseData : function(request, callback) {
		if (request.readyState == 4 && (request.status >= 200 && request.status <= 207)) {			
			// responseText의 마지막에 포함된 개행문자 제거
			// var httpStatus = request.statusText;
			var response = request.responseText;
			callback(response);
		}
	},
	
	_error : function(evt, request, failure, error) {
		// failure
		if (evt.detail !== undefined) {
			failure(evt.detail);
			return;
		}

		// error
		var responseText = removeNewLine(request.responseText);
		var responseObj = JSON.parse(request.responseText);
		error(responseObj);
	},
	
	// success
	_load : function (evt, request, success) {
		var targetEl = evt.target;
		if (request.status == 200) {
			var responseObj = JSON.parse(request.responseText);
		} else {
			cc.log("ajax 응답 에러");
		}
	},

	_exec : function (config) {
		var method = config.method,
		headerObj = config.headers || null,
		url = config.url,
		callback = config.callback;
		data = config.data || null;
		
		if (url == undefined) {
			return;
		}

		// 직접 요청객체 만들기 
		// var request = _createRequest();
		var request = cc.loader.getXMLHttpRequest();
		
		if (request == undefined) {
			cc.log("Unable to create request");
			return;
		}

		request.open(method, url, true);
		////////  success, failure로 변경 완료시 삭제 필요함.  /////////
		if (callback !== undefined) {
			request.onreadystatechange = function () {
				this._responseData(request, callback);
			}.bind(this);
			/*
			request.addEventListener("readystatechange", function (e) {
				_responseData(e, request, callback);
			}, false);
			*/
		}
		/////////////////////////////////////////////////////////

		if (headerObj !== undefined) {
			for (var header in headerObj) {
				var content = headerObj[header];
				request.setRequestHeader(header, content);
			}
		}

		// send
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
		if (this._ajaxInstance.init()) {
			return this._ajaxInstance;
		}
	} else {
		return this._ajaxInstance;
	}
	return null;
};