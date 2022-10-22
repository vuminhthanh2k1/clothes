import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../enviroments";
import ItemProduct from "../shop/ItemProduct";
const access_token = localStorage.getItem("token");
export default function BestSeller() {
    const [sort, setSort] = useState("DESC")
    const [products, setProducts] = useState({
        total: 0,
        data: []
    })

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
                        limit: 4,
                        order: `record ${sort}`
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
            <div className="content best-seller">
                <div className="container">
                    <div className="hot_sp" style={{ paddingBottom: 10 }}>
                        <h2 style={{ textAlign: 'center', paddingTop: 10 }}>
                            <a style={{ fontSize: 28, color: '#000', textDecoration: 'none' }} href="">Sản phẩm bán chạy</a>
                        </h2>
                        <div className="view-all" style={{ textAlign: 'center', paddingTop: -10 }}>
                            <a style={{ color: '#000', textDecoration: 'none' }} href="/shop">Xem thêm</a>
                        </div>
                    </div>
                </div>
                {/* <!--Product--> */}
                <div className="container" style={{ paddingBottom: 50 }}>
                <div className="row">
                        {products.data.map((product: any) => {
                            return <ItemProduct product={product} />
                        })}
                        </div>
                </div>
            </div>
        </>
    )
}