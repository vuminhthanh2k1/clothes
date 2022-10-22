import { OrderInterface } from "./order.interface";
import { ProductInterface } from "./product.interface";

export interface OrderProductInterface {
  id: number,
  price: number,
  amount: number,
  product: ProductInterface,
  order: OrderInterface,
  orderId: number
}