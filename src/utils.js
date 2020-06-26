const AgedBrieItem = require('./items/aged-brie-item');
const SulfurasItem = require('./items/sulfuras-item');
const BackstagePassItem = require('./items/backstage-pass-item');
const RegularItem = require('./items/regular-item');
const ConjuredItem = require('./items/conjured-item');

const nameConstructorPairs = new Map()
  // when name includes 'Aged Brie' return the AgedBrieItem ctor
  .set('Aged Brie', AgedBrieItem)
  // when name includes 'Sulfuras' return the SulfurasItem ctor
  .set('Sulfuras', SulfurasItem)
  // when name ...
  .set('Backstage passes', BackstagePassItem)
  .set('Conjured', ConjuredItem);

function getItemConstructor(item) {
  for (const [name, ctor] of nameConstructorPairs) {
    if (item.name.toLowerCase().includes(name.toLowerCase())) {
      return new ctor(item);
    }
  }

  return new RegularItem(item);
}

module.exports = getItemConstructor;
