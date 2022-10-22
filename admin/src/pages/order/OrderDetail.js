import { Button, Container, Form, Image, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { apiUrl } from '../../enviroment';

const access_token = localStorage.getItem("token");
export default () => {
  let location = useLocation();
  let order = location.state;
  const [orderProducts, setOrderProducts] = useState([]);
  const [locationData, setLocationData] = useState();
  let history = useHistory();
  useEffect(() => {
    searchLocation()
  }, [])
  let searchLocation = async () => {
    let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
    if (responsive.status === 200) {
      setLocationData(responsive.data)
    }
  }
  useEffect(() => {
    search()
  },[order.id])
  const search = () => {
    axios({
      method: 'GET',
      url: `${apiUrl}/OrderProducts`,
      params: {
        access_token,
        filter: {
          where: {
            orderId: order.id
          },
          include: 'product'
        }
      }
    }).then((result) => {
      setOrderProducts(result.data);
    }).catch(err => console.log(err))
  }

  let city = locationData?.filter(item => item.code == order?.city)[0]
  let district = city?.districts?.filter(item => item.code == order?.district)[0]?.name;
  const currencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chi tiết đơn hàng</h3>
        <Form>
          <div className='order__detail feedback' >
            <label>Thông tin người dùng</label>
            <table>
              <thead>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Tỉnh/Thành phố</th>
                <th>Địa chỉ gửi</th>
              </thead>
              <tbody>
                <td>{order?.firstName} - {order?.lastName}</td>
                <td>{order?.phoneNumber}</td>
                <td>{order?.email}</td>
                <td>{city?.name} - {district}</td>
                <td>{order?.address}</td>
              </tbody>
            </table>
            <div style={{ height: 50 }} ></div>
            <label>Thông tin sản phẩm</label>
            <table>
              <thead>
                <th>Tên hàng</th>
                <th>Màu sắc</th>
                <th>Xuất xứ</th>
                <th>Hình ảnh</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </thead>
              <tbody>
                {orderProducts?.map((orderProduct,index) => {
                  return(
                    <tr key={index}>
                      <td>{orderProduct?.product?.title}</td>
                      <td>{orderProduct?.product?.color}</td>
                      <td>{orderProduct?.product?.origin}</td>
                      <td><Image src={orderProduct?.product?.photoURL} alt="photoURL" className="user-avatar xl-avatar" /></td>
                      <td>{currencyFormat(orderProduct?.product?.price)}</td>
                      <td>{orderProduct?.amount}</td>
                      <td>{currencyFormat(Number(orderProduct?.product?.price * orderProduct?.amount))}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ height: 50 }} ></div>
          <label>Trạng thái</label>
          <InputGroup >
            <Form.Control autoFocus required type="text"

              value={order?.status}
              disabled
            />
          </InputGroup>
          <div style={{ height: 50 }} ></div>
          <label>Tổng Tiền</label>
          <InputGroup >
            <Form.Control autoFocus required type="text"
              value={currencyFormat(Number(order?.price))}
              disabled
            />
          </InputGroup>
          <div style={{ height: 50 }} ></div>
          <label>Ghi chú</label>
          <InputGroup >
            <Form.Control autoFocus required type="text"
              value={order?.note}
              disabled
            />
          </InputGroup>

          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.goBack()}>
            Quay lại
          </Button>
        </Form>
      </Row>
    </Container>
  )
}