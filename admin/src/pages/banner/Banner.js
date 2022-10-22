import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
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
  const [banners, setBanners] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Banners`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
        }
      }
    }).then((result) => {
      setLoading(false);
      setBanners(result.data);

    }).catch(err => {
      setLoading(false);
    })
  }
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit])
  return (
    <Container>
      <Loading loading={loading} />
      {!loading && <Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.BannerAdd.path)} >
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
                  <th className="border-bottom">Hình ảnh</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {banners && banners.data?.map((bannerItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} banner={bannerItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {banners && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={banners.total}
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
                </select> trong tổng số <b>{banners.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, banner, search }) {

  let { addToast } = useToasts();

  let deleteBanner = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/Banners/${banner.id}`,
      params: {
        access_token: access_token,
      }
    }).then(() => {
      search();
      addToast('Delete Banner Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{banner?.photoURL ? <Image src={banner?.photoURL} alt="photoURL" className="user-avatar xl-avatar" /> : <Image src={Profile3} className="user-avatar xl-avatar" />}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="text-danger" onClick={deleteBanner}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
