import IMG from '../../assets/images/shoes/gallery_item_1.jpg';
import IMG1 from '../../assets/images/shoes/gallery_item_2.jpg';
import IMG2 from '../../assets/images/shoes/gallery_item_3.jpg';
import IMG3 from '../../assets/images/shoes/gallery_item_4.jpg';
import IMG4 from '../../assets/images/shoes/gallery_item_5.jpg';
import IMG5 from '../../assets/images/shoes/gallery_item_6.jpg';


// const access_token = localStorage.getItem("token");
export default function RunnerInn() {

    return (
        <>
            <section className="section section-gallery">
                <div className="">
                    <div className="hot_sp" style={{ paddingTop: 70, paddingBottom: 50 }}>
                        <h2 style={{ textAlign: 'center', paddingTop: 10 }}>
                            <a style={{ fontSize: 28, color: 'black', textDecoration: 'none' }} href="">Khách hàng và Runner Inn</a>
                        </h2>
                    </div>
                    <div className="list-gallery clearfix">
                        <ul className="shoes-gp">
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG} alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG1} alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG2} alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG3} alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG4} alt="" />
                                </div>
                            </li>
                            <li>
                                <div className="gallery_item">
                                    <img className="img-resize" src={IMG5} alt="" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}