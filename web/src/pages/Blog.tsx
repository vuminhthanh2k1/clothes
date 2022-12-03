import moment from "moment";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import RecentlyBlog from "../components/blog/RecentlyBlog";
import TagBlog from "../components/blog/TagBlogs";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { request } from "../helper/request.helper";
import { BlogInterface } from "../models/blog.interface";
import { Routes } from "../routes";

export default function Blog() {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: [],
  });
  const [activePage, setActivePage] = useState<number>(1);
  const history = useHistory();
  useEffect(() => {
    search();
  }, [activePage]);
  const search = () => {
    request({
      method: "GET",
      url: "Blogs",
      params: {
        filter: {
          skip: 4 * ((activePage || 1) - 1),
          limit: 4,
        },
      },
    })
      .then((result) => setBlogs(result.data))
      .catch((err) => console.log(err));
  };
  let routerBlogDetail = (blogItem: BlogInterface) => {
    history.push({
      pathname: Routes.SinglePost.path,
      state: blogItem?.id,
    });
  };
  return (
    <>
      <Header title="blog" />
      <section className="alazea-blog-area mb-100 mt-50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 pr-50">
              <div className="row row-main-blog">
                {blogs.data.map((el: BlogInterface, index: number) => {
                  return (
                    <div
                      className="item-main-blog col-12 col-lg-6 cursor-pointer"
                      key={index}
                      onClick={() => routerBlogDetail(el)}
                    >
                      <div className="single-blog-post mb-50">
                        <div className="post-thumbnail">
                          <a href="/single-post">
                            <div className="wrap-img-thumb">
                              <img
                                src={el.photoURL}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: 214,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </a>
                        </div>
                        <div className="post-content">
                          <div className="post-title">
                            <a href="/single-post">
                              <h5>{el.title}</h5>
                            </a>
                          </div>
                          <div className="post-meta flex items-center">
                            <div>
                              <span className="time-post">
                                {moment(el.createdAt).format("DD/MM/YYYY")}
                              </span>
                            </div>
                          </div>
                          <p className="post-excerpt">{el.metaDescription}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="wrapper-paginate">
                    {blogs && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={4}
                        totalItemsCount={blogs.total}
                        pageRangeDisplayed={3}
                        onChange={(value: number) => setActivePage(value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="post-sidebar-area">
                <RecentlyBlog />
                {/* ##### Single Widget Area ##### */}
                <div className="single-widget-area">
                  {/* Title */}
                  <div className="widget-title">
                    <h4>Thẻ tag</h4>
                  </div>
                  {/* Tags */}
                  <TagBlog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
