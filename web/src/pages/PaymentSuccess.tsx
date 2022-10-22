import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroments";
import icon from "../assets/images/success-1.png";
import moment from "moment";
const access_token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
export default function PaymentSuccess() {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("orderId");
  const vnp_BankTranNo = new URLSearchParams(location.search).get(
    "vnp_BankTranNo"
  );
  const vnp_Amount = new URLSearchParams(location.search).get("vnp_Amount");
  const vnp_OrderInfo = new URLSearchParams(location.search).get(
    "vnp_OrderInfo"
  );
  // const vnp_PayDate = new URLSearchParams(location.search).get("vnp_PayDate");

  useEffect(() => {
    if (orderId) {
      axios({
        method: "PATCH",
        url: `${apiUrl}/Orders/${orderId}`,
        params: {
          access_token,
        },
        data: {
          status: "Thành công",
        },
      })
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [orderId]);
  const currencyFormat = (num: any) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  return (
    <>
      <Header />
      <div style={{ background: "#f7f7f7" }} className="p-5">
        <h3 className="text-center">Thanh toán thành công</h3>
        <div className="flex justify-content-center">
          <img src={icon} alt="" width={150} />
        </div>
        <h3 className="text-center">Thông tin giao dịch</h3>
        <div className="flex justify-content-center mt-3">
          <ul className="w-50">
            <li className="flex justify-content-between mt-4">
              <label htmlFor="">Ngân hàng:</label>
              <div>NCB - Ngân hàng TMCP Quốc Dân</div>
            </li>
            <li className="flex justify-content-between mt-4">
              <label htmlFor="">Mã giao dịch:</label>
              <div>{vnp_BankTranNo}</div>
            </li>
            <li className="flex justify-content-between mt-4">
              <label htmlFor="">Số tiền:</label>
              <div>{currencyFormat(Number(vnp_Amount) / 100)}</div>
            </li>
            <li className="flex justify-content-between mt-4">
              <label htmlFor="">Nội dung:</label>
              <div>{vnp_OrderInfo}</div>
            </li>
            {/* <li className="flex justify-content-between mt-4">
              <label htmlFor="">Ngày giao dịch:</label>
              <div>{moment(vnp_PayDate,"YYYYMMDDHHMMSS").format("HH:mm DD/MM/YYYY")}</div>
            </li> */}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
