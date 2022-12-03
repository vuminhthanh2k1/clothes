import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { tinyConfig } from '../../helper/TiniConfigure';
import uploadFile from '../../helper/uploadFile';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

const access_token = localStorage.getItem("token");


export default () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState();
  let { addToast } = useToasts();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState();
  const [tagId, setTagId] = useState();
  const user = useSelector(state => state.auth.data);
  let addBlog = async (form) => {
    if (user) {
      setLoading(true);
      let fileUrl = await uploadFile(file);
      if (fileUrl) {
        request({
          method: 'POST',
          url: 'Blogs',
          data: { ...form, photoURL: fileUrl, accountId: user.id, tagId },
        })
          .then(() => {
            setLoading(false);
            history.push(Routes.Blog.path);
            addToast("Thêm bài viết thành công", { appearance: 'success', autoDismiss: 1000 });
          }).catch(error => {
            setLoading(false);
            addToast("Lỗi", { appearance: 'error', autoDismiss: 2000 });
          })
      }
    } else {
      addToast("Bạn cần đăng nhập!", { appearance: 'error', autoDismiss: 2000 });
    }


  }
  useEffect(() => {
    searchTags()
  }, [])
  const searchTags = () => {
    setLoading(true);
    request({
      method: 'GET',
      url: 'Tags'
    })
      .then((result) => {
        setLoading(false);
        setTags(result.data);
        setTagId(result.data.data[0]?.id)
      }).catch(err => {
        setLoading(false);
      })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm bài viết</h3>
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
            <Form.Label>Tag &nbsp; </Form.Label>
            <select value={tagId} onChange={e => setTagId(e.target.value)} >
              {tags && tags?.data.map((tag, index) => {
                return (
                  <option key={index} value={tag?.id} >{tag?.title}</option>
                )
              })}
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Meta description</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  className="form-control "
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  onBlur={onBlur}
                  style={{ height: 200 }}
                />
              )}
              name="metaDescription"
              defaultValue=""
              rules={{ required: true }}
            />
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
            onClick={() => history.push(Routes.Blog.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(addBlog)} >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  )
}