const RegularItem = require('./regular-item');

class BackstagePassItem extends RegularItem {
  #increaseQualityValue = 1;
  #qualityAdditionFromDays = new Map()
    // from 5 days increase quality by 3
    .set(5, 3)
    // from 10 days increase quality by 2
    .set(10, 2);

  #qualityAfterSellInDateValue = 0;

  constructor(item) {
    super(item);
  }
  
  get qualityAddition() {
    for (const [day, addition] of this.#qualityAdditionFromDays) {
      if (this.sellIn <= day) {
        return addition;
      }
    }

    return this.#increaseQualityValue;
  }

  updateQuality() {
    if (this.sellInDateHasPassed) {
      this.quality = this.#qualityAfterSellInDateValue;
      return;
    }

    this.quality += this.qualityAddition;
  }
}

module.exports = BackstagePassItem;
