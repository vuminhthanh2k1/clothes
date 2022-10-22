import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
// import img1 from '../assets/images/bg-img/26.jpg'
// import img2 from '../assets/images/bg-img/27.jpg'
// import img3 from '../assets/images/bg-img/28.jpg'
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PortfolioInterface } from "../models/portfolio.interface";
import axios from "axios";
import { apiUrl } from "../enviroments";
const access_token = localStorage.getItem("token")

export default function SinglePortfolio() {
    const location = useLocation();
    const portfolioId = location.state;
    const [portfolio, setPortfolio] = useState<PortfolioInterface>();
    const [products, setProducts] = useState({
        total: 0,
        data: []
    })
    useEffect(() => {
        search() // eslint-disable-next-line
    }, [portfolioId])
    const history = useHistory();
    const search = () => {
        axios({
            method: 'GET',
            url: `${apiUrl}/Portfolios/${portfolioId}`,
            params: {
                access_token: access_token,
                filter: {
                    include: 'categoryPortfolio'
                }
            }
        }).then((result) => {
            setPortfolio(result.data);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <Header />

            <section className="portfolio-details-area section-padding-0-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* <!-- Section Heading --> */}
                            <div className="section-heading text-center">
                                <h2>{portfolio?.title}</h2>
                                <p>Category: {portfolio?.categoryPortfolio.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-text mb-100">
                        <div className="row">
                            <div className="col-12 text-center" dangerouslySetInnerHTML={{__html:portfolio?.metaDescription || ''}} >
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center" dangerouslySetInnerHTML={{__html:portfolio?.content || ''}} >
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </>
    )
}