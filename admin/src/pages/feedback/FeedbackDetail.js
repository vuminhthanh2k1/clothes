import { Button, Container, Form, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

export default () => {
  const { control, formState: { errors } } = useForm();
  const location = useLocation();
  const feedback = location.state;

  let history = useHistory();
  const [locationData, setLocationData] = useState()
  let searchLocation = async () => {
    let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
    if (responsive.status === 200) {
      setLocationData(responsive.data)
    }
  }
  useEffect(() => {
    searchLocation()
  }, [])
  let city = locationData?.filter(item => item.code == feedback?.account?.city)[0]
  let district = city?.districts?.filter(item => item.code == feedback?.account?.district)[0]?.name;
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chi tiết phản hồi</h3>
        <Form>
          <div className='order__detail feedback' >
            <label>Thông tin người phản hồi</label>
            <table className='table_tb'>
              <thead>
                <th>Tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Tỉnh/Thành phố</th>
                <th>Quận/Huyện</th>
              </thead>
              <tbody>
                <td>{feedback?.account.firstName} {feedback?.account.lastName}</td>
                <td>{feedback?.account?.email}</td>
                <td>{feedback?.account?.phoneNumber}</td>
                <td>{city?.name}</td>
                <td>{district}</td>
              </tbody>
            </table>
            <div style={{ height: 50 }} ></div>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nội dung</Form.Label>
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
              name="content"
              defaultValue={feedback.content}
              rules={{ required: true }}
            />
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Feedback.path)}>
            Quay lại
          </Button>

        </Form>
      </Row>
    </Container>
  )
}