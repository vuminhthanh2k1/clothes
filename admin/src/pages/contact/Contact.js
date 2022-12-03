import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Container, Dropdown, Nav, Row, Table } from '@themesberg/react-bootstrap';
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
  const [contacts, setContacts] = useState({
    total: 0,
    data: []
  });
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Contacts`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1)
        }
      }
    }).then((result) => {
      setLoading(false);
      setContacts(result.data);
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

        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Tên</th>
                  <th className="border-bottom">Email</th>
                  <th className="border-bottom">Chủ đề</th>
                  <th className="border-bottom">Lời nhắn</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {contacts && contacts.data.map((contactItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} contact={contactItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {contacts && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={contacts.total}
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
                </select> trong tổng số <b>{contacts.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, contact, search }) {

  let { addToast } = useToasts();

  let deleteContact = () => {
    request({
      method: 'DELETE',
      url: `Contacts/${contact.id}`
    }).then(() => {
      search();
      addToast('Delete Contact Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });

    })
  }
  let history = useHistory();
  let detailContact = () => {
    history.push({
      pathname: Routes.ContactDetail.path,
      state: contact
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{contact?.name}</td>
      <td>{contact?.email}</td>
      <td>{contact?.subject}</td>
      <td>{contact?.message}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={detailContact}  >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Chi tiết
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteContact}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
