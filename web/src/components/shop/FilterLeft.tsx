export default function FilterLeft() {

    return (
        <>
            <div className="col-md-3 col-sm-12 col-xs-12 sidebar-fix">
                <div className="wrap-filter">
                    <div className="box_sidebar">
                        <div className="block left-module">
                            <div className=" filter_xs">
                                <div className="group-menu">
                                    <div className="title_block d-block d-sm-none d-none d-sm-block d-md-none" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample1">
                                        Danh mục sản phẩm
                                        <span><i className="fa fa-angle-down" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample1" /></span>
                                    </div>
                                    <div className="block_content layered-category collapse" id="collapseExample1">
                                        <div className="layered-content card card-body" style={{ border: 0, padding: 0 }}>
                                            <ul className="menuList-links">
                                                <li><a href="home.html" title="Trang chủ"><span>Trang chủ</span></a></li>
                                                <li className=" active "><a href="product.html" title="Bộ sưu tập"><span>Bộ sưu tập</span></a>
                                                </li>
                                                <li className="has-submenu level0 ">
                                                    <a title="Sản phẩm">Sản phẩm<span className="icon-plus-submenu" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample" /></a>
                                                    <div className="collapse" id="collapseExample">
                                                        <div className="card card-body" style={{ border: 0, paddingTop: 0 }}>
                                                            <ul className="menu-product">
                                                                <li><a href="detailproduct.html" title="Sản phẩm - Style 1">Sản phẩm - Style 1</a></li>
                                                                <li><a href="detailproduct.html" title="Sản phẩm - Style 2">Sản phẩm - Style 2</a></li>
                                                                <li><a href="detailproduct.html" title="Sản phẩm - Style 3">Sản phẩm - Style 3</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li><a href="introduce.html" title="Giới thiệu"><span>Giới thiệu</span></a></li>
                                                <li><a href="blog.html" title="Blog"><span>Blog</span></a></li>
                                                <li><a href="contact.html" title="Liên hệ"><span>Liên hệ</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="layered">
                                    <p className="title_block d-block d-sm-none d-none d-sm-block d-md-none" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample2">
                                        Bộ lọc sản phẩm
                                        <span><i className="fa fa-angle-down" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample2" /></span>
                                    </p>
                                    <div className="block_content collapse" id="collapseExample2">
                                        <div className="group-filter card card-body" style={{ border: 0, padding: 0 }} aria-expanded="true">
                                            <div className="layered_subtitle dropdown-filter"><span>Thương hiệu</span><span className="icon-control"><i className="fa fa-minus" /></span></div>
                                            <div className="layered-content bl-filter filter-brand">
                                                <ul className="check-box-list">
                                                    <li>
                                                        <input type="checkbox" id="data-brand-p1" defaultValue="Khác" />
                                                        <label htmlFor="data-brand-p1">Khác</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="group-filter" aria-expanded="true">
                                            <div className="layered_subtitle dropdown-filter"><span>Giá sản phẩm</span><span className="icon-control"><i className="fa fa-minus" /></span></div>
                                            <div className="layered-content bl-filter filter-price">
                                                <ul className="check-box-list">
                                                    <li>
                                                        <input type="checkbox" id="p1" />
                                                        <label htmlFor="p1">
                                                            <span>Dưới</span> 500,000₫
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="p2" />
                                                        <label htmlFor="p2">
                                                            500,000₫ - 1,000,000₫
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="p3" />
                                                        <label htmlFor="p3">
                                                            1,000,000₫ - 1,500,000₫
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="p4" />
                                                        <label htmlFor="p4">
                                                            2,000,000₫ - 5,000,000₫
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="p5" />
                                                        <label htmlFor="p5">
                                                            <span>Trên</span> 5,000,000₫
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="group-filter" aria-expanded="true">
                                            <div className="layered_subtitle dropdown-filter"><span>Màu sắc</span><span className="icon-control"><i className="fa fa-minus" /></span></div>
                                            <div className="layered-content filter-color s-filter">
                                                <ul className="check-box-list">
                                                    <li>
                                                        <input type="checkbox" id="data-color-p1" />
                                                        <label htmlFor="data-color-p1" style={{ backgroundColor: '#fb4727' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p2" />
                                                        <label htmlFor="data-color-p2" style={{ backgroundColor: '#fdfaef' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p3" />
                                                        <label htmlFor="data-color-p3" style={{ backgroundColor: '#3e3473' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p4" />
                                                        <label htmlFor="data-color-p4" style={{ backgroundColor: '#ffffff' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p5" />
                                                        <label htmlFor="data-color-p5" style={{ backgroundColor: '#75e2fb' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p6" />
                                                        <label htmlFor="data-color-p6" style={{ backgroundColor: '#cecec8' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p7" />
                                                        <label htmlFor="data-color-p7" style={{ backgroundColor: '#6daef4' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p8" />
                                                        <label htmlFor="data-color-p8" style={{ backgroundColor: '#000000' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p9" />
                                                        <label htmlFor="data-color-p9" style={{ backgroundColor: '#e2262a' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p10" />
                                                        <label htmlFor="data-color-p10" style={{ backgroundColor: '#ee8aa1' }} />
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-color-p11" />
                                                        <label htmlFor="data-color-p11" style={{ backgroundColor: '#4a5250' }} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="group-filter" aria-expanded="true">
                                            <div className="layered_subtitle dropdown-filter"><span>Kích thước</span><span className="icon-control"><i className="fa fa-minus" /></span></div>
                                            <div className="layered-content filter-size s-filter">
                                                <ul className="check-box-list clearfix">
                                                    <li>
                                                        <input type="checkbox" id="data-size-p1" />
                                                        <label htmlFor="data-size-p1">35</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-size-p2" />
                                                        <label htmlFor="data-size-p2">36</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-size-p3" />
                                                        <label htmlFor="data-size-p3">37</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-size-p4" />
                                                        <label htmlFor="data-size-p4">38</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-size-p5" />
                                                        <label htmlFor="data-size-p5">39</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="data-size-p6" />
                                                        <label htmlFor="data-size-p6">40</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                abc
            </div>
        </>
    )

}