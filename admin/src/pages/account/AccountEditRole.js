import { Dropdown } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';

const access_token = localStorage.getItem("token");
export default ({ show, handleClose, role, search, accountId }) => {
  let dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  
  const [roleId, setRoleId] = useState(role);
  useEffect(() => {
    setRoleId(role)
  }, [role, accountId])
  let changeRole = async (form) => {
    request({
      method: 'POST',
      url: `Accounts/change-role`,
      params: {
        data:{
          accountId,
          roleId
        }
      }
    }).then(() => {
      addToast("Success", { appearance: 'success', autoDismiss: 1000 });
      search("")
      handleClose()
    }).catch(err => console.log(err))
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi quyền người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {roleId == 2 && 'ADMIN'}
              {roleId == 3 && 'USER'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => setRoleId(2)} >ADMIN</Dropdown.Item>
            <Dropdown.Item onClick={() => setRoleId(3)} >USER</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {

            handleClose()
          }}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit(changeRole)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}