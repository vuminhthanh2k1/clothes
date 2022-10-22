import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

export default () => {
  const { control, formState: { errors } } = useForm();
  const location = useLocation();
  const contact = location.state;

  let history = useHistory();

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chi tiết liên hệ</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên</Form.Label>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                    disabled
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={contact.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                    disabled
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={contact.email}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Chủ đề</Form.Label>
            <Controller
              control={control}
              name="subject"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                    disabled
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={contact.subject}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Lời nhắn</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  className="form-control "
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  onBlur={onBlur}
                  style={{ height: 200 }}
                  disabled
                />
              )}
              name="message"
              defaultValue={contact.message}
              rules={{ required: true }}
            />
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Contact.path)}>
            Hủy
          </Button>

        </Form>
      </Row>
    </Container>
  )
}