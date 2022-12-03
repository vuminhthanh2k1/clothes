import GetInTouch from "../components/contact/GetIntouch";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
export default function Contact() {
  return (
    <>
      <Header title="contact" />
      <div className="wrap-map mb-16">
        <GetInTouch />
      </div>
      <Footer />
    </>
  )
}