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
                    <div className="breadcrumb-shop">
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
                    </div>

                    {/* detail product chính */}
                    <div className="container">
                        <div className="row product-detail-wrapper">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="row product-detail-main pr_style_01">
                                    <div className="col-md-7 col-sm-12 col-xs-12">
                                        <div className="product-gallery">
                                            <div className="product-gallery__thumbs-container hidden-sm hidden-xs">
                                                <div className="product-gallery__thumbs thumb-fix">
                                                    <div className="product-gallery__thumb  active" id="imgg1">
                                                        <a className="product-gallery__thumb-placeholder">
                                                            <img src={product?.photoURL} alt={product?.title} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-image-detail box__product-gallery scroll hidden-xs">
                                                <ul id="sliderproduct" className="site-box-content slide_product">
                                                    <li className="product-gallery-item gallery-item current " id="imgg1a">
                                                        <img className="product-image-feature " src={product?.photoURL} alt="" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="product-gallery-slide">
                                            <div className="owl-carousel owl-theme owl-product-gallery-slide">
                                                <div className="item">
                                                    <div className="product-gallery__thumb">
                                                        <a className="product-gallery__thumb-placeholder" href="javascript:void(0);" data-image="../assets/images/detailproduct/1.jpg" data-zoom-image="../assets/images/detailproduct/1.jpg">
                                                            <img src={product?.photoURL} alt={product?.title} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-12 col-xs-12 product-content-desc" id="detail-product">
                                        <div className="product-content-desc-1">
                                            <div className="product-title">
                                                <h1>{product?.title}</h1>
                                                <span id="pro_sku">Xuất xứ: {product?.origin}</span>
                                            </div>
                                            <div className="product-price" id="price-preview"><span className="pro-price">{currencyFormat(product?.price)}</span></div>
                                            <form id="add-item-form" action="/cart/add" method="post" className="variants clearfix">
                                                <div className="select-swatch clearfix">
                                                    <div id="variant-swatch-0" className="swatch clearfix" data-option="option1" data-option-index={0}>
                                                        <div className="header" style={{ background: 'white', color: '#272727' }}><span>Màu sắc</span></div><span>{product?.color}</span>
                                                    </div>
                                                </div>
                                                <div className="selector-actions">
                                                    <div className="wrap-addcart clearfix">
                                                        <div className="row-flex">
                                                            <button type="button" className="button btn-addtocart addtocart-modal" onClick={() => addCart(product)}>Thêm
                                                                vào</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="product-description">
                                                <div className="title-bl">
                                                    <div dangerouslySetInnerHTML={{ __html: product?.content || '' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <RelatedProduct related={related} />

                            </div>
                        </div>
                    </div>
                </div>
            </main >


            <Footer />
        </>
    )
}