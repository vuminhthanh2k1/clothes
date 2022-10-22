import { useState } from 'react';
export default function RightBlog(data: any) {
    // const access_token = localStorage.getItem("token");
    const blogs: any = data.blogs.data && data.blogs.data.length > 0 ? data.blogs.data : [];
    const [accounts, setAccounts] = useState([] as any);
    const [activePage, setActivePage] = useState(1);
    const total = Math.ceil(data.total / 6);
    const current = data.current || 1;
    const pageNum = data.pageNum;
    const array = Array.from(Array(total).keys());
    console.log('blogs', blogs)
    return (
        <>
            <div className="col-md-9 col-sm-12 col-xs-12">
                <div className="heading-page clearfix">
                    <h1>Tin tức</h1>
                </div>
                <div className="blog-content">

                    <div className="list-article-content blog-posts">
                        {blogs.map((item: any, index: any) => {

                            return (
                                <article className="blog-loop" key={index}>
                                    <div className="blog-post row">
                                        <div className="col-md-4 col-xs-12 col-sm-12"
                                            style={{ backgroundImage: `url(${item.photoURL})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                                        >
                                        </div>
                                        <div className="col-md-8 col-xs-12 col-sm-12">
                                            <a href={"/single-post/" + item.id} className="blog-post-thumbnail" style={{color:'black',fontWeight:'bold'}} >{item.title}</a>
                                            <p className="entry-content">{item.metaDescription}</p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    <div className="sortpagibar pagi clearfix text-center">
                        <div id="pagination" className="clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flex items-center justify-center">
                                {array.map((item: any) => {
                                    const num = item + 1;
                                    return (
                                        <a href={"/blog?activePage=" + num}>
                                            <span className={pageNum == item + 1 ? "page-node current" : "page-node"}>{item + 1}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

