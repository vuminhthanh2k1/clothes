import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroments";
import { OrderProductInterface } from "../models/order-product.interface";
import { Routes } from "../routes";

// const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : null;
const access_token = localStorage.getItem("token");
export default function Checkout() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  const location = useLocation();
  const data: any = location.state;
  const [city, setCity] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [citySelect, setCitySelect] = useState<any>();
  const [districtSelect, setDistrictSelect] = useState<any>();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkPayment, setCheckPayment] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.data);
  function makeid(length: number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  useEffect(() => {
    searchLocation(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  let searchLocation = async () => {
    if (user) {
      let responsive = await axios.get(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      if (responsive.status === 200) {
        let cityDistricts = responsive.data.filter(
          (item: any) => item.code == user.city
        )[0];
        setCity(responsive.data);
        setCitySelect(user.city);
        setDistrict(cityDistricts?.districts);
        setDistrictSelect(user.district);
      }
    }
  };
  let handleSelectCity = (e: any) => {
    setCitySelect(e.target.value);
    let cityDistricts = city.filter((item) => item.code == e.target.value)?.[0];
    setDistrict(cityDistricts.districts);
    setDistrictSelect(cityDistricts.districts?.[0]?.code);
  };
  let handleSelectDistrict = (e: any) => {
    setDistrictSelect(e.target.value);
  };
  const currencyFormat = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const checkout = async (form: any) => {
    axios({
      method: "PATCH",
      url: `${apiUrl}/Orders/${data?.orderId}`,
      params: {
        access_token,
      },
      data: {
        status: "Đã tạo đơn",
        price: data?.price,
        code: makeid(4),
        city: citySelect,
        district: districtSelect,
        ...form,
      },
    })
      .then((result) => {
        if (!checkPayment) {
          setCode(result.data.code);
          setShow(true);
        } else if (checkPayment) {
          axios({
            method: "POST",
            url: `${apiUrl}/Orders/payment-order`,
            params: {
              access_token,
            },
            data: {
              amount: data?.price,
              orderType: "Thanh toán tiền hàng",
              orderDescription: "Thanh toán tiền hàng online qua ngân hàng NCB",
              bankCode: "NCB",
              language: "vn",
              idOrder: result.data.id,
            },
          })
            .then((res) => {
              window.open(res.data, "_self");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        addToast(`Failed!`, { appearance: "error", autoDismiss: true });
      });
  };
  return (
    <>
      <Header />
      <div className="checkout_area mb-100 mt-7">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-7">
              <div className="checkout_details_area clearfix">
                <h5>Thông tin</h5>
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label>Họ *</label>
                      <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.firstName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="text"
                            name="firstName"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.firstName}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Tên *</label>
                      <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="text"
                            name="lastName"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.lastName}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label>Email *</label>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.email}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label>Số điện thoại *</label>
                      <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.phoneNumber}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label>Địa chỉ *</label>
                      <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="text"
                            name="address"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Tỉnh/Thành phố *</label>
                      <select
                        onChange={(e) => handleSelectCity(e)}
                        value={citySelect}
                        className="form-control"
                      >
                        {city.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Quận/Huyện *</label>
                      <select
                        onChange={(e) => handleSelectDistrict(e)}
                        value={districtSelect}
                        className="form-control"
                      >
                        {district?.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-12 mb-4">
                      <label>Ghi chú</label>
                      <Controller
                        control={control}
                        name="note"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <textarea
                            className="form-control"
                            name="address"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            placeholder="Notes about your order, e.g. special notes for delivery."
                          />
                        )}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="checkout-content">
                <h5 className="title--">Đơn hàng của bạn</h5>
                <div className="products">
                  <div className="products-data">
                    <h5>Sản phẩm:</h5>
                    {data?.orderProducts?.map(
                      (orderProduct: OrderProductInterface, index: number) => {
                        return (
                          <div
                            key={index}
                            className="single-products d-flex justify-content-between align-items-center mt-3"
                          >
                            <div>
                              {orderProduct.product.title} x{" "}
                              {orderProduct.amount}
                            </div>
                            <div className="font-bold">
                              {currencyFormat(
                                Number(
                                  orderProduct.amount *
                                    orderProduct.product.price
                                )
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="order-total d-flex justify-content-between align-items-center mt-8">
                  <div>Tổng tiền</div>
                  <div className="font-bold">
                    {currencyFormat(Number(data?.price))}
                  </div>
                </div>
                <div className="order-total d-flex justify-content-between align-items-center mt-8">
                  <div>Hình thức thanh toán</div>
                  <div className="font-bold">
                    <input
                      onClick={() => setCheckPayment(false)}
                      type="radio"
                      checked={!checkPayment}
                      name="payment"
                    />{" "}
                    Tiền mặt
                    <br />
                    <input
                      onClick={() => setCheckPayment(true)}
                      type="radio"
                      checked={checkPayment}
                      name="payment"
                    />{" "}
                    Thanh toán trực tuyến
                  </div>
                </div>
                <div className="checkout-btn mt-30">
                  <div
                    onClick={handleSubmit(checkout)}
                    className="text-center alazea-btn w-100"
                  >
                    Xác nhận
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal className="wrap-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Tạo đơn hàng <b>{code}</b> thành công!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              history.push(Routes.Dashboard.path);
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
