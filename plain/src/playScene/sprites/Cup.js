var Cup = cc.Sprite.extend({
	ctor: function(level) {
		var resource = MixerLevel.CUP[level].image;
		this.capacity = MixerLevel.CUP[level].capacity;
		this._super(resource);
		this.init();
	},
	init: function() {
		this.content = null;
	},
	addSmoothie: function(smoothie) {
		// 빈 컴일 경우
		if (this.content == null) {
			this.content = smoothie;
		} else {
			this.content.mix(smoothie);
		}
		
		if (this.content.amount > this.capacity) {
			this.content.amount = this.capacity;
		}
	}
	
});