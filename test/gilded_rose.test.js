const Shop = require('../src/shop');
const Item = require('../src/items/item');

function passDaysForShop(shop, days) {
  for (let day = 0; day < days; day++) {
    shop.updateQuality();
  }
}

describe('Gilded Rose', () => {
  describe('when dealing with regular items', () => {
    let shop;

    beforeEach(() => {
      shop = new Shop([
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Elixir of the Mongoose', 5, 7)
      ]);
    });

    it('should lower the sellIn value when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].sellIn).toBe(9);
      expect(shop.items[1].sellIn).toBe(4);
  
      passDaysForShop(shop, 3);
  
      expect(shop.items[0].sellIn).toBe(6);
      expect(shop.items[1].sellIn).toBe(1);
    });

    it('should lower the quality for each item when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].quality).toBe(19);
      expect(shop.items[1].quality).toBe(6);

      passDaysForShop(shop, 2);

      expect(shop.items[0].quality).toBe(17);
      expect(shop.items[1].quality).toBe(4);
    });

    it('should lower the quality twice as fast once the sell by date has passed', () => {
      passDaysForShop(shop, 6);

      expect(shop.items[1].quality).toBe(0);

      passDaysForShop(shop, 5);

      expect(shop.items[0].quality).toBe(8);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(6);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(4);
    });

    it('should not lower the quality of an item when it has reached 0', () => {
      passDaysForShop(shop, 20);

      expect(shop.items[0].quality).toBe(0);
      expect(shop.items[1].quality).toBe(0);
    });
  });

  describe('when dealing with Aged Brie', () => {
    let shop;

    beforeEach(() => {
      shop = new Shop([
        new Item('Aged Brie', 5, 0)
      ]);
    });

    it('should lower the sellIn value when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].sellIn).toBe(4);
  
      passDaysForShop(shop, 6);
  
      expect(shop.items[0].sellIn).toBe(-2);
    });

    it('should increase quality when a day has passed', () => {
      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(1);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(2);

      passDaysForShop(shop, 2);

      expect(shop.items[0].quality).toBe(4);
    });

    it('should increase quality twice as fast when the sellIn value has passed', () => {
      passDaysForShop(shop, 6);

      expect(shop.items[0].quality).toBe(7);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(9);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(11);
    });

    it('should not increase quality when it has reached 50', () => {
      passDaysForShop(shop, 100);

      expect(shop.items[0].quality).toBe(50);
    });
  });

  describe('when dealing with Sulfuras', () => {
    let shop;

    beforeEach(() => {
      shop = new Shop([
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Sulfuras, Hand of Ragnaros', -1, 80)
      ]);
    });

    it('should not lower the sellIn value when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].sellIn).toBe(0);
      expect(shop.items[1].sellIn).toBe(-1);

      passDaysForShop(shop, 20);
  
      expect(shop.items[0].sellIn).toBe(0);
      expect(shop.items[1].sellIn).toBe(-1);
    });

    it('should not decrease in quality when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].quality).toBe(80);
      expect(shop.items[1].quality).toBe(80);

      passDaysForShop(shop, 20);
  
      expect(shop.items[0].quality).toBe(80);
      expect(shop.items[1].quality).toBe(80);
    });
  });

  describe('when dealing with Backstage Passes', () => {
    let shop;

    beforeEach(() => {
      shop = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      ]);
    });

    it('should lower the sellIn value when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].sellIn).toBe(14);
      expect(shop.items[2].sellIn).toBe(9);
      expect(shop.items[4].sellIn).toBe(4);
  
      passDaysForShop(shop, 10);
  
      expect(shop.items[0].sellIn).toBe(4);
      expect(shop.items[2].sellIn).toBe(-1);
      expect(shop.items[4].sellIn).toBe(-6);
    });

    it('should increase quality as its sellIn value approaches', () => {
      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(21);
      
      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(22);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(23);
    });

    it('should increase quality by 2 when there are 10 days or less left', () => {
      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(27);

      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(29);

      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(31);

      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(33);
    });

    it('should increase quality by 3 when there are 5 days or less left', () => {
      passDaysForShop(shop, 1);

      expect(shop.items[3].quality).toBe(33);

      passDaysForShop(shop, 1);

      expect(shop.items[3].quality).toBe(36);

      passDaysForShop(shop, 1);

      expect(shop.items[3].quality).toBe(39);
    });

    it('should set quality to 0 when the sellIn value has passed', () => {
      passDaysForShop(shop, 20);

      expect(shop.items[0].quality).toBe(0);
      expect(shop.items[2].quality).toBe(0);
      expect(shop.items[4].quality).toBe(0);
    });

    it('should not increase quality when it has reached 50', () => {
      passDaysForShop(shop, 3);

      expect(shop.items[2].quality).toBe(50);
      expect(shop.items[4].quality).toBe(50);
    });
  });

  describe('when dealing with Conjured items', () => {
    let shop;

    beforeEach(() => {
      shop = new Shop([
        new Item("Conjured Mana Cake", 3, 6),
        new Item("Conjured Mana Cake", 2, 20)
      ]);
    });

    it('should lower the sellIn value when a day has passed', () => {
      passDaysForShop(shop, 1);
  
      expect(shop.items[0].sellIn).toBe(2);
  
      passDaysForShop(shop, 12);
  
      expect(shop.items[0].sellIn).toBe(-10);
    });

    it('should degrade in quality twice as fast as regular items', () => {
      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(4);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(2);

      passDaysForShop(shop, 1);

      expect(shop.items[0].quality).toBe(0);
    });

    it('should lower in quality twice as fast as regular items when the sell by date has passed', () => {
      passDaysForShop(shop, 3);

      expect(shop.items[1].quality).toBe(12);

      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(8);

      passDaysForShop(shop, 1);

      expect(shop.items[1].quality).toBe(4);
    });

    it('should not lower the quality when it has reached 0', () => {
      passDaysForShop(shop, 10);

      expect(shop.items[0].quality).toBe(0);
    });
  });
});
