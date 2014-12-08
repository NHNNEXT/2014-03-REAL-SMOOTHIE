var Cup = cc.Sprite.extend({
	ctor: function(level) {
		this.cupLevel = level; 
		// TODO: cup config에서 레벨별 컵 디자인 가져오기 
		var resource = cup[level];
		this._super(resource);
		this.init();
	},
	init: function() {
		this.capacity = 150;
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