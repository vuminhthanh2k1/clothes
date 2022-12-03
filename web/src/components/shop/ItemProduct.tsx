import { useHistory } from "react-router-dom";
import { ProductInterface } from "../../models/product.interface";
import { Routes } from "../../routes";

interface ItemProductProps {
  product: ProductInterface;
}
export default function ItemProduct(props: ItemProductProps) {
  const { product } = props;
  const currencyFormat = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const history = useHistory();
  let routerProductDetail = (productItem: ProductInterface) => {
    history.push({
      pathname: Routes.ShopDetails.path,
      state: productItem?.id,
    });
  };
  return (
    <>
      <div className="col-4" onClick={() => routerProductDetail(product)}>
        <div className="image-item">
          <img src={product.photoURL} />
        </div>
        <h4 className="name-product">{product.title}</h4>

        <p>{currencyFormat(product.price)}</p>
      </div>
    </>
  );
}
