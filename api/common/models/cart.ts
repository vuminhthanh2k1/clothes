import { Cart, CartClothes, Clothes } from "../../codegen/api/fetch/api";
import {
  vnp_HashSecret,
  vnp_TmnCode,
  vnp_Url,
  web_Url,
} from "../helpers/constants";
import { knex } from "../helpers/knex";
import { PersistedModelStatic } from "../helpers/loopback";
import { executeNativeSql } from "../helpers/native-sql";

module.exports = function (Cart: PersistedModelStatic<Cart>) {
  (Cart as any).addToCart = async function (ctx: any) {
    const CartClothes = Cart.app.models.CartClothes;
    const clothes = JSON.parse(ctx.req.query.product);
    const userId = clothes.userId;
    const cart = await Cart.findOne({
      where: { accountId: userId, status: "Đang tạo đơn" },
    });
    if (cart) {
      const cartClothes = await CartClothes.find({
        where: { cartId: cart.id, clothesId: clothes.clothesId },
      });
      if (cartClothes.length > 0) {
        return "Sản phẩm này đã có trong giỏ hàng";
      } else {
        const cartClothesCreate = await CartClothes.create({
          clothesId: clothes.productId,
          amount: 1,
          price: clothes.price,
          cartId: cart.id,
        });
        cartClothesCreate.save();
        return "Sản phẩm sẽ được thêm vào giỏ hàng";
      }
    } else {
      const cartCreate = await Cart.create({
        accountId: userId,
        status: "Đang tạo đơn",
      });
      cartCreate.save();
      const cartClothesCreate = await CartClothes.create({
        clothesId: clothes.productId,
        amount: 1,
        price: clothes.price,
        cartId: cartCreate.id,
      });
      cartClothesCreate.save();
      return "Sản phẩm sẽ được thêm vào giỏ hàng";
    }
  };

  Cart.afterRemote("find", async (ctx: any) => {
    try {
      const pg = knex("cart").count().toString();
      const data = await executeNativeSql(
        Cart.app.dataSources.postgres.connector,
        pg,
        []
      );
      if (data && data.length > 0) {
        ctx.result = {
          data: ctx.result,
          total: Number(data[0].count),
        };
      }
    } catch (error) {
      console.log(error);
    }
  });

  (Cart as any).statisticByAmount = async function (ctx: any) {
    const year = ctx.req.query.year;
    let dayOfFeburary = 0;
    if (year % 4 == 0) {
      dayOfFeburary = 29;
    } else {
      dayOfFeburary = 28;
    }
    let resp = [];
    let monthJanurary = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 0, 1) } },
          { createdAt: { lt: new Date(year, 0, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthFeburary = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 1, 1) } },
          { createdAt: { lt: new Date(year, 1, dayOfFeburary) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthMatch = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 2, 1) } },
          { createdAt: { lt: new Date(year, 2, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthApril = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 3, 1) } },
          { createdAt: { lt: new Date(year, 3, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthMay = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 4, 1) } },
          { createdAt: { lt: new Date(year, 4, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthJune = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 5, 1) } },
          { createdAt: { lt: new Date(year, 5, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthJuly = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 6, 1) } },
          { createdAt: { lt: new Date(year, 6, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthAugust = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 7, 1) } },
          { createdAt: { lt: new Date(year, 7, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthSeptember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 8, 1) } },
          { createdAt: { lt: new Date(year, 8, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthOctober = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 9, 1) } },
          { createdAt: { lt: new Date(year, 9, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthNovember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 10, 1) } },
          { createdAt: { lt: new Date(year, 10, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    });
    let monthDecember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 11, 1) } },
          { createdAt: { lt: new Date(year, 11, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    });

    resp = [
      {
        label: "Tháng 1",
        amount: monthJanurary.length,
      },
      {
        label: "Tháng 2",
        amount: monthFeburary.length,
      },
      {
        label: "Tháng 3",
        amount: monthMatch.length,
      },
      {
        label: "Tháng 4",
        amount: monthApril.length,
      },
      {
        label: "Tháng 5",
        amount: monthMay.length,
      },
      {
        label: "Tháng 6",
        amount: monthJune.length,
      },
      {
        label: "Tháng 7",
        amount: monthJuly.length,
      },
      {
        label: "Tháng 8",
        amount: monthAugust.length,
      },
      {
        label: "Tháng 9",
        amount: monthSeptember.length,
      },
      {
        label: "Tháng 10",
        amount: monthOctober.length,
      },
      {
        label: "Tháng 11",
        amount: monthNovember.length,
      },
      {
        label: "Tháng 12",
        amount: monthDecember.length,
      },
    ];
    return resp;
  };

  (Cart as any).statisticByRevenue = async function (ctx: any) {
    const year = ctx.req.query.year;
    let dayOfFeburary = 0;
    if (year % 4 == 0) {
      dayOfFeburary = 29;
    } else {
      dayOfFeburary = 28;
    }
    let resp = [];
    let monthJanurary = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 0, 1) } },
          { createdAt: { lt: new Date(year, 0, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthFeburary = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 1, 1) } },
          { createdAt: { lt: new Date(year, 1, dayOfFeburary) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthMatch = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 2, 1) } },
          { createdAt: { lt: new Date(year, 2, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthApril = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 3, 1) } },
          { createdAt: { lt: new Date(year, 3, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthMay = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 4, 1) } },
          { createdAt: { lt: new Date(year, 4, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthJune = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 5, 1) } },
          { createdAt: { lt: new Date(year, 5, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthJuly = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 6, 1) } },
          { createdAt: { lt: new Date(year, 6, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthAugust = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 7, 1) } },
          { createdAt: { lt: new Date(year, 7, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthSeptember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 8, 1) } },
          { createdAt: { lt: new Date(year, 8, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthOctober = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 9, 1) } },
          { createdAt: { lt: new Date(year, 9, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthNovember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 10, 1) } },
          { createdAt: { lt: new Date(year, 10, 30) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });
    let monthDecember = await Cart.find({
      where: {
        and: [
          { createdAt: { gt: new Date(year, 11, 1) } },
          { createdAt: { lt: new Date(year, 11, 31) } },
          {
            status: "Thành công",
          },
        ],
      },
    }).then((result) => {
      let total = 0;
      result.forEach((item: any) => (total += item.price.valueOf()));
      return total;
    });

    resp = [
      {
        label: "Tháng 1",
        revenue: monthJanurary,
      },
      {
        label: "Tháng 2",
        revenue: monthFeburary,
      },
      {
        label: "Tháng 3",
        revenue: monthMatch,
      },
      {
        label: "Tháng 4",
        revenue: monthApril,
      },
      {
        label: "Tháng 5",
        revenue: monthMay,
      },
      {
        label: "Tháng 6",
        revenue: monthJune,
      },
      {
        label: "Tháng 7",
        revenue: monthJuly,
      },
      {
        label: "Tháng 8",
        revenue: monthAugust,
      },
      {
        label: "Tháng 9",
        revenue: monthSeptember,
      },
      {
        label: "Tháng 10",
        revenue: monthOctober,
      },
      {
        label: "Tháng 11",
        revenue: monthNovember,
      },
      {
        label: "Tháng 12",
        revenue: monthDecember,
      },
    ];
    return resp;
  };

  (Cart as any).changeAmount = async function (ctx: any) {
    const cartId = ctx.req.query.cartId;
    console.log(cartId);
    
    const CartClothes = Cart.app.models.CartClothes;
    const Clothes = Cart.app.models.Clothes;
    const cart = await Cart.findOne({ where: { id: cartId } });
    if (cart) {
      const cartClothes: CartClothes[] = await CartClothes.find({
        where: { cartId: cart.id },
      });
      if (cartClothes && cartClothes.length > 0) {
        cartClothes.forEach(async (el) => {
          const clothes = await Clothes.findOne({
            where: { id: el.clothesId },
          });
          if (clothes.amount && el.amount) {
            const amount = clothes.amount - el.amount;
            clothes.amount = amount;
            return clothes.save();
          }
        });
      }
    }
  };
};
