import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import RunnerInn from "../components/home/RunnerInn";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import AllProduct from "../components/shop/AllProduct";
import BannerShop from "../components/shop/BannerShop";
import BreadCrumb from "../components/shop/BreadCrumb";
import { apiUrl } from "../enviroments";

const access_token = localStorage.getItem("token");
export default function Shop() {
    const activePageinit = Number(new URLSearchParams(useLocation().search).get('activePage'));
    const priceInit = String(new URLSearchParams(useLocation().search).get('price'));
    const categoryProduct = Number(new URLSearchParams(useLocation().search).get('categoryProduct'));
    const [products, setProducts] = useState({
        total: 0,
        data: []
    })
    const [categoryProductTitle, setCategoryProductTitle] = useState("");
    const [sort, setSort] = useState(priceInit == "DESC" ? "DESC" : "ASC");
    useEffect(() => {
        search() // eslint-disable-next-line
    }, [])

    const history = useHistory();
    let { addToast } = useToasts();
    const search = () => {
        if (categoryProduct) {
            axios({
                method: 'GET',
                url: `${apiUrl}/Products`,
                params: {
                    filter: {
                        limit: 8,
                        skip: 8 * ((activePageinit || 1) - 1),
                        where: {
                            categoryProductId: categoryProduct
                        },
                        order: `price ${sort}`,
                        include: 'categoryProduct'
                    }
                }
            }).then((result) => {
                setProducts(result.data);
                setCategoryProductTitle(result.data.data[0]?.title)
            }).catch(err => {
                console.log(err)
            })
        } else {
            axios({
                method: 'GET',
                url: `${apiUrl}/Products`,
                params: {
                    access_token: access_token,
                    filter: {
                        limit: 8,
                        skip: 8 * ((activePageinit || 1) - 1),
                        order: `price ${sort}`
                    }
                }
            }).then((result) => {
                setProducts(result.data);
            }).catch(err => {
                console.log(err)
            })
        }
    }
    console.log("categoryProductTitle",categoryProductTitle)
    return (
        <>
            <Header title="shop" />
            <BannerShop />
            <BreadCrumb title={"Tất cả sản phẩm"} categoryProductTitle={categoryProductTitle} />
            <AllProduct sort={sort} categoryProduct={categoryProduct} categoryProductTitle={categoryProductTitle} products={products} total={products.total} pageNum={activePageinit} />
            <RunnerInn />
            <Footer />
        </>
    )
}