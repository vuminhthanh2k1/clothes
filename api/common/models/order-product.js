"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (OrderProduct) {
    OrderProduct.getOrder = async function (ctx) {
        const Order = OrderProduct.app.models.Order;
        const data = ctx.req.query;
        const userId = Number(data.user);
        const order = await Order.findOne({ where: { accountId: userId, status: 'Đang tạo đơn' } });
        if (order) {
            const orderProduct = await OrderProduct.find({ include: 'product', where: { orderId: order.id } });
            return orderProduct;
        }
        return;
    };
};
//# sourceMappingURL=order-product.js.map