"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (CartClothes) {
    CartClothes.getOrder = async function (ctx) {
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
//# sourceMappingURL=cart-clothes.js.map