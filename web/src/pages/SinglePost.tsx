import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import img1 from '../assets/images/bg-img/35.jpg';
import img2 from '../assets/images/bg-img/36.jpg';
import img3 from '../assets/images/bg-img/37.jpg';
import img4 from '../assets/images/bg-img/38.jpg';
import img5 from '../assets/images/bg-img/39.jpg';
import img6 from '../assets/images/bg-img/29.jpg';
import img7 from '../assets/images/bg-img/30.jpg';
import img11 from '../assets/images/bg-img/4.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogInterface } from "../models/blog.interface";
import axios from "axios";
import { apiUrl } from "../enviroments";
import moment from "moment";
import RecentlyBlog from "../components/blog/RecentlyBlog";
import BannerShop from "../components/shop/BannerShop";
import BreadCrumb from "../components/shop/BreadCrumb";
import LeftBlog from "../components/blog/LeftBlog";
import SinglePostItem from "../components/blog/SinglePostItem";
import img from '../assets/images/category-2.jpg'
import TagBlog from "../components/blog/TagBlog";
import ItemBestSeller from "../components/shop/ItemBestSeller";
const access_token = localStorage.getItem("token")

export default function SinglePost() {

  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  })
  const history = useHistory();
  const [activePage, setActivePage] = useState(1);

  const param: any = useParams();
  // const location = useLocation();
  const blogId = param.id || null;
  const [blog, setBlog] = useState<BlogInterface>();


  useEffect(() => {
    search() // eslint-disable-next-line
  }, [blogId, activePage]);

  const search = async () => {


    await axios({
      method: 'GET',
      url: `${apiUrl}/Blogs`,
      params: {
        access_token: access_token,
        filter: {
          limit: 6,
          skip: 6 * (activePage - 1),
          order: 'createdAt',
          where: {
            tagId: 1,
          }
        }
      }
    }).then((result) => {
      setBlogs(result.data);
    }).catch(err => {
      console.log(err)
    })

    await axios({
      method: 'GET',
      url: `${apiUrl}/Blogs/${blogId}`,
      params: {
        access_token: access_token,
        filter: {
          include: ["account", "tag"]
        }
      }
    }).then((result) => {
      setBlog(result.data);
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <Header />

      <section className="blog-content-area section-padding-0-100 mt-50">
        <div className="container">
          <div className="row justify-content-center">
            {/* Blog Posts Area */}
            <div className="col-12 col-md-8 pr-50">
              <div className="blog-posts-area">
                {/* Post Details Area */}
                <div className="single-post-details-area">
                  <div className="post-content">
                    <h4 className="post-title">
                      Garden designers across the country forecast ideas shaping
                      the gardening world in 2018
                    </h4>
                    <div className="post-meta mb-30 flex items-center">
                      <div className="post-meta-content flex items-center mr-10">
                        <svg style={{ width: '18px', height: '18px', marginRight: '3px' }} viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
                        </svg>
                        19 Jun  2018
                      </div>
                      /
                      <div className="post-meta-content flex items-center ml-10">
                        <svg style={{ width: '18px', height: '18px', marginRight: '3px' }} viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </svg>
                        Mason Jenkins
                      </div>
                    </div>
                    <div className="post-thumbnail mb-30">
                      <img src="img/bg-img/35.jpg" alt="" />
                    </div>
                    <p>
                      Integer luctus diam ac scerisque consectetur. Vimus ottawas
                      euismod nec lacus sit amet. Aenean interdus midu vitae,
                      uttah mattis augue fermentum. Donec auctor massa orci, quis
                      condimentum odio eleifended. Orci varius natoque penatibuset
                      magnis discount parturient montes, nascetur ridiculus mus.
                      Ut felis lectus, sagittis in turpis sit amet, ornare interdu
                      ligula. Proin sed dolor eu nulla fermentum fermentum.
                      Suspendisse eget mollis diam. Nulla non mauris et eros
                      accumsan imperdit sed ut turpis. Ut aliquam et sapien at
                      convallis. Integer eu porttitor lacus. Curabitur id aliquam
                      mauris.
                    </p>
                    <div className="row">
                      <div className="col-lg-7">
                        <p>
                          Nullam lectus elit, volutpat velo justo sit damet,
                          tincidunt dapibus turpis. Vivamus idelit nec enim
                          tristique blandit in sit down metunc. Maecenas accumsan
                          nunc quis nisl porttitor varius sed luctus ligula.
                          Aeneamana pellentesque enim eu magna vehicula suada.
                        </p>
                        <p>
                          Quisque suscipit elit sit ametz pellentesque
                          scelerisque. Integer actioner cursu quam, estina
                          portitor cant. Vestibulum luctus libero urna gamora
                          scelerisque laoret. Quisque nect facilisis neque.
                          Integer vitaer dapibus purus, fames turpis egestas.
                          Nullam vulputa nisl tempus luctus.
                        </p>
                      </div>
                      <div className="col-lg-5">
                        <p>
                          <img src={img} alt="" />
                        </p>
                      </div>
                    </div>
                    <p>
                      Mauris nisi arcu, consectetur convallis fringilla quis,
                      posuere ac mauris. Ut in placerat lorem. Donec cursus
                      malesuada nibhem, eget consectetur posuere sed. Suspendisse
                      auctor nec diamet consectetur. Etiam ac maurised nisib
                      tincidunt viverra. Sed nulla lacus, convallis vel nunc sed,
                      fringilla venenatis neque.
                    </p>
                    <p>
                      Phasellus denim jeans lacus, nascetur auge bibendum vel
                      pulvinar viverra, mattis sit amet mi. Mauris fringilla, ex
                      vitae maximus fringilla, neque sapien maximus justo, cursus
                      risus neque sed nibh. Donec at urna eros scelerisque non
                      nibh sed.
                    </p>
                    <p>
                      Cras porta pendisse eleifenden metus, vitae
                      viverra dante volutpat quisto. Curabitur tator risus,
                      sagittis a imperdiet sed, volutpat sit amet. Integer gravida
                      leo sit amet pulvinar vehicula.
                    </p>
                  </div>
                </div>
                {/* Post Tags & Share */}
                <div className="post-tags-share d-flex justify-content-between align-items-center">
                  {/* Tags */}
                  <ol className="popular-tags d-flex align-items-center flex-wrap">
                    <li><span>Tag:</span></li>
                    <li><a href="#">PLANTS</a></li>
                    <li><a href="#">CACTUS</a></li>
                  </ol>
                  {/* Share */}

                  {/* <div className="post-share">
                    <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
                  </div> */}
                </div>

                {/* Comment Area Start */}
                {/* <div className="comment_area clearfix">
                  <h4 className="headline">2 Comments</h4>
                  <ol>
                    <li className="single_comment_area">
                      <div className="comment-wrapper d-flex">
                        <div className="comment-author">
                          <img src="img/bg-img/37.jpg" alt="" />
                        </div>
                        <div className="comment-content">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5>Simona Halep</h5>
                            <span className="comment-date">09:00 AM, 20 Jun 2018</span>
                          </div>
                          <p>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor
                            sit amet, consectetu adipisci velit, sed quia non
                            numquam eius modi
                          </p>
                          <a className="active" href="#">Reply</a>
                        </div>
                      </div>
                      <ol className="children">
                        <li className="single_comment_area">
                          <div className="comment-wrapper d-flex">
                            <div className="comment-author">
                              <img src="img/bg-img/38.jpg" alt="" />
                            </div>
                            <div className="comment-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <h5>Rafael Nadal</h5>
                                <span className="comment-date">09:30 AM, 20 Jun 2018</span>
                              </div>
                              <p>
                                Neque porro quisquam est, qui dolorem ipsum quia
                                dolor sit amet, consectetu adipisci velit, sed
                                quia non numquam eius modi
                              </p>
                              <a className="active" href="#">Reply</a>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </li>
                    <li className="single_comment_area">
                      <div className="comment-wrapper d-flex">
                        <div className="comment-author">
                          <img src="img/bg-img/39.jpg" alt="" />
                        </div>
                        <div className="comment-content">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5>Maria Sharapova</h5>
                            <span className="comment-date">02:20 PM, 20 Jun 2018</span>
                          </div>
                          <p>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor
                            sit amet, consectetu adipisci velit, sed quia non
                            numquam eius modi
                          </p>
                          <a className="active" href="#">Reply</a>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div> */}
                {/* Leave A Comment */}
                {/* <div className="leave-comment-area clearfix">
                  <div className="comment-form">
                    <h4 className="headline">Leave A Comment</h4>
                    <div className="contact-form-area">
                      <form action="#" method="post">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <input type="text" className="form-control" id="contact-name" placeholder="Name" />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <input type="email" className="form-control" id="contact-email" placeholder="Email" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <textarea className="form-control" name="message" id="message" cols={30} rows={10} placeholder="Comment" defaultValue={""} />
                            </div>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn alazea-btn">
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Blog Sidebar Area */}
            <div className="col-12 col-sm-9 col-md-4">
              <div className="post-sidebar-area">
                {/* ##### Single Widget Area ##### */}
                <div className="single-widget-area">
                  <form action="#" method="get" className="search-form relative">
                    <input type="search" name="search" id="widgetSearch" placeholder="Search..." />
                    <div className="search-btn">
                      <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                      </svg>
                    </div>
                  </form>
                </div>

                {/* ##### Single Widget Area ##### */}
                <RecentlyBlog />
                {/* ##### Single Widget Area ##### */}
                
                <div className="single-widget-area">
                  {/* Title */}
                  <div className="widget-title">
                    <h4>Tag Cloud</h4>
                  </div>
                  {/* Tags */}
                  <TagBlog />
                </div>
                {/* ##### Single Widget Area ##### */}
                <div className="single-widget-area">
                  {/* Title */}
                  <div className="widget-title">
                    <h4>BEST SELLER</h4>
                  </div>
                  {/* Single Best Seller Products */}
                  <ItemBestSeller />
                  {/* Single Best Seller Products */}
                  <ItemBestSeller />
                  {/* Single Best Seller Products */}
                  <ItemBestSeller />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  )
}