import { CategoryProductInterface } from "./category-product.interface";

export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  origin: string;
  color: string;
  content: string;
  photoURL: string;
  size: string;
  type: string;
  amount: number;
  inputPrice: number;
  categoryProduct: CategoryProductInterface;
}
