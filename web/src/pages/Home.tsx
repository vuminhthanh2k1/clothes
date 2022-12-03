import BannerHome from "../components/home/BannerHome";
import Brands from "../components/home/Brand";
import Category from "../components/home/Category";
import FeaturedProduct from "../components/home/FeaturedProduct";
import LastestProduct from "../components/home/LastestProduct";
import Offer from "../components/home/Offer";
import Testimonial from "../components/home/Testimonial";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <>
      <div className="banner-home">
        <Header title="" />
        <BannerHome />
      </div>

      <div className="content">
        <Category />
        <FeaturedProduct />
        <LastestProduct />
        <Offer />
        <Testimonial />
        <Brands />
      </div>

      <Footer />
    </>
  );
}
