import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import uploadFile from '../../helper/uploadFile';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token")

export default () => {
  const [file, setFile] = useState();
  let { addToast } = useToasts();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  let addBanner = async () => {
    setLoading(true);
    let fileUrl = await uploadFile(file);
    if (fileUrl) {
      request({
        method: 'POST',
        url: 'Banners',
        data: { photoURL: fileUrl }
      }).then(() => {
        setLoading(false);
        history.push(Routes.Banner.path);
        addToast("Add Banner Success", { appearance: 'success', autoDismiss: 1000 });
      }).catch(error => {
        setLoading(false);
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      })
    }

  }

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm ảnh Banner</h3>
        <Loading loading={loading} />
        <Form>
          <Form.Group className="mt-4" >
            <Form.Label>Hình ảnh</Form.Label>
            <div className="d-xl-flex align-items-center">
              <div className="user-avatar xl-avatar">
                {file && <img id="target" src={URL.createObjectURL(file)} alt="" />}
              </div>
              <div className="file-field">
                <div className="d-flex justify-content-xl-center ms-xl-3">
                  <div className="d-flex">
                    <span className="icon icon-md">
                      <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                    </span>
                    <input type="file"
                      onChange={e => setFile(e.target.files[0])}
                    />
                    <div className="d-md-block text-start">
                      <div className="fw-normal text-dark mb-1">Chọn ảnh</div>
                      <div className="text-gray small">JPG, GIF or PNG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.About.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={addBanner} >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  )
}