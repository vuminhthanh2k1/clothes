import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import img from "../assets/images/bg-img/34.jpg";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroments";
import { OrderProductInterface } from "../models/order-product.interface";
import { Routes } from "../routes";
import imgProduct from '../assets/images/category-2.jpg'
const access_token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
export default function Cart() {
  const [orderProducts, setOrderProducts] = useState<OrderProductInterface[]>(
    []
  );
  const [price, setPrice] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);
  const search = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/OrderProducts/get-order-cart`,
      params: {
        access_token,
        user: userId,
      },
    })
      .then((result) => {
        if (result.data.length > 0) {
          setOrderProducts(result.data);
          let total = 0;
          result.data.forEach(
            (orderProduct: OrderProductInterface) =>
              (total += orderProduct.amount * orderProduct.price)
          );
          setPrice(total);
        }
      })
      .catch((err) => console.log(err));
  };
  const currencyFormat = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const checkout = () => {
    history.push({
      pathname: Routes.Checkout.path,
      state: {
        price,
        orderProducts,
        orderId: orderProducts[0].orderId,
      },
    });
  };
  return (
    <>
      <Header />
      <div className="small-container cart-page">
        <table>
          <tbody><tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tiền hàng</th>
          </tr>
            <tr>
              <td>
                <div className="cart-info">
                  <img src={imgProduct} />
                  <div>
                    <p>Red Printed Tshirt</p>
                    <small>Price: $50.00</small>
                    <br />
                    <div className="remove-btn">Xóa</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <input type="number" defaultValue={1} />
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  $50.00
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="cart-info">
                  <img src={imgProduct} />
                  <div>
                    <p>Red Printed Tshirt</p>
                    <small>Price: $75.00</small>
                    <br />
                    <div className="remove-btn">Xóa</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <input type="number" defaultValue={1} />
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  $50.00
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="cart-info">
                  <img src={imgProduct} />
                  <div>
                    <p>Red Printed Tshirt</p>
                    <small>Price: $50.00</small>
                    <br />
                    <div className="remove-btn">Xóa</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <input type="number" defaultValue={1} />
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  $50.00
                </div>
              </td>
            </tr>
          </tbody></table>
        <div className="total-price">
          <div className="wrap-total-price">
            <table>
              <tbody><tr>
                <td>Tổng tiền hàng</td>
                <td>175.000$</td>
              </tr>
                <tr>
                  <td>Phí vận chuyển</td>
                  <td>25.00$</td>
                </tr>
                <tr>
                  <td>Tổng thanh toán</td>
                  <td>200.000$</td>
                </tr>
              </tbody>
            </table>
            <a href="/checkout" className="flex justify-center">
              <div className="confirm-to-checkout alazea-btn text-center">
                Xác nhận
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// const OrderProduct = ({
//   orderProduct,
//   search,
//   price,
//   setPrice,
// }: {
//   orderProduct: OrderProductInterface;
//   search: any;
//   price: number;
//   setPrice: any;
// }) => {
//   const [amount, setAmount] = useState<number>(orderProduct.amount);

//   const currencyFormat = (num: any) => {
//     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
//   };
//   let { addToast } = useToasts();
//   const deleteOrderProduct = async () => {
//     axios({
//       method: "DELETE",
//       url: `${apiUrl}/OrderProducts/${orderProduct.id}`,
//       params: {
//         access_token,
//       },
//     }).then(() => {
//       addToast("Xóa sản phẩm khỏi giỏ hàng thành công!", {
//         appearance: "success",
//         autoDismiss: true,
//       });
//       search();
//     });
//   };
//   const updateOrderProduct = async (num: number) => {
//     axios({
//       method: "PATCH",
//       url: `${apiUrl}/OrderProducts/${orderProduct.id}`,
//       params: {
//         access_token,
//       },
//       data: { amount: num },
//     }).then(() => {
//       search();
//     });
//   };
//   const addPrice = () => {
//     updateOrderProduct(orderProduct.amount + 1);
//     let total = price;
//     total += orderProduct.price;
//     setPrice(total);
//   };
//   const subPrice = () => {
//     if (orderProduct.amount == 1) {
//       deleteOrderProduct();
//       let total = price;
//       total -= orderProduct.price;
//       setPrice(total);
//     } else {
//       let total = price;
//       total -= orderProduct.price;
//       setPrice(total);
//       updateOrderProduct(orderProduct.amount - 1);
//     }
//   };
//   return (
//     <tr>
//       <td className="cart_product_img">
//         <img
//           src={orderProduct.product.photoURL}
//           alt="Product"
//           style={{ width: 150, height: "auto", objectFit: "contain" }}
//         />
//         <h5 style={{ marginTop: 15 }} className="font-bold">
//           {orderProduct.product.title}
//         </h5>
//       </td>
//       <td className="qty">
//         <div className="quantity">
//           <button onClick={subPrice}>-</button>
//           <div>{orderProduct.amount}</div>
//           <button onClick={addPrice}>+</button>
//         </div>
//       </td>
//       <td className="price">
//         <span>{currencyFormat(orderProduct.product.price)}</span>
//       </td>
//       <td className="total_price">
//         <span>
//           {currencyFormat(
//             Number(orderProduct.product.price * Number(orderProduct.amount))
//           )}
//         </span>
//       </td>
//       <td className="action">
//         <div style={{ cursor: "pointer" }} onClick={deleteOrderProduct}>
//           <i className="icon_close"></i>
//         </div>
//       </td>
//     </tr>
//   );
// };
