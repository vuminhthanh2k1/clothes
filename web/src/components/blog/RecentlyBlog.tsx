import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../enviroments";
import { BlogInterface } from "../../models/blog.interface";
import { Routes } from "../../routes";
import recentBlog from '../../assets/images/category-2.jpg'
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
        <div className="single-latest-post d-flex align-items-center cursor-pointer">
          <div className="post-thumb">
            <img src={recentBlog} alt="" />
          </div>
          <div className="post-content">
            <div className="post-title">
              <h6>title recent blog</h6>
            </div>
            <div className="post-date">
              12/12/2022
            </div>
          </div>
        </div>
        <div className="single-latest-post d-flex align-items-center cursor-pointer">
          <div className="post-thumb">
            <img src={recentBlog} alt="" />
          </div>
          <div className="post-content">
            <div className="post-title">
              <h6>title recent blog</h6>
            </div>
            <div className="post-date">
              12/12/2022
            </div>
          </div>
        </div>
        <div className="single-latest-post d-flex align-items-center cursor-pointer">
          <div className="post-thumb">
            <img src={recentBlog} alt="" />
          </div>
          <div className="post-content">
            <div className="post-title">
              <h6>title recent blog</h6>
            </div>
            <div className="post-date">
              12/12/2022
            </div>
          </div>
        </div>
      </div>
    </>
  )
}