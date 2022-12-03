import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroment";
import { request } from "../../helper/request.helper";
import uploadFile from "../../helper/uploadFile";
import { Routes } from "../../routes";

const access_token = localStorage.getItem("token");

export default () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const [file, setFile] = useState();
  const categoryProduct = location.state;
  let { addToast } = useToasts();
  let history = useHistory();
  let editCategoryProduct = async (form) => {
    request({
      method: "PATCH",
      url: `CategoryProducts/${categoryProduct.id}`,
      data: form,
    })
      .then(() => {
        history.push(Routes.CategoryProduct.path);
        addToast("Edit Category Product Success", {
          appearance: "success",
          autoDismiss: 1000,
        });
      })
      .catch((error) => {
        addToast("Error", { appearance: "error", autoDismiss: 2000 });
      });
  };
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chỉnh sửa danh mục sản phẩm</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiêu đề</Form.Label>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup
                  style={{
                    border:
                      errors.title?.type === "required" && "1px solid red",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="text"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true,
              }}
              defaultValue={categoryProduct?.title}
            />
          </Form.Group>
          
          <Button
            variant="secondary"
            type="button"
            className="m-3"
            onClick={() => history.push(Routes.CategoryProduct.path)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit(editCategoryProduct)}
          >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
