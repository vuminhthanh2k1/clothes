
import img from '../../assets/images/bg-img/30.jpg';

export default function ItemBestseller() {
    return (
        <>
            {/* Single Best Seller Products */}
            <div className="single-best-seller-product d-flex align-items-center">
                <div className="product-thumbnail">
                    <a href="/shop-detail" className='block h-full'>
                        <img src={img} alt="" />
                    </a>
                </div>
                <div className="product-info">
                    <a href="/shop-detail">Cactus Flower</a>
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