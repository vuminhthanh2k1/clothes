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


     await   axios({
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

      await  axios({
            method: 'GET',
            url: `${apiUrl}/Blogs/${blogId}`,
            params: {
                access_token: access_token,
                filter: {
                    include :  ["account", "tag"]
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

            <BannerShop />
            <BreadCrumb title="Bài viết" />
            <div className="container">
                <div className="row">
                    <LeftBlog blogs={blogs} />
                    <SinglePostItem blog={blog}/>
                </div>
            </div>

            <Footer />
        </>
    )
}