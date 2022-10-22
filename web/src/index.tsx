import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/style.css';
import './assets/plugins/animate/animate.min.css'
import './assets/plugins/bootstrap/bootstrap.min.css'
import './assets/plugins/fontawesome/fontawesome.min.css'
import './assets/plugins/fontawesome/fontawesome.min.css'
import './assets/plugins/owl.carousel/owl.carousel.min.css'
import './assets/plugins/owl.carousel/owl.theme.default.min.css'
import './assets/plugins/uikit/uikit.min.css'
// import './assets/css/bootstrap.css'
import './assets/css/flickity.css'
import './assets/css/sign.css.map'
import './assets/css/sign.css'
// import './assets/css/signin.css'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismissTimeout={3000} >
      <Provider store={store}>
        <App />
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root'),

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
