import img from '../../assets/images/bg-img/40.png'
import product1 from '../../assets/images/shoes/1.jpg'
import product11 from '../../assets/images/shoes/1-1.jpg'
export default function ItemProduct(data: any) {
    const currencyFormat = (num: any) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    const product = data.product;
    return (
        <>
            <div className="col-md-3 col-sm-6 col-xs-6 col-6">
                <div className="product-block">
                    <div className="product-img fade-box">
                        <a href={"/shop-detail/" + product.id} title={product.title} className="img-resize">
                            <img src={product.photoURL} alt="Adidas EQT Cushion ADV" className="lazyloaded" />
                            <img src={product.photoURL} alt="Adidas EQT Cushion ADV" style={{ opacity: .7 }} className="lazyloaded" />
                        </a>
                    </div>
                    <div className="product-detail clearfix">
                        <div className="pro-text">
                            <a style={{ color: 'black', fontSize: '14px', textDecoration: 'none' }} href={"/shop-detail/" + product.id} title={product.title}>
                                {product.title}
                            </a>
                        </div>
                        <div className="pro-price">
                            <p>{currencyFormat(product.price)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}