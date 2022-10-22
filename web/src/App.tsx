import './style/style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import ShopDetails from './pages/ShopDetails';
import SinglePortfolio from './pages/SinglePortfolio';
import SinglePost from './pages/SinglePost';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Routes } from './routes';
import Order from './pages/Order';
import OrderDetailPage from './pages/OrderDetailPage';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import PaymentSuccess from './pages/PaymentSuccess';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.Dashboard.path} component={Home} />
        <Route exact path={Routes.Contact.path} component={Contact} />
        <Route exact path={Routes.Blog.path} component={Blog} />
        <Route exact path={Routes.Cart.path} component={Cart} />
        <Route exact path={Routes.PaymentSuccess.path} component={PaymentSuccess} />
        <Route exact path={Routes.About.path} component={About} />
        <Route exact path={Routes.Checkout.path} component={Checkout} />
        <Route exact path={Routes.Portfolio.path} component={Portfolio} />
        <Route exact path={Routes.Shop.path} component={Shop} />
        <Route exact path={Routes.ShopDetails.path} component={ShopDetails} />
        <Route exact path={Routes.Signup.path} component={Signup} />
        <Route exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
        <Route exact path={Routes.NewPassword.path} component={NewPassword} />
        <Route exact path={Routes.Login.path} component={Login} />
        <Route exact path={Routes.SinglePortfolio.path} component={SinglePortfolio} />
        <Route exact path={Routes.SinglePost.path} component={SinglePost} />
        <Route exact path={Routes.Profile.path} component={Profile} />
        <Route exact path={Routes.Order.path} component={Order} />
        <Route exact path={Routes.OrderDetail.path} component={OrderDetailPage} />

      </Switch>
    </Router>
  );
}

export default App;
