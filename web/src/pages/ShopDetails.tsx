import {} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import RelatedProduct from "../components/shop/RelatedProduct";
import { apiUrl } from "../enviroments";
import { addToCart } from "../helper/addToCart";
// import ItemRelated from "../components/shop/ItemRelated";
import { ProductInterface } from "../models/product.interface";
import imageHero from "../assets/images/gallery-1.jpg";
import img1 from "../assets/images/gallery-1.jpg";
import img2 from "../assets/images/gallery-2.jpg";
import img3 from "../assets/images/gallery-3.jpg";
import img4 from "../assets/images/gallery-4.jpg";
import { request } from "../helper/request.helper";
// import '../style/blog.scss'

const access_token = localStorage.getItem("token");

export default function ShopDetails() {
  const localtion = useLocation();
  const productId = localtion.state;
  const [product, setProduct] = useState<ProductInterface>();
  const user = useSelector((state: any) => state.auth.data);
  useEffect(() => {
    request({
      method: "GET",
      url: `Products/${productId}`,
      params: {
        filter: {
          include: "categoryProduct",
        },
      },
    })
      .then((result) => setProduct(result.data))
      .catch((err) => console.log(err));
  }, [productId]);

  const currencyFormat = (num: any) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const { addToast } = useToasts();

  //   const searchProductsRelated = () => {
  //     axios({
  //       method: "GET",
  //       url: `${apiUrl}/Products`,
  //       params: {
  //         filter: {
  //           where: {
  //             id: { neq: productId },
  //             categoryProductId: product?.categoryProduct.id,
  //           },
  //           limit: 4,
  //         },
  //       },
  //     })
  //       .then((result) => {
  //         setRelated(result.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  const addCart = async (productParams: any) => {
    if (user) {
      let response = await addToCart({
        productId: productParams.id,
        price: productParams.price,
        userId: user.id,
      });
      addToast(response, { appearance: "info", autoDismiss: true });
    } else {
      addToast("Bạn cần đăng nhập!", { appearance: "info", autoDismiss: true });
    }
  };

  return (
    <>
      <Header />

      <main>
        <div id="product" className="productDetail-page">
          <div className="small-container single-product">
            <div className="row">
              <div className="col-2">
                <div className="image-hero">
                  <img
                    src={product?.photoURL}
                    width="100%"
                    alt=""
                    id="productImg"
                  />
                </div>
              </div>
              <div className="col-2">
                <p>{product?.categoryProduct?.title}</p>
                <h1>{product?.title}</h1>
                <h4>{currencyFormat(product?.price)}</h4>
                <h3>Màu: {product?.color}</h3>
                <h3>Xuất xứ: {product?.origin}</h3>
                <div className="btn" onClick={() => addCart(product)}>
                  Thêm vào giỏ hàng
                </div>
                <h3>
                  Mô tả sản phẩm
                  <i className="fa fa-indent" />
                </h3>
                <br />
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.content ? product.content : "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <RelatedProduct productId={productId} />
      </main>

      <Footer />
    </>
  );
}
