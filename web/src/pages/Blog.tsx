import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LeftBlog from '../components/blog/LeftBlog';
import RecentlyBlog from '../components/blog/RecentlyBlog';
import RightBlog from '../components/blog/RightBlog';
import TagBlog from '../components/blog/TagBlog';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { apiUrl } from '../enviroments';
import { BlogInterface } from '../models/blog.interface';
import { Routes } from '../routes';
import blogimg from '../assets/images/category-2.jpg'
// import '../style/blog.scss'

// import RecentlyBlog from "../components/blog/RecentlyBlog"
// import TagBlog from "../components/blog/TagBlog"

const access_token = localStorage.getItem("token");
export default function Blog() {
  const activePageinit = Number(new URLSearchParams(useLocation().search).get('activePage'));
  const tagBlogInit = Number(new URLSearchParams(useLocation().search).get('tag'));
  const [blogs, setBlogs] = useState({
    total: 0,
    data: []
  })
  const history = useHistory();
  const [activePage, setActivePage] = useState(activePageinit || 1)
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
      {/* <div className="small-container">
         <div className="row">
           <LeftBlog />
           <RightBlog />
         </div>
       </div> */}
      <section className="alazea-blog-area mb-100 mt-50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 pr-50">
              <div className="row row-main-blog">
                <div className="item-main-blog col-12 col-lg-6 cursor-pointer" >
                  <div className="single-blog-post mb-50">
                    <div className="post-thumbnail">
                      <a href='/single-post'>
                        <div className='wrap-img-thumb'>
                          <img src={blogimg} alt="" style={{ width: '100%', height: 214, objectFit: 'cover' }} />
                        </div>
                      </a>
                    </div>
                    <div className="post-content">
                      <div className="post-title">
                        <a href='/single-post'>
                          <h5>
                            title here
                          </h5>
                        </a>
                      </div>
                      <div className="post-meta flex items-center" >
                        <div>
                          <span className='time-post'>12/4/2022</span>
                        </div>
                      </div>
                      <p className="post-excerpt">
                        ăfa ăfằn ăiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa a
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item-main-blog col-12 col-lg-6 cursor-pointer" >
                  <div className="single-blog-post mb-50">
                    <div className="post-thumbnail">
                      <a href='/single-post'>
                        <div className='wrap-img-thumb'>
                          <img src={blogimg} alt="" style={{ width: '100%', height: 214, objectFit: 'cover' }} />
                        </div>
                      </a>
                    </div>
                    <div className="post-content">
                      <div className="post-title">
                        <a href='/single-post'>
                          <h5>
                            title here
                          </h5>
                        </a>
                      </div>
                      <div className="post-meta flex items-center" >
                        <div>
                          <span className='time-post'>12/4/2022</span>
                        </div>
                      </div>
                      <p className="post-excerpt">
                        ăfa ăfằn ăiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa a
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item-main-blog col-12 col-lg-6 cursor-pointer" >
                  <div className="single-blog-post mb-50">
                    <div className="post-thumbnail">
                      <a href='/single-post'>
                        <div className='wrap-img-thumb'>
                          <img src={blogimg} alt="" style={{ width: '100%', height: 214, objectFit: 'cover' }} />
                        </div>
                      </a>
                    </div>
                    <div className="post-content">
                      <div className="post-title">
                        <a href='/single-post'>
                          <h5>
                            title here
                          </h5>
                        </a>
                      </div>
                      <div className="post-meta flex items-center" >
                        <div>
                          <span className='time-post'>12/4/2022</span>
                        </div>
                      </div>
                      <p className="post-excerpt">
                        ăfa ăfằn ăiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa a
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item-main-blog col-12 col-lg-6 cursor-pointer" >
                  <div className="single-blog-post mb-50">
                    <div className="post-thumbnail">
                      <a href='/single-post'>
                        <div className='wrap-img-thumb'>
                          <img src={blogimg} alt="" style={{ width: '100%', height: 214, objectFit: 'cover' }} />
                        </div>
                      </a>
                    </div>
                    <div className="post-content">
                      <div className="post-title">
                        <a href='/single-post'>
                          <h5>
                            title here
                          </h5>
                        </a>
                      </div>
                      <div className="post-meta flex items-center" >
                        <div>
                          <span className='time-post'>12/4/2022</span>
                        </div>
                      </div>
                      <p className="post-excerpt">
                        ăfa ăfằn ăiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa aiịađịa ặịdiaầmlmf ăđa a
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className='wrapper-paginate' >

                    {/* {blogs && <Pagination
                      activePage={activePage}
                      itemsCountPerPage={6}
                      totalItemsCount={blogs.total}
                      pageRangeDisplayed={3}
                      onChange={(value: number) => setActivePage(value)}
                    />} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="post-sidebar-area">
                {/* ##### Single Widget Area ##### */}
                <div className="single-widget-area">
                  <div className="search-form">
                    <input
                      type="text"
                      name="search"
                      id="widgetsearch"


                      placeholder="Search..."
                    />
                    <button >
                      <i className="icon_search" />
                    </button>
                  </div>
                </div>
                {/* ##### Single Widget Area ##### */}
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
  )
}

