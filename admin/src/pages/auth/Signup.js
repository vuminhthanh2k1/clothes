
import { faAngleLeft, faEnvelope, faPhoneAlt, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, FormCheck, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";


export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts()
  const [checkbox, setCheckbox] = useState(false);
  let history = useHistory()
  let signup = (form) => {
    if (checkbox) {
      if (form.password !== form.confirmPassword) {
        addToast("Mật khẩu nhập lại chưa đúng", { appearance: 'error', autoDismiss: 2000 })
      }
      let { confirmPassword, ...other } = form;
      axios.post(`${apiUrl}/user/register`, other).then(() => {
        addToast("Success! Please open email to verify account.", { appearance: 'success', autoDismiss: 1000 })
        history.push(Routes.Signin.path);
      }).catch((error) => {
        if (error.response) {
          addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
        } else {
          addToast("Error", { appearance: 'error', autoDismiss: 2000 });
        }
      })
    } else {
      addToast("Bạn cần đồng ý với điều khoản của chúng tôi", { appearance: 'info', autoDismiss: 2000 })
    }
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to signin
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Controller
                      control={control}
                      name="email"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }} >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="email" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        }
                      }}
                    />
                    <span style={{ color: 'red', fontSize: 12 }} >{errors.email?.type === 'pattern' && "* Chưa đúng định dạng email"}</span>
                  </Form.Group>
                  <Form.Group id="phoneNumber" className="mb-4">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }} >
                            <FontAwesomeIcon icon={faPhoneAlt} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true }}
                    />
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Họ</Form.Label>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }}>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true }}
                    />
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Tên</Form.Label>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }}>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true }}
                    />
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Controller
                      control={control}
                      name="password"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }} >
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="password" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true, minLength: 8 }}
                    />
                    <span style={{ color: 'red', fontSize: 12 }} >{errors.password?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                    <Controller
                      control={control}
                      name="confirmPassword"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }}>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required type="password" onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.email?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true, minLength: 8 }}
                    />
                    <span style={{ color: 'red', fontSize: 12 }} >{errors.password?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4"  >
                    <FormCheck.Input required id="terms" className="me-2" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />

                    <FormCheck.Label htmlFor="terms">
                      Tôi đồng ý với <Card.Link>điều khoản và điều lệ</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>
                  <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(signup)} >
                    Sign up
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
