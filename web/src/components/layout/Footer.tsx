import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
import imgbct from '../../assets/images/logo-bct.png'

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
      <Modal show={show} onHide={handleClose}>
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
      </Modal>
      <footer className="main-footer mt-5">
        <div className="container">
          <div className="">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="footer-col footer-block">
                  <h4 className="footer-title">
                    Giới thiệu
                  </h4>
                  <div className="footer-content">
                    <p>Runner Inn trang mua sắm trực tuyến của thương hiệu giày, thời trang nam, nữ, phụ kiện, giúp bạn
                      tiếp
                      cận xu hướng thời trang mới nhất.</p>
                    <div className="logo-footer">
                      <img src={imgbct} alt="Bộ Công Thương" />
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="footer-col footer-link">
                  <h4 className="footer-title">
                    PHÁP LÝ &amp; CÂU HỎI
                  </h4>
                  <div className="footer-content toggle-footer">
                    <ul style={{ paddingLeft: 0 }}>
                      <li className="item">
                        <a href="#" title="Tìm kiếm">Tìm kiếm</a>
                      </li>
                      <li className="item">
                        <a href="#" title="Giới thiệu">Giới thiệu</a>
                      </li>
                      <li className="item">
                        <a href="#" title="Chính sách đổi trả">Chính sách đổi trả</a>
                      </li>
                      <li className="item">
                        <a href="#" title="Chính sách bảo mật">Chính sách bảo mật</a>
                      </li>
                      <li className="item">
                        <a href="#" title="Điều khoản dịch vụ">Điều khoản dịch vụ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="footer-col footer-block">
                  <h4 className="footer-title">
                    Thông tin liên hệ
                  </h4>
                  <div className="footer-content toggle-footer">
                    <ul style={{ paddingLeft: 0 }}>
                      <li><span>Địa chỉ:</span> 117-119 Lý Chính Thắng, Phường 7, Quận 3, TP. Hồ Chí Minh, Vietnam</li>
                      <li><span>Điện thoại:</span> +84 (028) 38800659</li>
                      <li><span>Fax:</span> +84 (028) 38800659</li>
                      <li><span>Mail:</span> contact@aziworld.com</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="footer-col footer-block">
                  <h4 className="footer-title">
                    FANPAGE
                  </h4>
                  <div className="footer-content">
                    <div id="fb-root">
                      <div className="footer-static-content">
                        <div className="fb-page" data-href="https://www.facebook.com/AziWorld-Viet-Nam-908555669481794/"
                          data-tabs="timeline" data-width="" data-height="215" data-small-header="false"
                          data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                          <blockquote cite="https://www.facebook.com/AziWorld-Viet-Nam-908555669481794/"
                            className="fb-xfbml-parse-ignore"><a
                              href="https://www.facebook.com/AziWorld-Viet-Nam-908555669481794/">AziWorld Viet Nam</a>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Button variant="info" className="mt-4 mx-auto" onClick={handleShow}>
                    Feedback
                  </Button>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className="main-footer--copyright">
          <div className="container">
            <hr />
            <div className="main-footer--border" style={{ textAlign: 'center', paddingBottom: 15 }}>
              <p>Copyright © 2019 <a href="https://runner-inn.myharavan.com"> Runner Inn</a>. <a target="_blank"
                href="https://www.facebook.com/henrynguyen202">Powered by HuniBlue</a></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}