import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, Image, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { apiUrl } from '../../enviroment';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';
const access_token = localStorage.getItem("token")

export default () => {
  const { control, formState: { errors } } = useForm();
  const location = useLocation();
  const blog = location.state;
  const [file, setFile] = useState();
  let history = useHistory();
  const [tags, setTags] = useState();
  const [tagId, setTagId] = useState(blog.tagId);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    searchTags()
  }, [])

  const searchTags = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/Tags`,
      params: {
        access_token: access_token
      }
    }).then((result) => {
      setLoading(false);
      setTags(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chi tiết bài viết</h3>
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
                    onBlur={onBlur} value={value} disabled
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={blog?.title}
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
                  style={{ height: 200 }} disabled
                />
              )}
              name="metaDescription"
              defaultValue={blog?.metaDescription}
              rules={{ required: true }}
            />
          </Form.Group>
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
              defaultValue={blog?.content}
              rules={{ required: true }}
            />
          </Form.Group>
          <Form.Group className="mt-4" >
            <Form.Label>Hình ảnh</Form.Label>
            <div className="d-xl-flex align-items-center">
              <div className="user-avatar xl-avatar">
                {file ? <img id="target" src={URL.createObjectURL(file)} alt="" /> :
                  <Image src={blog?.photoURL} alt="photoURL" className="user-avatar xl-avatar" />
                }
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
        </Form>
      </Row>
    </Container>
  )
}