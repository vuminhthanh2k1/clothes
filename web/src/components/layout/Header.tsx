import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Cart from "../../assets/images/cart.png";
import Logo from "../../assets/images/logo_noel2.png";
import Menu from "../../assets/images/menu.png";
// import '../../assets/css/classy-nav.css';
// import img from '../../assets/images/bg-img/24.jpg';
import { apiUrl } from "../../enviroments";
import { AccountInterface } from "../../models/account.interface";
// import { ProductInterface } from '../../models/product.interface';
import { login } from "../../redux/authSlice";
import { Routes } from "../../routes";

export default function Header(data: any) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<AccountInterface>();
  const [products, setProducts] = useState({
    data: [],
    total: 0,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  let { addToast } = useToasts();
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    getMe();
    searchProducts("");
  }, []);
  const getMe = () => {
    if (token) {
      axios({
        method: "GET",
        url: `${apiUrl}/Accounts/get-me`,
        params: {
          access_token: token,
        },
      })
        .then((result) => {
          setUser(result.data);
          dispatch(login(result.data));
        })
        .catch((err) => {
          localStorage.clear();
          console.log(err);
        });
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  //search
  const [show, setShow] = useState(false);
  function handleOnClick() {
    setShow(!show);
  }
  function handleClose() {
    setShow(false);
  }

  const searchProducts = (text: string) => {
    if (!text) {
      text = "";
    }
    axios({
      method: "GET",
      url: `${apiUrl}/Clothes`,
      params: {
        filter: {
          limit: 4,
          order: "createdAt",
          where: {
            title: {
              regexp: `/.*${text}.*/i`,
            },
          },
        },
      },
    })
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const currencyFormat = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };

  // console.log('user',user)
  return (
    <>
      <div className="header">
        <div className="container h-full">
          <div className="navbar flex justify-between h-full">
            <div className="logo">
              <a href="/">
                <img src={Logo} width="125px" />
              </a>
            </div>
            <ul id="MenuItems" className="flex items-center h-full">
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/shop">Sản phẩm</a>
              </li>
              <li>
                <a href="/blog">Bài viết</a>
              </li>
              <li>
                <a href="/about-us">Về chúng tôi</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
              <li className="account-header">
                {user ? (
                  <>
                    <a>Xin chào, {user.lastName}</a>
                    <div>
                      <div className="sub-account">
                        <div className="item-sub">
                          <a href="/profile">Thông tin cá nhân</a>
                        </div>
                        <div className="item-sub">
                          <a href="/favoris">Sản phẩm yêu thích</a>
                        </div>
                        <div className="item-sub">
                          <a href={Routes.Order.path}>Đơn hàng của tôi</a>
                        </div>
                        <div className="item-sub">
                          <a
                            href="/"
                            onClick={() => {
                              window.localStorage.clear();
                            }}
                          >
                            Đăng xuất
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <a href="/login"> Đăng nhập</a>
                )}
              </li>
              <li className="wrap-search" style={{ marginLeft: 20 }}>
                <div onClick={handleOnClick} className="relative">
                  <a className="" uk-toggle="target: #offcanvas-flip">
                    <i className="fas fa-search" style={{ color: "#000" }}></i>
                  </a>
                </div>
                {show ? (
                  <div className="form-search">
                    <div>
                      <form action="#" method="get">
                        <input
                          type="search"
                          name="search"
                          id="search"
                          placeholder="Gõ từ khóa & nhấn Enter..."
                          onChange={(e) => {
                            searchProducts(e.target.value);
                          }}
                        />
                      </form>
                      {/* Close Icon */}
                      <div className="icon-close">
                        {/* <i className="icon-close fas fa-times"></i> */}
                        <span onClick={handleClose}>Đóng</span>
                      </div>
                    </div>
                    <div className="list__item--search">
                      <ul className="flex flex-col">
                        {products.data.map((product: any, index: number) => {
                          return (
                            <div
                              className="single-best-seller-product d-flex align-items-center p-3"
                              key={index}
                              // onClick={() => {
                              //   history.push({
                              //     pathname: Routes.ShopDetails.path,
                              //     state: product?.id
                              //   })
                              // }}
                            >
                              <div className="product-thumbnail">
                                <div className="block h-full">
                                  <img
                                    src={product?.photoURL}
                                    alt=""
                                    style={{
                                      width: 120,
                                      height: 60,
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="product-info">
                                <a href={"/shop-detail/" + product?.id}>
                                  {product?.title}
                                </a>
                                <p>{currencyFormat(product?.price)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
              <li>
                <a href="/cart">
                  <img src={Cart} width="30px" height="30px" />
                </a>
              </li>
            </ul>

            <img src={Menu} className="menu-icon" />
          </div>
        </div>
      </div>
    </>
  );
}
