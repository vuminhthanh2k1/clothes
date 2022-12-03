import { useHistory } from 'react-router-dom'
import { PortfolioInterface } from '../../models/portfolio.interface'
import { Routes } from '../../routes';


export default function ItemPortfolio({ portfolio }: { portfolio: PortfolioInterface }) {
    const history = useHistory();
    const routerDetail = () => {
        history.push({
            pathname: Routes.SinglePortfolio.path,
            state: portfolio.id
        })
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-lg-3 single_portfolio_item design home-design wow fadeInUp" data-wow-delay="100ms">
                <div className="portfolio-thumbnail bg-img" style={{ backgroundImage: `url(${portfolio.photoURL})` }}></div>
                <div className="portfolio-hover-overlay">
                    <div onClick={routerDetail} className="portfolio-img d-flex align-items-center justify-content-center" title="Portfolio 1">
                        <div className="port-hover-text">
                            <h3>{portfolio.title}</h3>
                            <h5>{portfolio.metaDescription}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}