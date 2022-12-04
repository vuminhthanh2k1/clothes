import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import RelatedProduct from "../components/shop/RelatedProduct";
import { addToCart } from "../helper/addToCart";
import { request } from "../helper/request.helper";
// import ItemRelated from "../components/shop/ItemRelated";
import { ProductInterface } from "../models/product.interface";
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
      url: `Clothes/${productId}`,
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
        inputPrice: productParams.inputPrice
      });
      addToast(response, { appearance: "info", autoDismiss: true });
    } else {
      addToast("Bạn cần đăng nhập!", { appearance: "info", autoDismiss: true });
    }
  };
  const addFavorisClothes = () => {
    request({
      method: "POST",
      url: `FavorisClothes`,
      data: {
        accountId: user.id,
        clothesId: product?.id,
      },
    })
      .then(() => {
        addToast("Đã thêm sản phẩm vào danh sách yêu thích", {
          appearance: "info",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err));
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
                <p style={{ marginTop: 15 }}>
                  {product?.categoryProduct?.title}
                </p>
                <h1 style={{ marginTop: 15 }}>{product?.title}</h1>
                <h4 style={{ marginTop: 15 }}>
                  {currencyFormat(product?.price)}
                </h4>
                <h3 style={{ marginTop: 15 }}>Size: {product?.size}</h3>
                <h3 style={{ marginTop: 15 }}>Loại: {product?.type}</h3>
                <div style={{ marginTop: 15 }}>
                  Yêu thích
                  <FontAwesomeIcon
                    icon={faHeart}
                    width={30}
                    height={30}
                    color={"red"}
                    style={{ cursor: "pointer" }}
                    onClick={addFavorisClothes}
                  />
                </div>
                {product?.amount && product?.amount < 10 ? (
                  <div className="btn" style={{ cursor: "pointer" }}>
                    Hết hàng
                  </div>
                ) : (
                  <div
                    className="btn"
                    onClick={() => addCart(product)}
                    style={{ cursor: "pointer" }}
                  >
                    Thêm vào giỏ hàng
                  </div>
                )}
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
