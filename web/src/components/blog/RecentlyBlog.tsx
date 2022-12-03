import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../enviroments";
import { BlogInterface } from "../../models/blog.interface";
import { Routes } from "../../routes";
import recentBlog from "../../assets/images/category-2.jpg";
export default function RecentlyBlog() {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: [],
  });
  const history = useHistory();

  useEffect(() => {
    search(); // eslint-disable-next-line
  }, []);
  const search = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Blogs`,
      params: {
        filter: {
          limit: 3,
          order: "createdAt",
        },
      },
    })
      .then((result) => {
        setBlogs(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let routerBlogDetail = (blogItem: BlogInterface) => {
    history.push({
      pathname: Routes.SinglePost.path,
      state: blogItem?.id,
    });
  };
  return (
    <>
      <div className="single-widget-area">
        {/* Title */}
        <div className="widget-title">
          <h4>Bài viết gần đây</h4>
        </div>
        {blogs.data.map((el: BlogInterface, index: number) => {
          return (
            <div
              className="single-latest-post d-flex align-items-center cursor-pointer"
              key={index}
              onClick={() => routerBlogDetail(el)}
            >
              <div className="post-thumb">
                <img src={el.photoURL} alt="" />
              </div>
              <div className="post-content">
                <div className="post-title">
                  <h6>{el.title}</h6>
                </div>
                <div className="post-date">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
