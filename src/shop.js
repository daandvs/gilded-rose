const getItemConstructor = require('./utils');

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      const newItem = getItemConstructor(item);
      newItem.passDay();

      item.sellIn = newItem.sellIn;
      item.quality = newItem.quality;
    });

    return this.items;
  }
}

module.exports = Shop;
