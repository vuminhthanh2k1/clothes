import { OrderInterface } from "./order.interface";
import { ProductInterface } from "./product.interface";

export interface OrderProductInterface {
  id: number,
  price: number,
  inputPrice: number,
  amount: number,
  clothes: ProductInterface,
  order: OrderInterface,
  orderId: number,
  cartId?: number,
  
}