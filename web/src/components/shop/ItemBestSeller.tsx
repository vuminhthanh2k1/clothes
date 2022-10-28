import Product1 from '../../assets/images/category-1.jpg'

export default function ItemBestSeller(data: any) {
    const currencyFormat = (num: any) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    const product = data.product;
    return (
        <>
            <div className="single-best-seller-product d-flex align-items-center">
                <div className="product-thumbnail">
                    <a href="/shop-details">
                        <img src={Product1} alt="" />
                    </a>
                </div>
                <div className="product-info">
                    <a className='bs-name-product' href="/shop-details">Cactus Flower</a>
                    <p>$10.99</p>
                    <div className="ratings">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                    </div>
                </div>
            </div>
        </>
    )

}