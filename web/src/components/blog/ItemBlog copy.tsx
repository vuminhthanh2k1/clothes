import img from '../../assets/images/bg-img/6.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'

export default function ItemBlog() {
    return (
        <>
            <div className="col-12 col-lg-6">
                <div className="single-blog-post mb-50">
                    <div className="post-thumbnail mb-30">
                        <a href="/single-post">
                            <img src={img} alt="" />
                        </a>
                    </div>
                    <div className="post-content">
                        <a href="single-post.html" className="post-title">
                            <h5>
                                Các nhà thiết kế sân vườn trên toàn quốc dự báo ý tưởng định hình
                                thế giới làm vườn năm 2018
                            </h5>
                        </a>
                        <div className="post-meta flex items-center" >
                            <a href="#">
                                {/* <FontAwesomeIcon className='icon' name={faClock}/> */}
                                <svg style={{ width: 14, height: 14, marginRight: 4, color: '#70c745'  }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 7V13H7V11.5H11V7H12.5Z" />
                                </svg>
                                20 Jun
                                2018
                            </a>
                            <a href="#" >
                                {/* <FontAwesomeIcon className='icon' icon={faUser} />  */}
                                <svg style={{ width: 15, height: 15, marginRight: 4, color: '#70c745'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                </svg>
                                Alan Jackson
                            </a>
                        </div>
                        <p className="post-excerpt">
                            Integer luctus diam ac scerisque consectetur. Vimus ottawas
                            nec lacus sit amet. Aenean interdus mid vitae.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

