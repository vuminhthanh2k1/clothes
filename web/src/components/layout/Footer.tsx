import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
import Playstore from '../../assets/images/play-store.png'
import Appstore from '../../assets/images/app-store.png'
import LogoWhite from '../../assets/images/logo-white.png'

const access_token = localStorage.getItem("token");
export default function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { control, handleSubmit } = useForm();
  let { addToast } = useToasts();
  const user = useSelector((state: any) => state.auth.data);
  let feedback = async (form: any) => {
    if (user) {
      axios({
        method: 'POST',
        url: `${apiUrl}/Feedbacks`,
        params: {
          access_token: access_token
        },
        data: {
          content: form.content, accountId: user.id
        }
      })
        .then(() => {
          addToast("Success", { appearance: 'success', autoDismiss: true });
          handleClose();
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      addToast("Bạn cần đăng nhập", { appearance: 'warning', autoDismiss: true });
    }

  }
  return (
    <>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hãy cho chúng tôi biết về trải nghiệm của bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Controller
            control={control}
            name="content"
            render={({
              field: { onChange, onBlur, value }
            }) => (
              <textarea
                className="feedback-text w-full min-h-28"
                id="contact-name"
                placeholder="Nhập phản hồi..."
                onChange={e => onChange(e.target.value)}
                onBlur={onBlur}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit(feedback)}>
            Gửi phản hồi
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and ios mobile phone</p>
              <div className="app-logo">
                <img src={Playstore} />
                <img src={Appstore} />
              </div>
            </div>
            <div className="footer-col-2">
              <img src={LogoWhite} />
              <p>Our Purpose Is To Sustainably Make the Pleasure and
                Benefits of Sports Accessible to the Many</p>
            </div>
            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Post</li>
                <li>Return Policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3>Follow us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube </li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="Copyright">Copyright 2020 - By Bui Thang</p>
        </div>
      </div>

    </>
  )
}