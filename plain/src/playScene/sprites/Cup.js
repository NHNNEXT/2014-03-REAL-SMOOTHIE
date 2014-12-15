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
	resetColor: function() {
		var fillPercent = 0;
		if (this.content !== null) {
			fillPercent = this.content.amount / this.capacity;
		}
		
		if (fillPercent > 0) {
			if (fillPercent >= 0.95) {
				this.setColor(cc.color(255,100,100));
			} else {
				this.setColor(cc.color(255,190,100));
			}
		} else {
			this.setColor(cc.color(255,255,255));
		}
	},
	addSmoothie: function(smoothie) {
		if (this.capacity == 0) return smoothie.amount;
		
		// 빈 컴일 경우
		if (this.content == null) {
			this.content = smoothie;
		} else {
			this.content.mix(smoothie);
		}
		
		this.resetColor();
		
		if (this.content.amount > this.capacity) {
			this.content.amount = this.capacity;
			// 더하고 남은 양 반환
			return this.content.amount - this.capacity;
		}
		return 0;
	}
	
});