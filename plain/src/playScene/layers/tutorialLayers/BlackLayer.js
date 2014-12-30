var BlackLayer = cc.LayerColor.extend({
	ctor: function() {
		this._super(cc.color(0,0,0,120));
		this.init();
	},
	init: function() {
		var winsize = cc.director.getWinSize();
		this.width = winsize.width;
		this.height = winsize.height;
	}	
});