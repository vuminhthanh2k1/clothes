import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LeftBlog from '../components/blog/LeftBlog';
import RightBlog from '../components/blog/RightBlog';
import RunnerInn from '../components/home/RunnerInn';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import BannerShop from '../components/shop/BannerShop';
import BreadCrumb from '../components/shop/BreadCrumb';
import { apiUrl } from '../enviroments';
import { BlogInterface } from '../models/blog.interface';
import { Routes } from '../routes';

const access_token = localStorage.getItem("token");
export default function Blog() {
  const activePageinit = Number(new URLSearchParams(useLocation().search).get('activePage'));
  const tagBlogInit = Number(new URLSearchParams(useLocation().search).get('tag'));
  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  })
  const history = useHistory();
  const [activePage, setActivePage] = useState(activePageinit || 1);

  const [tagId, setTagId] = useState(tagBlogInit || 1);
  const [textSearch, setTextSearch] = useState("")
  useEffect(() => {
    search("") // eslint-disable-next-line
  }, [tagId, activePage]);
  const search = (text: string) => {
    if (tagBlogInit) {
      axios({
        method: 'GET',
        url: `${apiUrl}/Blogs`,
        params: {
          access_token: access_token,
          filter: {
            limit: 6,
            skip: 6 * (activePage - 1),
            include: ["account", "tag"],
            order: 'createdAt',
            where: {
              tagId: tagId
            }
          }
        }
      }).then((result) => {
        setBlogs(result.data);
      }).catch(err => {
        console.log(err)
      })
    } else {
      axios({
        method: 'GET',
        url: `${apiUrl}/Blogs`,
        params: {
          access_token: access_token,
          filter: {
            limit: 6,
            skip: 6 * (activePage - 1),
            include: ["account", "tag"],
            order: 'createdAt'
          }
        }
      }).then((result) => {
        setBlogs(result.data);
      }).catch(err => {
        console.log(err)
      })
    }

  }
  let routerBlogDetail = (blogItem: BlogInterface) => {
    history.push({
      pathname: Routes.SinglePost.path,
      state: blogItem?.id
    })
  }
  return (
    <>
      <Header title="blog" />

      <BannerShop />
      <BreadCrumb title="Blog" />

      <div className="container">
        <div className="row">
          <LeftBlog blogs={blogs} />
          <RightBlog blogs={blogs} total={blogs.total} pageNum={activePage} />
        </div>
      </div>

      <RunnerInn />

      <Footer />

    </>
  )
}

