import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Image, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token")

export default () => {
  const [products, setProducts] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState();
  const [categoryProductId, setCategoryProductId] = useState();
  useEffect(() => {
    searchCategoryProducts()
  }, [])
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Products`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
          where: {
            categoryProductId: categoryProductId
          }
        }
      }
    }).then((result) => {
      setLoading(false);
      setProducts(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit, categoryProductId])
  const searchCategoryProducts = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/CategoryProducts`,
      params: {
        access_token: access_token
      }
    }).then((result) => {
      console.log(result.data)
      setLoading(false);
      setCategoryProducts(result.data);
      setCategoryProductId(result.data.data[0]?.id)
    }).catch(err => {
      setLoading(false);
    })
  }
  return (
    <Container>
      <Loading loading={loading} />
      {!loading && <Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.ProductAdd.path)} >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <select value={categoryProductId} onChange={e => setCategoryProductId(e.target.value)} >
              {categoryProducts && categoryProducts?.data?.map((categoryProduct, index) => {
                return (
                  <option key={index} value={categoryProduct?.id} >{categoryProduct?.title}</option>
                )
              })}
            </select>
          </Col>
        </Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Tiêu đề</th>
                  <th className="border-bottom">Màu sắc</th>
                  <th className="border-bottom">Giá</th>
                  <th className="border-bottom">Xuất xứ</th>
                  <th className="border-bottom">Hình ảnh</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {products && products.data.map((productItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} product={productItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {products && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={products.total}
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
                </select> trong tổng số <b>{products.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, product, search }) {

  let { addToast } = useToasts();

  let deleteProduct = () => {
    request({
      method: 'DELETE',
      url: `${apiUrl}/Products/${product.id}`,
    }).then(() => {
      search();
      addToast('Delete Product Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  let history = useHistory();
  let editProduct = () => {
    history.push({
      pathname: Routes.ProductEdit.path,
      state: product
    })
  }
  let detailProduct = () => {
    history.push({
      pathname: Routes.ProductDetail.path,
      state: product
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{product?.title}</td>
      <td>{product?.price}</td>
      <td>{product?.color}</td>
      <td>{product?.origin}</td>
      <td>{product?.photoURL ? <Image src={product?.photoURL} alt="photoURL" className="user-avatar xl-avatar" /> : <Image src={Profile3} className="user-avatar xl-avatar" />}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={detailProduct}  >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Chi tiết
            </Dropdown.Item>
            <Dropdown.Item onClick={editProduct} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Chỉnh sửa
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteProduct}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
