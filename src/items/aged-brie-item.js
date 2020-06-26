const RegularItem = require('./regular-item');

class AgedBrieItem extends RegularItem {
  #increaseQualityValue = 1;

  constructor(item) {
    super(item);
  }

  updateQuality() {
    if (this.sellInDateHasPassed) {
      this.quality += this.#increaseQualityValue * 2;
      return;
    }

    this.quality += this.#increaseQualityValue;
  }
}

module.exports = AgedBrieItem;
