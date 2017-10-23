/**
 * Created by Administrator on 2017/10/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch
} from 'react-router-dom';
import  Home from '../com/home.js'
import  Login from '../com/login.js'

import  Reg from '../com/reg.js'
const LoginForm=Form.create()(Login)
const RegForm=Form.create()(Reg)

export default class MyRouter extends React.Component{

    render(){
        return(
            <div>
                <Router >
                    <div>
                        <Route exact path="/" component={Home}/>

                        <Route path="/login" component={LoginForm}/>
                        <Route path="/reg" component={RegForm}/>
                    </div>


                </Router>
            </div>
        )
    }
}
// const Logout=()=>{
//     console.log(123)
//     return (
//         <div>
//
//         </div>
//     )
//
// }