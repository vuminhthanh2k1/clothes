import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token")

export default () => {
  const [tags, setTags] = useState({
    total: 0,
    data: []
  }); // tạo ra state là tags, và hàm setTags là cập nhật lại giá trị của state tags
  // Và tags khởi tạo giá trị ban đầu là 1 object có thuộc tính total là 0 (số lượng bản ghi tags)
  // và data là 1 mảng rỗng (dữ liệu tag được trả về)
  let history = useHistory(); // dùng để chuyển trang
  const [activePage, setActivePage] = useState(1); // khởi tạo ra 1 state có tên là activePage có giá trị là 1
  const [limit, setLimit] = useState(5); // khởi tạo ra 1 state có tên là limit có giá trị là 5
  const [loading, setLoading] = useState(false); // khởi tạo ra 1 state có tên là loading dùng để check xem api đã trả về 
  const search = () => {
    setLoading(true); // bắt đầu loading
    axios({
      method: 'GET',
      url: `${apiUrl}/Tags`,
      params: {
        access_token: access_token, // token mà khi đăng nhập vào được lưu ở localStorange
        filter: {
          limit: limit,
          skip: limit * (activePage - 1)
        } // dùng để lọc theo điều kiện dùng để phân trang
      }
    }).then((result) => {
      setLoading(false); // loading thành công
      setTags(result.data); // cập nhật lại giá trị state tags ban đầu 
    }).catch(err => {
      setLoading(false);
    })
  }

  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit])
  // nếu useEffect nó sẽ nhận tham số thứ 2 là 1 mảng [] thì những gì trong nó sẽ được gọi ngay khi em vào component đó
  // nếu useEffect nhận tham số thứ 2 là mảng chứa biến bên trong thì một khi biến đó thay đổi
  // thì những gì bên trong nó sẽ được gọi lại
  return (
    <Container>
      <Loading loading={loading} />
      {!loading && <Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.TagAdd.path)} >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Tiêu đề</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.data.map((tagItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} tag={tagItem} key={index} search={search} />
                  )
                  // truyền biến xuống cho component con TableItem theo kiểu props
                  
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {tags && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={tags.total}
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
                </select> trong tổng số <b>{tags.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, tag, search }) {
  // nhận giá trị từ component cha truyền xuống
  let { addToast } = useToasts();

  let deleteTag = () => {
    request({
      method: 'DELETE',
      url: `${apiUrl}/Tags/${tag.id}`,
      // xóa dữ liệu
    }).then(() => {
      search(); // xóa thành công thì get lại dữ liệu lần nữa
      addToast('Delete Tag Success', { appearance: 'success', autoDismiss: 1000 })
      // thư viện toast dùng để hiển thị thông báo
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  let history = useHistory();
  let editTag = () => {
    history.push({
      pathname: Routes.TagEdit.path, // chuyển đến trang edit
      state: tag // dữ liệu được truyền đi là tag 
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{tag?.title}</td> 
      {/* hiển thị giá trị */}
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={editTag} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Chỉnh sửa
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteTag}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
