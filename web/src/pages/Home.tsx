import img1 from '../assets/images/slideshow_1.jpg';
import img2 from '../assets/images/slideshow_2.jpg';
import BestSeller from '../components/home/BestSeller';
import FormMail from '../components/home/FormMail';
import HomeBanner from '../components/home/HomeBanner';
import NewBlog from '../components/home/NewBlog';
import NewProduct from '../components/home/NewProduct';
import RunnerInn from '../components/home/RunnerInn';
import SlideBanner from '../components/home/SlideBanner';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function Home() {
  return (
    <>
      <Header  title=""/>

      <div className="owl-carousel owl-theme owl-carousel-setting">
        <div className="item"><img src={img1} className="d-block w-100" alt="..." /></div>
        <div className="item"><img src={img2} className="d-block w-100" alt="..." /></div>
      </div>

      <div className="content">
        <SlideBanner />
        <BestSeller />
        <HomeBanner />
        <NewProduct />
        <NewBlog />
        <FormMail />
        <RunnerInn />
      </div>


      <Footer />

    </>
  )
}

