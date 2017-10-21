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
const MyLogin=Form.create()(Login)

export default class MyRouter extends React.Component{

    render(){
        return(
            <div>
                <Router >
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={MyLogin}/>
                    </div>


                </Router>
            </div>
        )
    }
}