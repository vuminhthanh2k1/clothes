import banner from '../../assets/images/collection_banner.jpg'
export default function BreadCrumb(data: any) {

    return (
        <>
            <div className="breadcrumb-shop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li>
                                    <a href="/">
                                        <span>Trang chủ</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/shop">
                                        <span>Danh mục</span>
                                    </a>
                                </li>
                                <li>
                                    <span><span style={{ color: '#777777' }}>{data?.categoryProductTitle ? data?.categoryProductTitle : data?.title}</span></span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}