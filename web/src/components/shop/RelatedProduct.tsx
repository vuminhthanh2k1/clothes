import related1 from "../../assets/images/shoes/800502_01_e92c3b2bb8764b52a791846d84a3a360_grande.jpg"
import faded1 from "../../assets/images/shoes/shoes fade 1.jpg"

export default function RelatedProduct(data: any) {
    const related = data.related || [];
    const currencyFormat = (num: any) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    return (
        <>
            <div className="list-productRelated clearfix">
                <div className="heading-title text-center">
                    <h2>Sản phẩm liên quan</h2>
                </div>
                <div className="container">
                    <div className="row">
                        {related.data.map((product: any) => {

                            return (
                                <div className="col-md-3 col-sm-6 col-xs-6 col-6">
                                <div className="product-block">
                                    <div className="product-img fade-box">
                                        <a href={"/shop-detail/"+product?.id}  title={product?.title} className="img-resize">
                                            <img src={product?.photoURL} alt={product?.title} className="lazyloaded" />
                                            <img src={product?.photoURL}  alt={product?.title} className="lazyloaded" />
                                        </a>
                                    </div>
                                    <div className="product-detail clearfix">
                                        <div className="pro-text">
                                            <a style={{ color: 'black', fontSize: '14px', textDecoration: 'none' }} href={"/shop-detail/"+product?.id} title={product?.title} >
                                            {product?.title} 
                                            </a>
                                        </div>
                                        <div className="pro-price">
                                            <p>{currencyFormat(product?.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                        {/* <div className="col-md-3 col-sm-6 col-xs-6 col-6">
                            <div className="product-block">
                                <div className="product-img fade-box">
                                    <a href="#" title="Adidas EQT Cushion ADV" className="img-resize">
                                        <img src={related1} alt="Adidas EQT Cushion ADV" className="lazyloaded" />
                                        <img src={faded1} alt="Adidas EQT Cushion ADV" className="lazyloaded" />
                                    </a>
                                </div>
                                <div className="product-detail clearfix">
                                    <div className="pro-text">
                                        <a style={{ color: 'black', fontSize: '14px', textDecoration: 'none' }} href="#" title="Adidas EQT Cushion ADV">
                                            Adidas EQT Cushion ADV "North America"
                                        </a>
                                    </div>
                                    <div className="pro-price">
                                        <p>7,000,000₫</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    )

}