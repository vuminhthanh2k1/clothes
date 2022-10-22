import { CategoryProductInterface } from "./category-product.interface";

export interface ProductInterface {
  id: number,
  title: string,
  price: number,
  origin: string,
  color: string,
  content: string,
  photoURL: string,
  categoryProduct: CategoryProductInterface
}