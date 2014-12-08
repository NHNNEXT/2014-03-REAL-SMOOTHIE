var Smoothie = cc.Class.extend({
	ctor: function(ingredient, amount, fineness) {
		this.ingredient = ingredient;
		this.attr = ItemType[ingredient].attr;
		this.amount = amount;
		this.fineness = fineness;
	},
	mix: function(other) {
		if (other.ingredient !== this.ingredient) {
			this.ingredient = "mixed";
		}
		this.amount += other.amount;
		// TODO: 양에 따라 적절히 섞기
		this.attr = ["보간해야 함"];
		this.fineness = 0;
	}
});