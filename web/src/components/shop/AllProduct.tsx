import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemProduct from './ItemProduct';

export default function AllProduct(data: any) {
    const products: any = data.products.data && data.products.data.length > 0 ? data.products.data : [];
    const categoryProductTitle = data.categoryProductTitle;
    const categoryProduct = data.categoryProduct;
    const total = Math.ceil(data.total / 8);
    const current = data.current || 1;
    const pageNum = data.pageNum;
    const [sort, setSort] = useState(data.sort || "ASC");
    const array = Array.from(Array(total).keys());
    const history = useHistory();
    const [activePage, setActivePage] = useState(current);
    const options = [
        {
            name: 'Giá: Tăng dần',
            value: 'ASC',
        },
        {
            name: 'Giá: Giảm dần',
            value: 'DESC',
        },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0].value == sort ? options[0].value : options[1].value);
    return (
        <>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="wrap-collection-title row">
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <h1 className="title">
                                    {categoryProductTitle ? categoryProductTitle : "Tất cả sản phẩm"}
                                </h1>
                                <div className="alert-no-filter" />
                            </div>
                            <div className="col-md-4 d-sm-none d-md-block d-none d-sm-block" style={{ float: 'left' }}>
                                <div className="option browse-tags">
                                    <span className="custom-dropdown custom-dropdown--grey">
                                        <select onChange={(e) => {
                                            categoryProduct ? history.push(`/shop?activePage=${activePage}&price=${e.target.value}&categoryProduct=${categoryProduct}`) : history.push(`/shop?activePage=${activePage}&price=${e.target.value}`);
                                            window.location.reload();
                                        }} value={selectedOption}>
                                            {options.map(item => (
                                                <option key={item.value} value={item.value}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {products.map((product: any) => {
                                return <ItemProduct product={product} />
                            })}

                        </div>
                        <div className="sortpagibar pagi clearfix text-center">
                            <div id="pagination" className="clearfix">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flex items-center justify-center">
                                    {array.map((item: any) => {
                                        const num = item + 1;
                                        // setActivePage(num);
                                        return (
                                            <a href={categoryProduct ? `/shop?activePage=${num}&price=${sort}&categoryProduct=${categoryProduct}` : `/shop?activePage=${num}&price=${sort}` }>
                                                <span className={pageNum == item + 1 ? "page-node current" : "page-node"}>{item + 1}</span>
                                            </a>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}