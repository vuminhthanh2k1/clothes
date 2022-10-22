import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiUrl } from "../../enviroments";
const access_token = localStorage.getItem("token");
export default function NewProduct() {

    const [data,setData] = useState([]);

    const settings = {
        // dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    const [sort, setSort] = useState("DESC")
    const [products, setProducts] = useState({
        total: 0,
        data: []
    })
    const currencyFormat = (num: any) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
      }
    useEffect(() => {
        search() // eslint-disable-next-line
    }, [sort])

    const search = async () => {
        await  axios({
                method: 'GET',
                url: `${apiUrl}/Products`,
                params: {
                    access_token: access_token,
                    filter: {
                        limit: 8,
                        order: `createdat ${sort}`
                    }
                }
            }).then((result) => {
                setProducts(result.data);
            }).catch(err => {
                console.log(err)
            })
        
    }
    return (
        <>
            <section>
                <div className="content">
                    <div className="container">
                        <div className="hot_sp">
                            <h2 style={{ textAlign: 'center' }}>
                                <a style={{ fontSize: 28, color: 'black', textDecoration: 'none' }} href="">Sản phẩm mới</a>
                            </h2>
                            <div className="view-all" style={{ textAlign: 'center' }}>
                                <a style={{ color: 'black', textDecoration: 'none' }} href="/shop">Xem thêm</a>
                            </div>
                        </div>
                    </div>
                    {/* <!--Product--> */}
                </div>
                <div className="container product" style={{ width: '100%', margin: 'auto' }}>
                    <Slider {...settings}>
                        {products.data.map((item : any, index) => {
                            return (
                                <div className="item">
                                    <div className="product-block">
                                        <div className="product-img fade-box">
                                        <a href={"/shop-detail/"+item.id} title ={item.title}className="img-resize">
                                                <img src={item.photoURL} alt="Adidas Ultraboost W" className="lazyloaded" />
                                                <img src={item.photoURL} alt="Adidas Ultraboost W" className="lazyloaded" />
                                            </a>
    
                                        </div>
                                        <div className="product-detail clearfix">
                                            <div className="pro-text">
                                                <a style={{ color: 'black', fontSize: 14, textDecoration: 'none' }} href={"/shop-detail/"+item.id} title={item.title}>
                                                    {item.title}
                                                </a>
                                            </div>
                                            <div className="pro-price">
                                                <p className="">{currencyFormat(item.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
   
                    </Slider>
                </div>
            </section>
        </>
    )
}