import { } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import RelatedProduct from "../components/shop/RelatedProduct";
import { apiUrl } from "../enviroments";
import { addToCart } from "../helper/addToCart";
// import ItemRelated from "../components/shop/ItemRelated";
import { ProductInterface } from "../models/product.interface";
import imageHero from '../assets/images/gallery-1.jpg'
import img1 from '../assets/images/gallery-1.jpg'
import img2 from '../assets/images/gallery-2.jpg'
import img3 from '../assets/images/gallery-3.jpg'
import img4 from '../assets/images/gallery-4.jpg'



const access_token = localStorage.getItem("token")

export default function ShopDetails() {
    const location = useLocation();
    const params: any = useParams() || {};
    const productId = params.id || 1;
    const [product, setProduct] = useState<ProductInterface>();
    const user = useSelector((state: any) => state.auth.data);
    const { addToast } = useToasts();
    const [products, setProducts] = useState({
        total: 0,
        data: []
    })
    const [related, setRelated] = useState({
        total: 0,
        data: []
    })
    useEffect(() => {
        search() // eslint-disable-next-line
        searchProductsRelated();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [productId])
    const history = useHistory();
    const search = () => {
        axios({
            method: 'GET',
            url: `${apiUrl}/Products/${productId}`,
            params: {
                access_token: access_token,
                filter: {
                    include: 'categoryProduct'
                }
            }
        }).then((result) => {
            setProduct(result.data);
        }).catch(err => {
            console.log(err)
        })
    }
    const currencyFormat = (num: any) => {
        return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    const searchProductsRelated = () => {
        axios({
            method: 'GET',
            url: `${apiUrl}/Products`,
            params: {
                filter: {
                    where: {
                        id: { neq: productId },
                        categoryProductId: product?.categoryProduct.id
                    },
                    limit: 4
                }
            }
        }).then((result) => {
            setRelated(result.data);
        }).catch(err => {
            console.log(err)
        })
    }
    const addCart = async (productParams: any) => {
        console.log('eeee', productParams, user)
        if (user) {
            let response = await addToCart({
                productId: productParams.id,
                price: productParams.price,
                userId: user.id
            });
            addToast(response, { appearance: 'info', autoDismiss: true });
        } else {
            addToast('Bạn cần đăng nhập!', { appearance: 'info', autoDismiss: true });
        }
    }

    return (
        <>
            <Header />

            <main>
                <div id="product" className="productDetail-page">

                    {/*  menu header seo */}
                    {/* <div className="breadcrumb-shop">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                                    <ol className="breadcrumb breadcrumb-arrows">
                                        <li>
                                            <a href="/">
                                                <span>Trang chủ</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/shop">
                                                <span>Sản phẩm</span>
                                            </a>
                                        </li>
                                        <li className="active">
                                            <span>
                                                <span itemProp="name">{product?.title}</span>
                                            </span>
                                            <meta itemProp="position" />
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* detail product chính */}
                    <div className="small-container single-product">
                        <div className="row">
                            <div className="col-2">
                                <div className='image-hero'>
                                    <img src={imageHero} width="100%" id="productImg" />
                                </div>
                                <div className="small-img-row">
                                    <div className="small-img-rol">
                                        <img src={img1} width="100%" className="small-img" />
                                    </div>
                                    <div className="small-img-rol">
                                        <img src={img2} width="100%" className="small-img" />
                                    </div>
                                    <div className="small-img-rol">
                                        <img src={img3} width="100%" className="small-img" />
                                    </div>
                                    <div className="small-img-rol">
                                        <img src={img4} width="100%" className="small-img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <p>Home / T-Shirt</p>
                                <h1>Red Printd T-Shirt by Huy</h1>
                                <h4>$50.00</h4>
                                <select>
                                    <option>Select Size</option>
                                    <option>XXL</option>
                                    <option>XL</option>
                                    <option>Large</option>
                                    <option>Medium</option>
                                    <option>Small</option>
                                </select><input type="number" defaultValue={1} />
                                <a href="#" className="btn">Add To Card</a>
                                <h3>Product Detail
                                    <i className="fa fa-indent" />
                                </h3>
                                <br />
                                <p>Surrounded affronting favourable no mr. Lain knew like half she yet joy. Be than dull as seen
                                    very shot. Attachment ye so am travelling estimating projecting is. Off fat address attacks his
                                    besides. Suitable settling mr attended no doubtful feelings. Any over for say bore such sold
                                    five but hung</p>
                            </div>
                        </div>
                    </div>

                </div>
                <RelatedProduct />
            </main >


            <Footer />
        </>
    )
}