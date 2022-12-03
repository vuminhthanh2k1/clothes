import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl, token } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';
import AccountEditRole from './AccountEditRole';

const access_token = localStorage.getItem("token")

export default () => {
  const [accounts, setAccounts] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
    request({
      method: 'GET',
      url: `Accounts`,
      params: {
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
          include: 'roles'
        }
      }
    }).then((result) => {
      setLoading(false);
      setAccounts(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit])
  console.log(accounts.data)
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
                  <th className="border-bottom">Số điện thoại</th>
                  <th className="border-bottom">Email</th>
                  <th className="border-bottom">Quyền</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {accounts && accounts.data.map((accountItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} account={accountItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {accounts && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={accounts.total}
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
                </select> trong tổng số <b>{accounts.total}</b> mục
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, account, search }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let { addToast } = useToasts();

  let deleteAccount = () => {
    request({
      method: 'DELETE',
      url: `Accounts/${account.id}`
    }).then(() => {
      search();
      addToast('Delete Account Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });

    })
  }
  let history = useHistory();

  return (
    <tr>
      <AccountEditRole show={show} handleClose={handleClose} role={account?.roles?.[0]?.id} accountId={account?.id} search={search} />
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{account?.firstName} {account?.lastName}</td>
      <td>{account?.phoneNumber}</td>
      <td>{account?.email}</td>
      <td>{account?.roles?.[0]?.name}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShow(true)} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Sửa
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteAccount}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
