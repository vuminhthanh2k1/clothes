// const access_token = localStorage.getItem("token");
import { useEffect, useState } from "react";
import Category1 from "../../assets/images/category-1.jpg";
import Category2 from "../../assets/images/category-2.jpg";
import Category3 from "../../assets/images/category-3.jpg";
import { request } from "../../helper/request.helper";
import { CategoryProductInterface } from "../../models/category-product.interface";
export default function Category() {
  const [categories, setCategories] = useState({
    total: 0,
    data: [],
  });
  useEffect(() => {
    request({
      method: "GET",
      url: "CategoryProducts",
      params: {
        filter: {
          limit: 3,
        },
      },
    }).then((result) => {
      setCategories(result.data);
    });
  }, []);
  return (
    <>
      <div className="categories">
        <div className="small-container">
          <div className="row flex justify-between">
            {categories.data.map(
              (item: CategoryProductInterface, index: number) => {
                return (
                  <div className="col-3">
                    <img src={item.photoURL} />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
