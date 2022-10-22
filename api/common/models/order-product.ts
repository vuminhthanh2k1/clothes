import { OrderProduct } from "../../codegen/api/fetch/api";
import { PersistedModelStatic } from "../helpers/loopback";

module.exports = function (OrderProduct: PersistedModelStatic<OrderProduct>) {

  (OrderProduct as any).getOrder = async function (ctx: any) {
    const Order = OrderProduct.app.models.Order;
    const data = ctx.req.query
    const userId = Number(data.user);
    const order = await Order.findOne({ where: { accountId: userId, status: 'Đang tạo đơn' } });
    if (order) {
      const orderProduct = await OrderProduct.find({ include: 'product', where: { orderId: order.id } })
      return orderProduct;
    }
    return;

  }



}