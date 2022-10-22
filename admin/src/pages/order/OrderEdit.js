import { Dropdown } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';

const access_token = localStorage.getItem("token");
export default ({ show, handleClose, order, search }) => {
  let dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  const listStatus = ['Đã tạo đơn', 'Thành công'];
  const [status, setStatus] = useState(order.status);
  useEffect(() => {
    setStatus(order.status)
  }, [order.id])
  let changeStatus = async (form) => {
    request({
      method: 'PATCH',
      url: `Orders/${order.id}`,
      data: {
        status
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
          <Modal.Title>Cập nhập trạng thái</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {listStatus.map((item, index) => {
                return (
                  <Dropdown.Item key={index} onClick={() => setStatus(item)} >{item}</Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {

            handleClose()
          }}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit(changeStatus)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}