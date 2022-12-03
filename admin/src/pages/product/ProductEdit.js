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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroment";
import { request } from "../../helper/request.helper";
import uploadFile from "../../helper/uploadFile";
import { Routes } from "../../routes";
import Loading from "../layout/Loading";
const access_token = localStorage.getItem("token");

export default () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const product = location.state;
  const [file, setFile] = useState();
  let { addToast } = useToasts();
  let history = useHistory();
  const [categoryProducts, setCategoryProducts] = useState();
  const [categoryProductId, setCategoryProductId] = useState(
    product.categoryProductId
  );
  const [size, setSize] = useState(product.size);
  const [type, setType] = useState(product.type);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    searchCategoryProducts();
  }, []);
  let addVideoYoutube = async (form) => {
    setLoading(true);
    if (file) {
      let fileUrl = await uploadFile(file);
      if (fileUrl) {
        request({
          method: "PATCH",
          url: `${apiUrl}/Clothes/${product.id}`,
          data: {
            ...form,
            photoURL: fileUrl,
            categoryProductId: categoryProductId,
            size,
            type,
          },
        })
          .then(() => {
            setLoading(false);
            history.push(Routes.Product.path);
            addToast("Edit Product Success", {
              appearance: "success",
              autoDismiss: 1000,
            });
          })
          .catch((error) => {
            setLoading(false);
            addToast("Error", { appearance: "error", autoDismiss: 2000 });
          });
      }
    } else {
      request({
        method: "PATCH",
        url: `${apiUrl}/Clothes/${product.id}`,
        data: { ...form, categoryProductId: categoryProductId, size, type },
      })
        .then(() => {
          setLoading(false);
          history.push(Routes.Product.path);
          addToast("Add Product Success", {
            appearance: "success",
            autoDismiss: 1000,
          });
        })
        .catch((error) => {
          setLoading(false);
          addToast("Error", { appearance: "error", autoDismiss: 2000 });
        });
    }
  };

  const searchCategoryProducts = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${apiUrl}/CategoryProducts`,
      params: {
        access_token: access_token,
      },
    })
      .then((result) => {
        setLoading(false);
        setCategoryProducts(result.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chỉnh sửa Sản phẩm</h3>
        <Loading loading={loading} />
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
              defaultValue={product?.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Giá</Form.Label>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup
                  style={{
                    border:
                      errors.price?.type === "required" && "1px solid red",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="number"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true,
              }}
              defaultValue={product?.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Số lượng</Form.Label>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup
                  style={{
                    border:
                      errors.price?.type === "required" && "1px solid red",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="number"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true,
              }}
              defaultValue={product?.amount}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Chọn size &nbsp;</Form.Label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Kiểu dáng &nbsp;</Form.Label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Áo có cổ">Áo có cổ</option>
              <option value="Áo có cổ">Áo sơ mi</option>
              <option value="Áo phông">Áo phông</option>
              <option value="Quần dài">Quần dài</option>
              <option value="Quần lửng">Quần lửng</option>
              <option value="Hợp thời trang">Hợp thời trang</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category &nbsp; </Form.Label>
            <select
              value={categoryProductId}
              onChange={(e) => setCategoryProductId(e.target.value)}
            >
              {categoryProducts &&
                categoryProducts?.data.map((categoryProduct, index) => {
                  return (
                    <option key={index} value={categoryProduct?.id}>
                      {categoryProduct?.title}
                    </option>
                  );
                })}
            </select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nội dung</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  className="form-control "
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  style={{ height: 200 }}
                />
              )}
              name="content"
              defaultValue={product?.content}
              rules={{ required: true }}
            />
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Hình ảnh</Form.Label>
            <div className="d-xl-flex align-items-center">
              <div className="user-avatar xl-avatar">
                {file ? (
                  <img id="target" src={URL.createObjectURL(file)} alt="" />
                ) : (
                  <Image
                    src={product?.photoURL}
                    alt="photoURL"
                    className="user-avatar xl-avatar"
                  />
                )}
              </div>
              <div className="file-field">
                <div className="d-flex justify-content-xl-center ms-xl-3">
                  <div className="d-flex">
                    <span className="icon icon-md">
                      <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                    </span>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
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
          <Button
            variant="secondary"
            type="button"
            className="m-3"
            onClick={() => history.push(Routes.Product.path)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit(addVideoYoutube)}
          >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
