import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
import IMG from '../../assets/images/shoes/new-1.jpg'
import moment from "moment";
const access_token = localStorage.getItem("token");
export default function NewBlog() {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  })
  useEffect(() => {
    search("") // eslint-disable-next-line
  }, []);
  const search = (text: string) => {
    axios({
      method: 'GET',
      url: `${apiUrl}/Blogs`,
      params: {
        access_token: access_token,
        filter: {
          limit: 3,
          include: ["account", "tag"],
          order: 'createdAt',
          where: {
            tagId: 1,
            title: {
              regexp: `/.*${text}.*/i`
            }
          }
        }
      }
    }).then((result) => {
      setBlogs(result.data);
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <section className="" style={{ marginTop: 30, marginBottom: 40 }}>
        <div className="content">
          <div className="container">
            <div className="hot_sp">
              <h2 style={{ textAlign: 'center', paddingTop: 10 }}>
                <a style={{ color: 'black', fontSize: 28, textDecoration: 'none' }} href="">Bài viết mới nhất</a>
              </h2>
              <br />
            </div>
          </div>
        </div>
        {/* <!--New--> */}
        <div>

          <div className="container">

            <div className="row">
              {blogs.data.map((blog: any, index) => {
                return (<div className="col-md-4" key={index}>
                  <div className="post_item">
                    <div className="post_featured">
                      <a href="#" title="Adidas EQT Cushion ADV">
                        <img className="img-resize" style={{ paddingBottom: 15 }} src={blog?.photoURL} alt={blog?.title}
                        />
                      </a>
                    </div>
                    <div className="pro-text">
                      <h3 className="post_title">
                        <a style={{ color: 'black', fontSize: 18, textDecoration: 'none',fontWeight:'bold' }} href={"/single-post/" + blog.id} title={blog.title} >
                          {blog?.title}
                        </a>
                      </h3>
                    </div>
                    <div className="pro-text">
                      <span className="post_info_item">
                        {moment(blog?.updatedAt).format("HH:mm DD-MM-YYYY")}
                      </span>
                    </div>
                    <div style={{ paddingBottom: 30 }}>
                      <span>{blog?.metaDescription}</span>
                    </div>
                  </div>
                </div>)
              })}
              {/* <div className="col-md-4">
                <div className="post_item">
                  <div className="post_featured">
                    <a href="#" title="Adidas EQT Cushion ADV">
                      <img className="img-resize" style={{ paddingBottom: 15 }} src={IMG}
                        alt="Adidas Falcon nổi bật mùa Hè với phối màu color block" />
                    </a>
                  </div>
                  <div className="pro-text">
                    <span className="post_info_item">

                      Thứ Ba 11,06,2019

                    </span>
                  </div>
                  <div className="pro-text">
                    <h3 className="post_title">
                      <a style={{ color: 'black', fontSize: 18, textDecoration: 'none' }} href="#" >
                        Adidas Falcon nổi bật mùa Hè với phối màu color block
                      </a>
                    </h3>
                  </div>
                  <div style={{ textAlign: 'center', paddingBottom: 30 }}>
                    <span>Cuối tháng 5, adidas Falcon đã cho ra mắt nhiều phối màu đón chào mùa Hè khiến giới trẻ yêu
                      thích không thôi. Tưởng chừng thương hiệu sẽ tiếp tục...</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="post_item">
                  <div className="post_featured">
                    <a href="#" title="Adidas EQT Cushion ADV">
                      <img className="img-resize" style={{ paddingBottom: 15 }} src={IMG}
                        alt="Adidas Falcon nổi bật mùa Hè với phối màu color block" />
                    </a>
                  </div>
                  <div className="pro-text">
                    <span className="post_info_item">

                      Thứ Ba 11,06,2019

                    </span>
                  </div>
                  <div className="pro-text">
                    <h3 className="post_title">
                      <a style={{ color: 'black', fontSize: 18, textDecoration: 'none' }} href="#">
                        Saucony hồi sinh mẫu giày chạy bộ cổ điển của mình – Aya Runner
                      </a>
                    </h3>
                  </div>
                  <div style={{ textAlign: 'center', paddingBottom: 30 }}>
                    <span>Là một trong những đôi giày chạy bộ tốt nhất vào những năm 1994, 1995, Saucony Aya Runner vừa có
                      màn trở lại
                      vô cùng ấn tượngCó vẻ như 2019...</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="post_item">
                  <div className="post_featured">
                    <a href="#" title="Adidas EQT Cushion ADV">
                      <img className="img-resize" style={{ paddingBottom: 15 }} src={IMG}
                        alt="Adidas Falcon nổi bật mùa Hè với phối màu color block" />
                    </a>
                  </div>
                  <div className="pro-text">
                    <span className="post_info_item">

                      Thứ Ba 11,06,2019

                    </span>
                  </div>
                  <div className="pro-text">
                    <h3 className="post_title">
                      <a style={{ color: 'black', fontSize: 18, textDecoration: 'none' }} href="#">
                        Nike Vapormax Plus trở lại với sắc tím mộng mơ và thiết kế chuyển màu đẹp mắt
                      </a>
                    </h3>
                  </div>
                  <div style={{ textAlign: 'center', paddingBottom: 30 }}>
                    <span>Là một trong những mẫu giày retro có nhiều phối màu gradient đẹp nhất từ trước đến này, Nike
                      Vapormax Plus vừa có màn trở lại bá đạo dành cho...</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}