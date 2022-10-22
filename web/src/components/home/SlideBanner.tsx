import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
import Slider from "react-slick";
import banner1 from '../../assets/images/slideshow_1.jpg'
import banner2 from '../../assets/images/slideshow_2.jpg'
const access_token = localStorage.getItem("token");
export default function SlideBanner() {
    const [banners, setBanners] = useState({
        total: 0,
        data: []
    })
    const [sort, setSort] = useState("ASC")
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
        // prevArrow: '.slick-prev',
        // nextArrow: '.slick-next',
    };

    
    useEffect(() => {
        search() // eslint-disable-next-line
    }, [sort])
    
    const search = async () => {
        await  axios({
                method: 'GET',
                url: `${apiUrl}/Banners`,
                params: {
                    access_token: access_token,
                    filter: {
                        limit: 4,
                        order: `createdat ${sort}`
                    }
                }
            }).then((result) => {
                setBanners(result.data);
            }).catch(err => {
                console.log(err)
            })
        
    }
    return (
        <>
            <div className="" style={{ width: '100%', margin: 'auto', marginBottom: 50 }}>
                <Slider {...settings}>
                    {banners.data.map((item: any, index: any) => {
                        return (
                            <div key={index} className="item">
                                <img src={item?.photoURL} alt="..." className="d-block w-100"/>
                            </div>
                        )
                    })}
                    {/* <div className="item">
                        <img src={banner1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="item">
                        <img src={banner2} className="d-block w-100" alt="..." />
                    </div> */}
                </Slider>
            </div>
        </>
    )
}