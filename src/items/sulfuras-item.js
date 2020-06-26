const RegularItem = require('./regular-item');

class SulfurasItem extends RegularItem {
  constructor(item) {
    super(item);
  }

  updateSellIn() {
    return;
  }

  updateQuality() {
    return;
  }
}

module.exports = SulfurasItem;
