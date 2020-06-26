const RegularItem = require('./regular-item');

class ConjuredItem extends RegularItem {
  #qualityDegradeMultiplier = 2;

  constructor(item) {
    super(item);
  }

  updateQuality() {
    for (let index = 0; index < this.#qualityDegradeMultiplier; index++) {
      super.updateQuality();
    }
  }
}

module.exports = ConjuredItem;
