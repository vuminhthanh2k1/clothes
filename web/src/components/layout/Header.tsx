import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
// import '../../assets/css/classy-nav.css';
// import img from '../../assets/images/bg-img/24.jpg';
import Logo from '../../assets/images/logo.png';
import { apiUrl } from '../../enviroments';
import { AccountInterface } from '../../models/account.interface';
// import { ProductInterface } from '../../models/product.interface';
import { login } from '../../redux/authSlice';
import { Routes } from '../../routes';


export default function Header(data: any) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<AccountInterface>();
  const [products, setProducts] = useState({
    data: [],
    total: 0
  });
  const history = useHistory();
  const dispatch = useDispatch();
  let { addToast } = useToasts();
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    getMe()
  }, [])
  const getMe = () => {
    if (token) {
      axios({
        method: 'GET',
        url: `${apiUrl}/Accounts/get-me`,
        params: {
          access_token: token
        }
      }).then(result => {
        setUser(result.data);
        dispatch(login(result.data))
      }).catch(err => {
        localStorage.clear();
        console.log(err)
      })
    }
  }
  const logout = () => {
    axios.post(`${apiUrl}/Accounts/logout?access_token=${token}`)
      .then(() => {
        localStorage.clear();
        addToast("Success", { appearance: 'success', autoDismiss: true, });
        history.push(Routes.Login.path)
      })
      .catch(function (error) {
        addToast("Login failed", { appearance: 'error', autoDismiss: true });
      })
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);


  //search
  const [show, setShow] = useState(false);
  function handleOnClick() {
    setShow(!show);
  }
  function handleClose() {
    setShow(false)
  }



  const searchProducts = (text: string) => {
    if (!text) {
      text = ""
    }
    axios({
      method: 'GET',
      url: `${apiUrl}/Products`,
      params: {
        filter: {
          limit: 4,
          order: 'createdAt',
          where: {
            title: {
              regexp: `/.*${text}.*/i`
            }
          }
        }
      }
    }).then((result) => {
      setProducts(result.data);
    }).catch(err => {
      console.log(err)
    })
  }
  const currencyFormat = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
  }
  const setActive = ()=>{

  }

  // console.log('user',user)
  return (
    <>
      <div>
        <div className="header">
          <a style={{ color: '#ffffff', textDecoration: "none" }} href="/">MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG NỘI THÀNH 300K
            - ĐỔI TRẢ TRONG 30 NGÀY - ĐẢM BẢO CHẤT LƯỢNG</a>
        </div>

        {/* <!--Navbar--> */}

        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={Logo} className="logo-top" alt="" />
            </a>
            <div className="desk-menu collapse navbar-collapse justify-content-md-center" id="navbarNav">
              <ul className="navbar-nav">
                <li className={data && data.title==""? "nav-item active" : "nav-item"}>  
                  <a className="nav-link" href="/">TRANG CHỦ</a>
                </li>
                <li className={data && data.title=="shop"? "nav-item active" : "nav-item"}>
                  <a className="nav-link" href="/shop">BỘ SƯU TẬP</a>
                </li>
                <li className={data && data.title=="about-us"? "nav-item active" : "nav-item"}>
                  <a className="nav-link" href="/about-us">VỀ CHÚNG TÔI</a>
                </li>
                <li className={data && data.title=="blog"? "nav-item active" : "nav-item"}>
                  <a className="nav-link" href="/blog">BLOG</a>
                </li>
                <li className={data && data.title=="contact"? "nav-item active" : "nav-item"}>
                  <a className="nav-link" href="/contact">LIÊN HỆ</a>
                </li>
              </ul>
            </div>
            <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
              <div className="uk-offcanvas-bar" style={{
                background: "#fff",
                width: 350
              }}>

                <button className="uk-offcanvas-close" style={{ color: "#272727" }} type="button" uk-close></button>

                <h3 style={{
                  fontSize: 14,
                  color: "#272727",
                  textTransform: "uppercase",
                  marginTop: 3, marginBottom: 30,
                  fontWeight: 500, letterSpacing: 2
                }}>Tìm kiếm</h3>
                <div className="search-box wpo-wrapper-search">
                  <form action="search" className="searchform searchform-categoris ultimate-search">
                    <div className="wpo-search-inner" style={{ display: "inline" }}>
                      <input type="hidden" name="type" value="product" />
                      <input required={true} id="inputSearchAuto" name="q" maxLength={40}
                        className="searchinput input-search search-input" type="text" size={20}
                        placeholder="Tìm kiếm sản phẩm..." />
                    </div>
                    <button type="submit" className="btn-search btn" id="search-header-btn">
                      <i style={{ fontWeight: "bold" }} className="fas fa-search"></i>
                    </button>
                  </form>
                  <div id="ajaxSearchResults" className="smart-search-wrapper ajaxSearchResults" style={{ display: "none" }}>
                    <div className="resultsContent">
                      
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* <div id="offcanvas-flip2" uk-offcanvas="flip: true; overlay: true">
              <div className="uk-offcanvas-bar" style={{ background: "#fff", width: 350 }}>

                <button className="uk-offcanvas-close" style={{ color: "#272727" }} type="button" uk-close></button>

                <h3 style={{
                  fontSize: 14,
                  color: "#272727",
                  textTransform: "uppercase",
                  marginTop: 3, marginBottom: 30,
                  fontWeight: 500, letterSpacing: 2
                }}>Giỏ hàng</h3>
                <div className="site-nav-container-last" style={{ color: "#272727" }}>
                  <div className="cart-view clearfix">
                    <table id="cart-view">
                      <tbody>
                        <tr className="item_1">
                          <td className="img"><a href="" title="Nike Air Max 90 Essential &quot;Grape&quot;"><img
                            src="images/shoes/1.jpg" alt="/products/nike-air-max-90-essential-grape" /></a></td>
                          <td>
                            <a className="pro-title-view" style={{ color: "#272727" }} href=""
                              title="Nike Air Max 90 Essential &quot;Grape&quot;">Nike Air Max 90 Essential "Grape"</a>
                            <span className="variant">Tím / 36</span>
                            <span className="pro-quantity-view">1</span>
                            <span className="pro-price-view">4,800,000₫</span>
                            <span className="remove_link remove-cart"><a href=""><i style={{ color: "#272727" }}
                              className="fas fa-times"></i></a></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <span className="line"></span>
                    <table className="table-total">
                      <tbody>
                        <tr>
                          <td className="text-left">TỔNG TIỀN:</td>
                          <td className="text-right" id="total-view-cart">4,800,000₫</td>
                        </tr>
                        <tr>
                          <td className="distance-td"><a href="" className="linktocart button dark">Xem giỏ hàng</a></td>
                          <td><a href="" className="linktocheckout button dark">Thanh toán</a></td>
                        </tr>
                      </tbody>
                    </table>

                    <a href="" target="_blank" className="button btn-check" style={{ textDecoration: 'none' }}><span>Click nhận mã giảm
                      giá ngay !</span></a>
                  </div>
                </div>
              </div>
            </div> */}
    {user&&user.firstName ?          <div className=" h-6">
              <ul className='flex'>
                <li className='account'>
                  <a style={{ color: "#272727"}}>
                    <i className="fas fa-user-alt">{user.firstName} {user.lastName}</i>
                    <div className='account-sub' style={{ width: "150px", textAlign: "left"}}>
                      <ul>
                      <li className='item-sub text-left'>
                        <a href='/profile' onClick={()=>{
                          }}>
                            Hồ sơ
                          </a>
                        </li>
                        <li className='item-sub text-left'>
                        <a href='/order' onClick={()=>{
                          }}>
                            Đơn hàng của tôi
                          </a>
                        </li>
                        <li className='item-sub text-left'>
                          <a href='/' onClick={()=>{
                            window.localStorage.clear();
                          }}>
                            Đăng xuất
                          </a>
                          </li>
                  
                      </ul>
                    </div>
                  </a>
                </li>
                <li className='wrap-search' style={{ marginLeft: 20 }}>
                  <div onClick={handleOnClick} className="relative">
                    <a href="#" className="" uk-toggle="target: #offcanvas-flip">
                      <i className="fas fa-search" style={{ color: "#000" }}></i>
                    </a>
                  </div>
                  {show ?
                    <div className="form-search">
                      <div>
                        <form action="#" method="get">
                          <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Gõ từ khóa & nhấn Enter..."
                            onChange={(e) => {
                              searchProducts(e.target.value)
                            }}
                          />
                        </form>
                        {/* Close Icon */}
                        <div className='icon-close'>
                          {/* <i className="icon-close fas fa-times"></i> */}
                          <span onClick={handleClose}>Đóng</span>
                        </div>
                      </div>
                      <div className="list__item--search">
                        <ul className='flex flex-col'>
                          {products.data.map((product: any, index: number) => {
                                  return (
                                    <div className="single-best-seller-product d-flex align-items-center p-3" key={index}
                                    // onClick={() => {
                                    //   history.push({
                                    //     pathname: Routes.ShopDetails.path,
                                    //     state: product?.id
                                    //   })
                                    // }}
                                    >
                                      <div className="product-thumbnail">
                                        <div className='block h-full'>
                                          <img src={product?.photoURL} alt="" style={{width:120,height:60,objectFit:'contain'}} />
                                        </div>
                                      </div>
                                      <div className="product-info">
                                        <a href={"/shop-detail/" + product?.id}>{product?.title}</a>
                                        <p>{currencyFormat(product?.price)}</p>
                                       
                                      </div>
                                    </div>
                                  )
                                })}
                        </ul>
                      </div>
                    </div>
                    : null
                  }
                </li>
                <li style={{ marginLeft: 20 }}>
                  <a style={{ color: "#272727" }} href="/cart" uk-toggle="target: #offcanvas-flip2">
                    <i className="fas fa-shopping-cart"></i>
                  </a>

                </li>
              </ul>

              <button className="navbar-toggler" type="button" uk-toggle="target: #offcanvas-flip1" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>:           <div className=" h-6">
              <ul className='flex'>
                <li className='account'>
                  <a style={{ color: "#272727"}} href="/login">
                    <i className="fas fa-user-alt"></i>
                    <div className='account-sub'>
                      <ul>
                        <li className='item-sub text-left'>
                          <a href='/login'>
                            Đăng nhập
                          </a>
                        </li>
                        <li className='item-sub mt-2 text-left'>
                          <a href='/sign-up'>
                            Đăng ký
                          </a>
                        </li>
                      </ul>
                    </div>
                  </a>
                </li>
                <li className='wrap-search' style={{ marginLeft: 20 }}>
                  <div onClick={handleOnClick} className="relative">
                    <a href="#" className="" uk-toggle="target: #offcanvas-flip">
                      <i className="fas fa-search" style={{ color: "#000" }}></i>
                    </a>
                  </div>
                  {show ?
                    <div className="form-search">
                      <div>
                        <form action="#" method="get">
                          <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Gõ từ khóa & nhấn Enter..."
                            onChange={(e) => {
                              searchProducts(e.target.value)
                            }}
                          />
                        </form>
                        {/* Close Icon */}
                        <div className='icon-close'>
                          {/* <i className="icon-close fas fa-times"></i> */}
                          <span onClick={handleClose}>Đóng</span>
                        </div>
                      </div>
                      <div className="list__item--search">
                        <ul className='flex flex-col'>
                          {products.data.map((product: any, index: number) => {
                                  return (
                                    <div className="single-best-seller-product d-flex align-items-center p-3" key={index}
                                    onClick={() => {
                                      history.push({
                                        pathname: Routes.ShopDetails.path,
                                        state: product?.id
                                      })
                                    }}
                                    >
                                      <div className="product-thumbnail">
                                        <div className='block h-full'>
                                          <img src={product?.photoURL} alt="" style={{width:120,height:60,objectFit:'contain'}} />
                                        </div>
                                      </div>
                                      <div className="product-info">
                                        <a href={"/shop-detail/" + product?.id}>{product?.title}</a>
                                        <p>{currencyFormat(product?.price)}</p>
                                       
                                      </div>
                                    </div>
                                  )
                                })}
                        </ul>
                      </div>
                    </div>
                    : null
                  }
                </li>
                <li style={{ marginLeft: 20 }}>
                  <a style={{ color: "#272727" }} href="/cart" uk-toggle="target: #offcanvas-flip2">
                    <i className="fas fa-shopping-cart"></i>
                  </a>

                </li>
              </ul>

              <button className="navbar-toggler" type="button" uk-toggle="target: #offcanvas-flip1" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>}
  
          </div>
        </nav>
      </div>
    </>
  )
}