import { useState } from 'react';
import imgBlog from '../../assets/images/blog/n-1.jpg'
import TagBlog from './TagBlog';
export default function LeftBlog(data: any) {

    const blogs: any = data && data.blogs.data && data.blogs.data.length > 0 ? data.blogs.data : [];
    const [accounts, setAccounts] = useState([] as any);
    const [activePage, setActivePage] = useState(1);
    return (
        <>
            <div className="col-md-3 d-none d-sm-block d-sm-none d-md-block">
                <div >
                    <div className="news-latest">
                        <div className="sidebarblog-title title_block">
                            <h2>Bài viết mới nhất</h2>
                        </div>
                        <div className="list-news-latest layered">
                            {blogs.map((item: any, index: any) => {
                                return (
                                    <div className="item-article clearfix">
                                        <div className="post-image">
                                            <a >
                                                <img src={item.photoURL} alt="" />
                                            </a>

                                        </div>
                                        <div className="post-content">
                                            <h3>
                                                <a style={{ fontWeight: '600' }} href={"/single-post/" + item.id} >{item.title}</a>
                                            </h3>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="menu-blog">
                        <div className="group-menu">
                            <div className="sidebarblog-title title_block">
                                <h2>Danh mục blog<span className="fa fa-angle-down" /></h2>
                            </div>
                            <div className="layered-category">
                                <TagBlog />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

