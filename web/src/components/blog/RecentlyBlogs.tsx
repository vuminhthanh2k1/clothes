import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../enviroments";
import { BlogInterface } from "../../models/blog.interface";
import { Routes } from "../../routes";

export default function RecentlyBlog() {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  })
  const history = useHistory();

  useEffect(() => {
    search() // eslint-disable-next-line
  }, [])
  const search = () => {
    axios({
      method: 'GET',
      url: `${apiUrl}/Blogs`,
      params: {
        filter: {
          limit: 4,
          order: 'createdAt'
        }
      }
    }).then((result) => {
      setBlogs(result.data);
    }).catch(err => {
      console.log(err)
    })
  }
  let routerBlogDetail = (blogItem: BlogInterface) => {
    history.push({
      pathname: Routes.SinglePost.path,
      state: blogItem?.id
    })
  }
  return (
    <>
      <div className="single-widget-area">
        {/* Title */}
        <div className="widget-title">
          <h4>Bài viết gần đây</h4>
        </div>
        {blogs?.data.map((blog: BlogInterface, index: number) => {
          return (
            <div className="single-latest-post d-flex align-items-center cursor-pointer" key={index} onClick={() => routerBlogDetail(blog)}>
              <div className="post-thumb">
                <img src={blog.photoURL} alt="" />
              </div>
              <div className="post-content">
                <div className="post-title">
                  <h6>{blog.title}</h6>
                </div>
                <div className="post-date">
                  {moment(blog.createdAt).format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}