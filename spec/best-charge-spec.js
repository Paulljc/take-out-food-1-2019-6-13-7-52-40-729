const bestCharge = require('../src/best-charge')
const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge.bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should get all half price food by all promotions', function() {
    let inputs = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let summary = bestCharge.getAllHalfPriceFood(inputs);
    let expected = [{type: '指定菜品半价', items: ['ITEM0001', 'ITEM0022']}]
    expect(summary).toEqual(expected)
  });

  it('should get food Infomation by selected items', function() {
    let inputs = ["ITEM0013 x 4"];
    let foodInfos = [];
    let allHalfPriceFood = [{type: '指定菜品半价', items: ['ITEM0001', 'ITEM0022']}];
    const allFood = loadAllItems.loadAllItems();
    bestCharge.getFoodInfos(inputs, foodInfos, allFood, allHalfPriceFood)
    let expected = [{
      name: '肉夹馍',
      price: 6.00,
      count: '4',
      isHalfPriceFood: false
    }];
    expect(foodInfos).toEqual(expected)
  });

  it('should create order by food infomation', function() {
    let inputs = [{
      name: '肉夹馍',
      price: 6.00,
      count: '4',
      isHalfPriceFood: false
    }];;
    let summary = bestCharge.createOrder(inputs).trim();    
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected);
  });
});