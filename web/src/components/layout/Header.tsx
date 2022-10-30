import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
// import '../../assets/css/classy-nav.css';
// import img from '../../assets/images/bg-img/24.jpg';
import { apiUrl } from '../../enviroments';
import { AccountInterface } from '../../models/account.interface';
// import { ProductInterface } from '../../models/product.interface';
import { login } from '../../redux/authSlice';
import { Routes } from '../../routes';
import Cart from '../../assets/images/cart.png';
import Logo from '../../assets/images/logo.png';
import Menu from '../../assets/images/menu.png';

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
  const setActive = () => {

  }

  // console.log('user',user)
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <a href="/"><img src={Logo} width="125px" /></a>
            </div>
            <nav>
              <ul id="MenuItems">
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Products</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/profile">Account</a></li>
              </ul>
            </nav>
            <a href="/cart"><img src={Cart} width="30px" height="30px" /></a>
            <img src={Menu} className="menu-icon" />
          </div>
          
        </div>
      </div>

    </>
  )
}