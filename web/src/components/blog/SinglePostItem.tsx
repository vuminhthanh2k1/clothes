import moment from "moment";

export default function SinglePostItem(data: any) {
    const blog = data.blog || {};
    const account = blog.account || {};
    const content = blog.content || '';
    return (
        <>
            <div className="col-md-9 col-sm-12 col-xs-12 article-area">
                <div className="content-page">
                    <div className="article-content">
                        <div className="box-article-heading clearfix">
                            <h1 className="sb-title-article">{blog.title}</h1>
                            <ul className="article-info-more" style={{ paddingLeft: 0 }}>
                                <li> Người viết: {account?.firstName} {account?.lastName} lúc {moment(blog?.updatedAt).format("HH:mm DD-MM-YYYY")}</li>
                            </ul>
                        </div>
                        <div className="box-article-heading clearfix">
                            <h4 >{blog?.metaDescription}</h4>
                        </div>
                        <div className="article-pages" dangerouslySetInnerHTML={{ __html: content }}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

