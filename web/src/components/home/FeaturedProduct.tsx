// const access_token = localStorage.getItem("token");
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "../../helper/request.helper";
import { ProductInterface } from "../../models/product.interface";
import { Routes } from "../../routes";
export default function FeaturedProduct() {
  const [products, setProducts] = useState({
    total: 0,
    data: [],
  });
  const history = useHistory();
  useEffect(() => {
    request({
      method: "GET",
      url: "Products",
      params: {
        filter: {
          order: "price ASC",
          limit: 4,
        },
      },
    }).then((result) => setProducts(result.data));
  }, []);
  const currencyFormat = (num: any) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  let routerProductDetail = (productItem: ProductInterface) => {
    history.push({
      pathname: Routes.ShopDetails.path,
      state: productItem?.id,
    });
  };
  return (
    <>
      <div className="small-container">
        <h2 className="title">Sản phẩm bán chạy nhất</h2>
        <div className="row">
          {products.data.map((el: ProductInterface, index: number) => {
            return (
              <div
                className="col-4"
                onClick={() => routerProductDetail(el)}
                key={index}
              >
                <div>
                  <img src={el.photoURL} alt="" />
                </div>
                <h4 className="name-product">{el.title}</h4>
                <p>{currencyFormat(el.price)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
