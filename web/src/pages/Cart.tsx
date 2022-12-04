import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroments";
import { OrderProductInterface } from "../models/order-product.interface";
import { Routes } from "../routes";
const access_token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
export default function Cart() {
  const [orderProducts, setOrderProducts] = useState<OrderProductInterface[]>(
    []
  );
  const [price, setPrice] = useState<number>(0);
  const [inputPrice, setInputPrice] = useState<number>(0);
  const history = useHistory();
  let { addToast } = useToasts();
  useEffect(() => {
    search();
  }, []);
  const search = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/CartClothes/get-order-cart`,
      params: {
        access_token,
        user: userId,
      },
    })
      .then((result) => {
        if (result.data.length > 0) {
          setOrderProducts(result.data);
          let total = 0;
          let totalInputPrice = 0;
          result.data.forEach((orderProduct: OrderProductInterface) => {
            total += orderProduct.price;
            totalInputPrice += orderProduct.inputPrice;
          });
          setPrice(total);
          setInputPrice(totalInputPrice);
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
        cartId: orderProducts[0].cartId,
        inputPrice
      },
    });
  };
  const addPrice = (orderProduct: OrderProductInterface) => {
    updateOrderProduct(orderProduct.amount + 1, orderProduct);
    let totalInputPrice = inputPrice;
    let total = price;
    total += orderProduct.clothes.price;
    totalInputPrice += orderProduct.clothes.inputPrice;
    setPrice(total);
    setInputPrice(totalInputPrice);
  };
  const subPrice = (orderProduct: OrderProductInterface) => {
    if (orderProduct.amount == 1) {
      deleteOrderProduct(orderProduct);
      let totalInputPrice = inputPrice;
      let total = price;
      total -= orderProduct.clothes.price;
      totalInputPrice -= orderProduct.clothes.inputPrice;
      setPrice(total);
      setInputPrice(totalInputPrice);
    } else {
      let totalInputPrice = inputPrice;
      let total = price;
      totalInputPrice -= orderProduct.clothes.inputPrice;
      total -= orderProduct.clothes.price;
      setPrice(total);
      setInputPrice(totalInputPrice);
      updateOrderProduct(orderProduct.amount - 1, orderProduct);
    }
  };
  const updateOrderProduct = async (
    num: number,
    orderProduct: OrderProductInterface
  ) => {
    axios({
      method: "PATCH",
      url: `${apiUrl}/CartClothes/${orderProduct.id}`,
      params: {
        access_token,
      },
      data: {
        amount: num,
        price: num * orderProduct.clothes.price,
        inputPrice: num * orderProduct.clothes.inputPrice,
      },
    }).then(() => {
      search();
    });
  };
  const deleteOrderProduct = async (orderProduct: OrderProductInterface) => {
    axios({
      method: "DELETE",
      url: `${apiUrl}/CartClothes/${orderProduct.id}`,
      params: {
        access_token,
      },
    }).then(() => {
      addToast("Xóa sản phẩm khỏi giỏ hàng thành công!", {
        appearance: "success",
        autoDismiss: true,
      });
      search();
    });
  };
  return (
    <>
      <Header />
      <div className="small-container cart-page">
        <table>
          <tbody>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Tiền hàng</th>
            </tr>
            {orderProducts.map((el: OrderProductInterface, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="cart-info">
                      <img src={el.clothes.photoURL} />
                      <div>
                        <p>{el.clothes.title}</p>
                        <small>{currencyFormat(el.clothes.price)}</small>
                        <br />
                        <div className="remove-btn">Xóa</div>
                      </div>
                    </div>
                  </td>
                  <td className="qty">
                    <div className="quantity">
                      <button onClick={() => subPrice(el)}>-</button>
                      <div>{el.amount}</div>
                      <button onClick={() => addPrice(el)}>+</button>{" "}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                      {currencyFormat(
                        Number(el.clothes.price * Number(el.amount))
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="total-price">
          <div className="wrap-total-price">
            <table>
              <tbody>
                <tr>
                  <td>Tổng thanh toán</td>
                  <td>{currencyFormat(price)}</td>
                </tr>
              </tbody>
            </table>
            <a onClick={checkout} className="flex justify-center">
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
