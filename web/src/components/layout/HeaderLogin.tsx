import img from '../../assets/images/bg-img/24.jpg';
import '../../assets/css/classy-nav.css';
import Logo from '../../assets/images/core-img/logo.png';
import { useEffect, useState } from 'react';
import { faCartShopping, faUser, faSearch, faTimes, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HeaderLogin() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);
    return (
        <>
            <header className="header-area">
                {/* ***** Top Header Area ***** */}
                <div className="top-header-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="top-header-content d-flex align-items-center justify-content-between">
                                    {/* Top Header Content */}
                                    <div className="top-header-meta">
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title=" 11192264@st.neu.edu.vn"
                                        >
                                            <i className="fa fa-envelope-o" aria-hidden="true" />
                                            <span>Email: 11192264@st.neu.edu.vn</span>
                                        </a>
                                        <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="+1 234 122 122"
                                        >
                                            <i className="fa fa-phone" aria-hidden="true" />
                                            <span>Call Us: +1 234 122 122</span>
                                        </a>
                                    </div>
                                    {/* Top Header Content */}
                                    <div className="top-header-meta d-flex h-full flex items-center">
                                        {/* Language Dropdown */}
                                        <div className="language-dropdown h-full flex items-center">
                                            <div className="dropdown h-full flex items-center">
                                                <button
                                                    className="language-dropdown btn btn-secondary dropdown-toggle mr-30"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    Language
                                                </button>
                                                <div
                                                    className="dropdown-menu item-language"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    <a className="dropdown-item" href="#">
                                                        USA
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Tiếng Việt
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                        {/* Login */}
                                        <div className="login login-header h-full flex items-center">
                                            <a>
                                                {/* <FontAwesomeIcon className='icon' icon={faUser} /> */}
                                                <span>Bùi Thắng</span>
                                            </a>
                                            <div className='sub-user'>
                                                <div className='wrap-sub w-full py-3'>
                                                    <a href='/profile'>
                                                        <p>Thông tin tài khoản</p>
                                                    </a>
                                                    <a>
                                                        <p>Đơn hàng của tôi</p>
                                                    </a>

                                                    <a>
                                                        <p>Đăng xuất</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Cart */}
                                        <div className="cart h-full flex items-center">
                                            <a href="/cart">
                                                {/* <FontAwesomeIcon className='icon' icon={faCartShopping} /> */}
                                                <span>
                                                    Cart <span className="cart-quantity">(1)</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ***** Navbar Area ***** */}
                <div id="sticky-wrapper" className={scrollPosition > 42 ? 'sticky-wrapper is-sticky' : 'sticky-wrapper'} style={{ height: 90 }}>
                    <div className={scrollPosition > 42 ? 'alazea-main-menu scrollNavbarArea' : 'alazea-main-menu'}>
                        <div className="classy-nav-container light left breakpoint-off">
                            <div className="container">
                                {/* Menu */}
                                <nav className="classy-navbar justify-content-between" id="alazeaNav">
                                    {/* Nav Brand */}
                                    <a href="/" className="nav-brand">
                                        <img src={Logo} alt="" />
                                    </a>
                                    {/* Navbar Toggler */}
                                    <div className="classy-navbar-toggler">
                                        <span className="navbarToggler">
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </div>
                                    {/* Menu */}
                                    <div className="classy-menu">
                                        {/* Close Button */}
                                        <div className="classycloseIcon">
                                            <div className="cross-wrap">
                                                <span className="top" />
                                                <span className="bottom" />
                                            </div>
                                        </div>
                                        {/* Navbar Start */}
                                        <div className="classynav">
                                            <ul>
                                                <li>
                                                    <a href="/">Home</a>
                                                </li>
                                                <li>
                                                    <a href="/about-us">About</a>
                                                </li>
                                                <li>
                                                    <a href="/blog">Blog</a>
                                                </li>
                                                <li>
                                                    <a href="/shop">Shop</a>
                                                </li>
                                                <li>
                                                    <a href="/portfolio">Portfolio</a>
                                                </li>
                                                <li>
                                                    <a href="/contact">Contact</a>
                                                </li>
                                            </ul>
                                            {/* Search Icon */}
                                            <div id="searchIcon">
                                                {/* <FontAwesomeIcon className='icon' icon={faSearch} /> */}

                                            </div>
                                        </div>
                                        {/* Navbar End */}
                                    </div>
                                </nav>
                                {/* Search Form */}
                                <div className="search-form">
                                    <form action="#" method="get">
                                        <input
                                            type="search"
                                            name="search"
                                            id="search"
                                            placeholder="Type keywords & press enter..."
                                        />
                                        <button type="submit" className="d-none" />
                                    </form>
                                    {/* Close Icon */}
                                    <div className="closeIcon">
                                        {/* <FontAwesomeIcon className='icon' icon={faTimes} /> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            <div className="breadcrumb-area">
                {/* Top Breadcrumb Area */}
                <div
                    className="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center"
                    style={{ backgroundImage: `${img}` }}
                >
                    <h2>HOME DEFAULT</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">
                                            {/* <FontAwesomeIcon style={{ fontSize: 13, marginBottom: 2, marginRight: 3 }} className='icon' icon={faHome} /> */}
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Blog
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}