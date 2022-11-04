import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecentlyBlog from "../components/blog/RecentlyBlog";
import TagBlog from "../components/blog/TagBlogs";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ItemBestSeller from "../components/shop/ItemBestSeller";
import { request } from "../helper/request.helper";
import { BlogInterface } from "../models/blog.interface";

const access_token = localStorage.getItem("token");

export default function SinglePost() {
  const location = useLocation();
  const blogId = location.state;
  const [blog, setBlog] = useState<BlogInterface>();
  useEffect(() => {
    request({
      method: "GET",
      url: `Blogs/${blogId}`,
    })
      .then((result) => setBlog(result.data))
      .catch((err) => console.log(err));
  }, [blogId]);
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
                    <h4 className="post-title">{blog?.title}</h4>
                    <div className="post-meta mb-30 flex items-center">
                      <div className="post-meta-content flex items-center mr-10">
                        <svg
                          style={{
                            width: "18px",
                            height: "18px",
                            marginRight: "3px",
                          }}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z"
                          />
                        </svg>
                        {moment(blog?.createdAt).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div className="post-thumbnail mb-30">
                      <img src="img/bg-img/35.jpg" alt="" />
                    </div>
                    <p>{blog?.metaDescription}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog?.content ? blog.content : "",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
            {/* Blog Sidebar Area */}
            <div className="col-12 col-sm-9 col-md-4">
              <div className="post-sidebar-area">
                {/* ##### Single Widget Area ##### */}

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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
