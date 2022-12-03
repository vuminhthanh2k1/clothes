import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';
const access_token = localStorage.getItem("token")

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  // thư viện form dùng để quản lý dữ liệu người dùng nhập
  let { addToast } = useToasts();
  // thông báo
  let history = useHistory();
  // chuyển trang
  let addTag = (form) => {
    // form = {title: form.title}
    request({
      method: 'POST',
      url: 'Tags',
      data: form
    }).then(() => {
      history.push(Routes.Tag.path);
      addToast("Add Tag Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm thẻ tag</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiêu đề</Form.Label>
            <Controller
              control={control}
              name="title" // tạo ra một thuộc tính title nhận giá trị khi người dùng nhập vào ô input
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
            

          {/* Controller dùng để bọc thẻ input vào để quản lý  */}
          </Form.Group>

          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Tag.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(addTag)} >
            Xác nhận
          </Button>
          {/* Khi click vào sumbit tức là add form lên thì cần có hàm handleSumbit của form và truyền 
          function addTag để add api của tag */}
        </Form>
      </Row>
    </Container>
  )
}