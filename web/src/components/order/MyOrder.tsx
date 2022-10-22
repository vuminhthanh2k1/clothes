import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faEllipsis, faEllipsisH, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroments';
import { Routes } from '../../routes';
// import OrderEdit from './OrderEdit';

const access_token = localStorage.getItem("token");
export default () => {
  let history = useHistory();
  const [orders, setOrders] = useState({
    total: 0,
    data: []
  });
  let { addToast } = useToasts();
  const [textSearch, setTextSearch] = useState("");
  let dispatch = useDispatch();
  const [locationData, setLocationData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState<any>(5);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.data)
  let searchLocation = async () => {
    let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
    if (responsive.status === 200) {
      setLocationData(responsive.data)
    }
  }
  useEffect(() => {
    search("")
  }, [activePage, limit])
  const search = (text: string) => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Orders`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
          include: 'account',
          where: {
            code: {
              regexp: `/.*${text}.*/i`
            },
            accountId: user?.id
          }
        }
      }
    }).then((result) => {
      setLoading(false);
      setOrders(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }

  useEffect(() => {
    searchLocation()
  }, []);


  let routerDetailOrder = (data: any) => {
    history.push({
      pathname: Routes.OrderDetail.path,
      state: data.id
    })
  }

  return (
    <div className="mt-7">
      <Container>
        <Row className="mb-4" >
          <Col className='col-9' >
            <input placeholder='Tìm kiếm ...'
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #ececec'
              }}
              value={textSearch}
              onChange={e => setTextSearch(e.target.value)}
            />
          </Col>
          <Col className='col-3' >
            <Button variant="success" onClick={() => search(textSearch)} >
              {/* <FontAwesomeIcon icon={faSearch} /> */} Search
            </Button>
          </Col>
        </Row>
        <Row>
          <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
              <Table hover className="user-table align-items-center">
                <thead>
                  <tr>
                    <th className="border-bottom">#</th>
                    <th className="border-bottom">Mã đơn hàng</th>
                    <th className="border-bottom">Tỉnh/Thành phố</th>
                    <th className="border-bottom">Giá (VNĐ)</th>
                    <th className="border-bottom">Trạng thái</th>
                    <th className="border-bottom">Ngày</th>
                    <th className="border-bottom">Cài đặt</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.data.map((orderItem, index) => {
                    return (
                      <TableItem index={index + 1} order={orderItem} key={index}
                        routerDetailOrder={routerDetailOrder}
                        search={search}
                        locationData={locationData}
                      />
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {orders && <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={orders.total}
                    pageRangeDisplayed={3}
                    onChange={value => setActivePage(value)}
                  />}
                </div>
              </Nav>
              <small className="fw-bold">
                Hiển thị <select value={limit} onChange={e => setLimit(e.target.value)} >
                  <option value={5} >5</option>
                  <option value={10} >10</option>
                  <option value={15} >15</option>
                </select> trong tổng số <b>{orders.total}</b> mục
              </small>
            </Card.Footer>
          </Card>
        </Row>
      </Container>
    </div>
  )
}


function TableItem({ index, order, routerDetailOrder, search, locationData }: { index: number, order: any, routerDetailOrder: any, search: any, locationData: any }) {
  let { addToast } = useToasts();
  let city = locationData?.filter((item: any) => item.code == order?.city)[0]
  let district = city?.districts?.filter((item: any) => item.code == order?.district)[0]?.name;
  let deleteOrder = () => {
    if (order.status == 'Thành công') {
      addToast('Đơn hàng đã đang được giao, bạn không thể xóa!', { appearance: 'warning', autoDismiss: true })
    } else {
      axios({
        method: 'DELETE',
        url: `${apiUrl}/Orders/${order.id}`,
        params: {
          access_token: access_token,
          filter: {
            include: 'account'
          }
        }
      }).then(() => {
        search("");
        addToast('Xóa đơn hàng thành công!', { appearance: 'success', autoDismiss: true })
      }).catch(error => {
        addToast("Error", { appearance: 'error', autoDismiss: true });

      })
    }

  }
  const currencyFormat = (num: Number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
  }
  return (
    <>
      {/* <OrderEdit show={show} handleClose={handleClose} order={order} search={search} /> */}
      <tr>
        <td>
          <div className="text-black font-bold">{index}</div>
        </td>
        <td>
          <div className="text-black font-bold">{order?.code}</div>
        </td>
        <td>
          {city?.name} -  {district}
        </td>
        <td>{currencyFormat(order.price)}</td>
        <td>{order.status}</td>
        <td>{moment(order?.updatedAt).format("HH:mm DD-MM-YYYY")}</td>
        <td>
          <Dropdown as={ButtonGroup} >
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                </svg>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => routerDetailOrder(order)} >
                Xem
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={() => deleteOrder()}  >
                Hủy đơn
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>

      </tr>
    </>
  );
}   
