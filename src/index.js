import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 引入Cookie
import Cookies from 'react-cookies';

// 引入路由
import * as Router from 'react-router-dom';

// 引入vant UI
import * as Vant from 'react-vant';

// 引入vant-icon图标库
import * as Icon from '@react-vant/icons';

// 全局挂载
React.Cookies = Cookies;
React.Router = Router;
React.Vant = Vant;
React.Icon = Icon

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
