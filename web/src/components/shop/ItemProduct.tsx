import Product1 from '../../assets/images/product-1.jpg'

export default function ItemProduct(data: any) {
    const currencyFormat = (num: any) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    const product = data.product;
    return (
        <>
            <div className="col-4">
                <div className='image-item'><img src={Product1} /></div>
                <h4 className="name-product">Red Printed T-Shirt</h4>
                <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                </div>
                <p>$50.00</p>
            </div>

        </>
    )

}