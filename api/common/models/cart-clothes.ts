import { CartClothes } from "../../codegen/api/fetch/api";
import { PersistedModelStatic } from "../helpers/loopback";

module.exports = function (CartClothes: PersistedModelStatic<CartClothes>) {
  (CartClothes as any).getOrder = async function (ctx: any) {
    const Cart = CartClothes.app.models.Cart;
    const data = ctx.req.query;
    const userId = Number(data.user);
    const cart = await Cart.findOne({
      where: { accountId: userId, status: "Đang tạo đơn" },
    });
    if (cart) {
      const orderProduct = await CartClothes.find({
        include: "clothes",
        where: { cartId: cart.id },
      });
      return orderProduct;
    }
    return;
  };
};
