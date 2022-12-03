import { useEffect, useState } from "react";
import { request } from "../../helper/request.helper";
import { ProductInterface } from "../../models/product.interface";
import ItemProduct from "./ItemProduct";

export default function RelatedProduct(data: any) {
  const { productId } = data;
  const [products, setProducts] = useState({
    total: 0,
    data: [],
  });
  useEffect(() => {
    request({
      method: "GET",
      url: "Products",
      params: {
        filter: {
          where: {
            id: {
              neq: productId,
            },
          },
        },
      },
    })
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  }, [productId]);
 
  return (
    <>
      <div className="small-container" style={{ marginTop: "50px" }}>
        <div className="row row-2 px-10">
          <h2>Sản phẩm liên quan</h2>
        </div>
        <div className="row">
          {products.data.map((el: ProductInterface, index: number) => {
            return <ItemProduct product={el} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
