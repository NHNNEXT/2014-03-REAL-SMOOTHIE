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
		this.attr = this.interpolateAttr(this.attr, other.attr, this.amount, other.amount);
		this.fineness = Math.min(this.fineness, other.fineness);
	},
	interpolateAttr: function(attr1, attr2, w1, w2) {
		var attr = [];
		for (var i = 0; i < attr1.length; i++) {
			attr.push((attr1[i] * w1 + attr2[i] * w2) / (w1 + w2));
		}
		return attr;
	}
});