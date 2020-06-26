class RegularItem {
  #sellIn;
  #quality;

  #decreaseSellInValue = 1;
  #decreaseQualityValue = 1;
  #lowestQualityLimit = 0;
  #highestQualityLimit = 50;

  constructor(item) {
    this.#sellIn = item.sellIn;
    this.#quality = item.quality;
  }

  set quality(value) {
    this.#quality = value;

    if (this.hasReachedLowestQuality) {
      this.#quality = this.#lowestQualityLimit;
    }

    if (this.hasReachedHighestQuality) {
      this.#quality = this.#highestQualityLimit;
    }
  }

  get quality() {
    return this.#quality;
  }

  set sellIn(value) {
    this.#sellIn = value;
  }

  get sellIn() {
    return this.#sellIn;
  }

  get sellInDateHasPassed() {
    return this.sellIn < 0;
  }

  get hasReachedLowestQuality() {
    return this.quality <= this.#lowestQualityLimit;
  }

  get hasReachedHighestQuality() {
    return this.quality >= this.#highestQualityLimit;
  }

  get decreaseQualityValue() {
    return this.#decreaseQualityValue;
  }

  updateSellIn() {
    this.sellIn -= this.#decreaseSellInValue;
  }

  updateQuality() {
    if (this.sellInDateHasPassed) {
      this.quality -= this.decreaseQualityValue * 2;
      return;
    }

    this.quality -= this.decreaseQualityValue;
  }

  passDay() {
    this.updateSellIn();
    this.updateQuality();
  }
}

module.exports = RegularItem;