import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "../../helper/request.helper";
import { BlogInterface } from "../../models/blog.interface";
import { Routes } from "../../routes";
export default function Testimonial() {
  const [blogs, setBlogs] = useState({
    total: 0,
    data: [],
  });
  const history = useHistory();
  useEffect(() => {
    request({
      method: "GET",
      url: "Blogs",
      params: {
        filter: {
          order: "createdAt DESC",
          limit: 3,
        },
      },
    }).then((result) => setBlogs(result.data));
  }, []);
  let routerBlogDetail = (blogItem: BlogInterface) => {
    history.push({
      pathname: Routes.SinglePost.path,
      state: blogItem?.id,
    });
  };
  return (
    <>
      <div className="testimonial">
        <div className="small-container">
          <div className="row flex justify-between">
            {blogs.data.map((el: BlogInterface, index: number) => {
              return (
                <div className="col-3" key={index} onClick={() => routerBlogDetail(el)}>
                  <i className="fa fa-qoute-lef" />
                  <p>{el.metaDescription}</p>
                  <img src={el.photoURL} style={{ height: 50 }} />
                  <h3>{el.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
