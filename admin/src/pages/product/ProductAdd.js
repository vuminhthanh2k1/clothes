import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { tinyConfig } from '../../helper/TiniConfigure';
import uploadFile from '../../helper/uploadFile';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token")

export default () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState();
  let { addToast } = useToasts();
  let history = useHistory();
  const [categoryProducts, setCategoryProducts] = useState();
  const [categoryProductId, setCategoryProductId] = useState();
  const [loading, setLoading] = useState(false);
  let addProduct = async (form) => {
    setLoading(true);
    let fileUrl = await uploadFile(file);
    if (fileUrl) {
      request({
        method: 'POST',
        url: `${apiUrl}/Products`,
        data: { ...form, photoURL: fileUrl, categoryProductId: categoryProductId},
      }).then(() => {
        setLoading(false);
        history.push(Routes.Product.path);
        addToast("Add Product Success", { appearance: 'success', autoDismiss: 1000 });
      }).catch(error => {
        setLoading(false);
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      })
    }

  }
  useEffect(() => {
    searchCategoryProducts()
  }, [])
  const searchCategoryProducts = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/CategoryProducts`,
      params: {
        access_token: access_token
      }
    }).then((result) => {
      setLoading(false);
      setCategoryProducts(result.data);
      setCategoryProductId(result.data.data[0]?.id)
    }).catch(err => {
      setLoading(false);
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm sản phẩm</h3>
        <Loading loading={loading} />
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
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Giá</Form.Label>
            <Controller
              control={control}
              name="price"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.price?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Màu sắc</Form.Label>
            <Controller
              control={control}
              name="color"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.size?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Xuất xứ</Form.Label>
            <Controller
              control={control}
              name="origin"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.weight?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Danh mục: &nbsp; </Form.Label>
            <select value={categoryProductId} onChange={e => setCategoryProductId(e.target.value)} >
              {categoryProducts && categoryProducts?.data.map((categoryProduct, index) => {
                return (
                  <option key={index} value={categoryProduct?.id} >{categoryProduct?.title}</option>
                )
              })}
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nội dung</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Editor apiKey="g8rgmljyc6ryhlggucq6jeqipl6tn5rnqym45lkfm235599i"
                  init={tinyConfig}
                  onEditorChange={(event) => {
                    onChange(event)
                  }}
                  onBlur={onBlur}
                  value={value}

                />
              )}
              name="content"
              defaultValue={""}
              rules={{ required: true }}
            />
          </Form.Group>

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
            onClick={() => history.push(Routes.Product.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(addProduct)} >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  )
}