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
		if (this.capacity == 0) return smoothie.amount;
		
		// 빈 컴일 경우
		if (this.content == null) {
			this.content = smoothie;
		} else {
			this.content.mix(smoothie);
		}
		
		// var fillPercent = this.content.amount / this.capacity;
		this.setColor(ItemType[smoothie.ingredient].color);
		
		if (this.content.amount > this.capacity) {
			this.content.amount = this.capacity;
			// 더하고 남은 양 반환
			return this.content.amount - this.capacity;
		}
		return 0;
	}
	
});