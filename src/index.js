import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'antd/dist/antd.css';

import Login from "./com/login";
import { Form } from 'antd';
import Reg from "./com/reg";
import MyRouter from "./router/myrouter";

const MyLogin = Form.create()(Login);
const MyReg = Form.create()(Reg);
ReactDOM.render(<MyRouter />, document.getElementById('root'));
//registerServiceWorker();
