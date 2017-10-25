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
import  Init from '../com/init.js'
import  Reg from '../com/reg.js'
import  Product from '../com/product.js'
import  Items from '../com/items.js'
import  Item from '../com/item.js'
import  Cart from '../com/cart.js'

const LoginForm=Form.create()(Login)
const RegForm=Form.create()(Reg)

export default class MyRouter extends React.Component{

    render(){
        return(
            <div>
                <Router >
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/init" component={Init}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/reg" component={RegForm}/>
                        <Route path="/pet/cate/:cate" component={Product}/>
                        <Route path="/pet/pro/:pro" component={Items}/>
                        <Route path="/pet/items/:item" component={Item}/>
                        <Route path="/cart/:cart" component={Cart}/>
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