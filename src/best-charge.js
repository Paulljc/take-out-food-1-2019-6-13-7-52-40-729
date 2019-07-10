function bestCharge(selectedItems) {

  const foodInfos = [];

  //获取所有菜品及优惠数据
  const allFood = loadAllItems();
  const allPromotions = loadPromotions();

  //获取所有半价菜品数据
  let allHalfPriceFood = getAllHalfPriceFood(allPromotions);
  //获取输入的菜品数据
  getFoodInfos(selectedItems, foodInfos, allFood, allHalfPriceFood);
  //生成订单
  let order = createOrder(foodInfos)
  return order;
}

function getAllHalfPriceFood(allPromotions){
  let allHalfPriceFood = allPromotions.filter((value) => {
    if(value.type = '指定菜品半价'){
      return value.items
    }
  })
  return allHalfPriceFood;
}

function getFoodInfos(selectedItems, foodInfos, allFood, allHalfPriceFood){
  selectedItems.map((value) => {
    let items = value.split("x");
    allFood.forEach(elem => {
      if(elem.id == items[0].trim()){
        foodInfos.push({
          name: elem.name,
          price: elem.price,
          count: items[1].trim(),
          isHalfPriceFood: allHalfPriceFood[0].items.includes((items[0].trim()))
        })
      }
    });
  })
}

function createOrder(foodInfos){
  let totalPrice = 0;
  let orderDiscount1 = 0;
  let orderDiscount2 = 0;
  const halfPriceFood = [];

  let receipt = `============= 订餐明细 =============\n`

  foodInfos.forEach((value) => {
    let oneFoodPrice = value.price * value.count;
    totalPrice += oneFoodPrice;
    receipt += `${value.name} x ${value.count} = ${parseInt(oneFoodPrice)}元\n`

    if(value.isHalfPriceFood){
      halfPriceFood.push(value.name);
      orderDiscount1 += value.price / 2;
    }
  })

  if(totalPrice > 30){
    orderDiscount2 = 6;
    receipt += `-----------------------------------\n`;
    receipt += `使用优惠:\n`;
    if(orderDiscount1 >= orderDiscount2) {
      totalPrice -= orderDiscount1;
      receipt += `指定菜品半价(${halfPriceFood.join('，')})，省${orderDiscount1}元\n`;
    }else{
      totalPrice -= 6;
      receipt += `满30减6元，省6元\n`;
    }
  }else{
    if(orderDiscount1 != 0){
      totalPrice -= orderDiscount1;
      receipt += `-----------------------------------\n`;
      receipt += `使用优惠:\n`;
      receipt += `指定菜品半价(${halfPriceFood.join('，')})，省${orderDiscount1}元\n`;
    }
  }
  receipt += `-----------------------------------\n`;
  receipt += `总计：${parseInt(totalPrice)}元\n`;
  receipt += `===================================\n`;
  return receipt;
}