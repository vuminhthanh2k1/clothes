import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
import IMG from '../../assets/images/shoes/block_home_category1_grande.jpg'

// const access_token = localStorage.getItem("token");
export default function HomeBanner() {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("DESC")
    const [categoryProducts, setCategoryProducts] = useState({
        total: 0,
        data: []
    })

    useEffect(() => {
        search() // eslint-disable-next-line
    }, [sort])


    const search = async () => {
        await axios({
            method: 'GET',
            url: `${apiUrl}/CategoryProducts`,
            params: {
                // access_token: access_token,
                filter: {
                    limit: 5,
                    order: `createdat ${sort}`
                }
            }
        }).then((result) => {
            setCategoryProducts(result.data);
        }).catch(err => {
            console.log(err)
        })

    }
    return (
        <>
            <section className="section wrapper-home-banner">
                <div className="container-fluid" style={{ paddingBottom: 50 }}>

                    <div className="row">
                        {
                            categoryProducts.data.map((item: any, index: number) => {

                                return (
                                    <div className="col-xs-12 col-sm-4 home-banner-pd">
                                        <div className="block-banner-category">
                                            <a href={`/shop?categoryProduct=${item?.id}`} className="link-banner wrap-flex-align flex-column">
                                                <div className="fg-image fade-box">
                                                    <img className="lazyloaded" src={item?.photoURL} alt="categoryproduct" />
                                                </div>
                                                <figcaption className="caption_banner site-animation">
                                                    <p>Bộ sưu tập</p>
                                                    <h2>
                                                        {item?.title}
                                                    </h2>
                                                </figcaption>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )
}