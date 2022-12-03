import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/style.css';
import './style/stylealazea.css';
import './assets/css/flickity.css'
import './assets/css/sign.css.map'
import './assets/css/sign.css'
// import './assets/css/signin.css'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


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
