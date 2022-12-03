import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';

const access_token = localStorage.getItem("token")

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();  // khai báo location để nhận giá trị được gửi từ trước 
  const tag = location.state;  // location.state tức là nhận giá trị tag được gửi 
  let { addToast } = useToasts();
  let history = useHistory();
  let editTag = (form) => {
    // form : {title: form.title}
    request({
      method: 'PATCH',
      url: `Tags/${tag.id}`,
      data: form
    }).then(() => {
      history.push(Routes.Tag.path);
      addToast("Edit Tag Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chỉnh sửa thẻ tag</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiêu đề</Form.Label>
            <Controller
              control={control}
              name="title"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={tag?.title}
            />
          </Form.Group>

          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Tag.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(editTag)} >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  )
}