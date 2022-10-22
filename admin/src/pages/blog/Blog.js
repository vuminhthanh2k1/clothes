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
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token")

export default () => {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState();
  const [tagId, setTagId] = useState();
  useEffect(() => {
    searchTags()
  }, [])
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit, tagId])
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Blogs`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
          where: {
            tagId
          }
        }
      }
    }).then((result) => {
      console.log(result)
      setLoading(false);
      setBlogs(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  const searchTags = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Tags`,
      params: {
        access_token: access_token
      }
    }).then((result) => {
      setLoading(false);
      setTags(result.data);
      setTagId(result.data.data[0]?.id)
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
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.BlogAdd.path)} >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <select value={tagId} onChange={e => setTagId(e.target.value)} >
              {tags && tags?.data?.map((tag, index) => {
                return (
                  <option key={index} value={tag?.id} >{tag?.title}</option>
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
                  <th className="border-bottom">Hình ảnh</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {blogs && blogs?.data.map((blogItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} blog={blogItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {blogs && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={blogs.total}
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
                </select> trong tổng số <b>{blogs.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, blog, search }) {

  let { addToast } = useToasts();

  let deleteBlog = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/Blogs/${blog.id}`,
      params: {
        access_token: access_token,
      }
    }).then(() => {
      search();
      addToast('Delete Blog Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  let history = useHistory();
  let editBlog = () => {
    history.push({
      pathname: Routes.BlogEdit.path,
      state: blog
    })
  }
  let detailBlog = () => {
    history.push({
      pathname: Routes.BlogDetail.path,
      state: blog
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{blog?.title}</td>
      <td>{blog?.photoURL ? <Image src={blog?.photoURL} alt="photoURL" className="user-avatar xl-avatar" /> : <Image src={Profile3} className="user-avatar xl-avatar" />}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={detailBlog}  >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Chi tiết
            </Dropdown.Item>
            <Dropdown.Item onClick={editBlog} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Chỉnh sửa
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteBlog}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
