import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { request } from "../../helper/request.helper";
import { ProductInterface } from "../../models/product.interface";
import ItemProduct from "./ItemProduct";

export default function AllProduct() {
  const [sort, setSort] = useState("ASC");
  const [products, setProducts] = useState({
    total: 0,
    data: [],
  });
 
  const [activePage, setActivePage] = useState<number>(1);
  useEffect(() => {
    search();
  }, [sort,activePage]);
  const options = [
    {
      name: "Giá: Tăng dần",
      value: "ASC",
    },
    {
      name: "Giá: Giảm dần",
      value: "DESC",
    },
  ];

  const search = () => {
    request({
      method: "GET",
      url: "Products",
      params: {
        filter: {
          order: `price ${sort}`,
          skip: 8 * ((activePage || 1) - 1),
          limit: 8,
        },
      },
    })
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <div className="small-container" style={{ marginTop: "50px" }}>
        <div className="row row-2 px-10">
          <h2>Tất cả sản phẩm</h2>
          <select onChange={(e) => setSort(e.target.value)}>
            {options.map((el, index) => {
              return <option key={index} value={el.value}>{el.name}</option>;
            })}
          </select>
        </div>
        <div className="row">
          {products.data.map((el: ProductInterface, index: number) => {
            return <ItemProduct product={el} key={index} />;
          })}
        </div>
        <div id="pagination" className="clearfix mb-4">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flex items-center justify-center">
            <div className="wrapper-paginate">
              {products && (
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={8}
                  totalItemsCount={products.total}
                  pageRangeDisplayed={3}
                  onChange={(value) => setActivePage(value)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
