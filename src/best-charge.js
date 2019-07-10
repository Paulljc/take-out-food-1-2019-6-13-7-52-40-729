function bestCharge(selectedItems) {

  //定义用到的变量
  let totalPrice = 0;
  let orderDiscount1 = 0;
  let orderDiscount2 = 0;
  const halfPriceFood = [];
  let allHalfPriceFood = [];
  const FoodInfos = [];

  //获取所有菜品及优惠数据
  const allFood = loadAllItems();
  const allPromotions = loadPromotions();

  //获取所有半价菜品数据
  allHalfPriceFood = allPromotions.filter((value) => {
    if(value.type = '指定菜品半价'){
      return value.items
    }
  })

  //处理输入的菜品数据
  selectedItems.map((value) => {
    let items = value.split("x");
    allFood.forEach(elem => {
      if(elem.id == items[0].trim()){
        console.log(allHalfPriceFood)
        FoodInfos.push({
          name: elem.name,
          price: elem.price,
          count: items[1].trim(),
          isHalfPriceFood: allHalfPriceFood[0].items.includes((items[0].trim()))
        })
      }
    });
  })
  console.log(FoodInfos)

  let receipt = `============= 订餐明细 =============\n`
  
  //计算总价并统计优惠方案1
  FoodInfos.forEach((value) => {
    let oneFoodPrice = value.price * value.count;
    totalPrice += oneFoodPrice;
    receipt += `${value.name} x ${value.count} = ${parseInt(oneFoodPrice)}元\n`

    //判断是否为半价菜品并计算折扣
    if(value.isHalfPriceFood){
      halfPriceFood.push(value.name);
      orderDiscount1 += value.price / 2;
    }
  })

  //计算优惠方案2并比较
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
