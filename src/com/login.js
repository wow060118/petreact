/**
 * Created by Administrator on 2017/7/4.
 */
/**
 * Created by Administrator on 2017/5/10.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox,Card,Alert } from 'antd';
import MyLayout from "../layout/MyLayout";
import $ from 'jquery';

import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch,
    PropTypes,
    Redirect


} from 'react-router-dom';

const FormItem = Form.Item;
const LOGIN_URL = 'http://localhost:8083/user/login/'
const user = {
    username: '',
    password: ''
}
const onClose = function (e) {
    console.log(e, 'I was closed.');
};
export default class Login extends React.Component {


    constructor(props, contex) {
        super(props, contex);
        this.state = {
            errorshow: false,
            successshow: false,

        }
    }


    login=(values)=>{
        $.ajax({
            type:"post",
            dataType:"json",
            contentType:"application/json",
            url:LOGIN_URL,
            data:JSON.stringify(values),
            statusCode:{
                200:function(data){
                    //登录成功！
                   localStorage.setItem("username",values.username)
                   this.setState({
                       errorshow:false,
                       successshow:true

                   })
                }.bind(this),
                404:function(data){
                    console.log(123);
                    this.setState({
                        errorshow:true,
                        successshow:false

                    })
                }.bind(this)
            }


        });

    }
    handleSubmit = (e) => {//提交
        e.preventDefault();//阻止自身事件发生
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.login(values)
            }

        });

    }

    render() {
        const { errorshow,successshow } = this.state;
        const {getFieldDecorator} = this.props.form;
        //否则进行正常的再次登录
        if(this.state.successshow){
            return (
                <Redirect to={{pathname:'/'}}/>
            )
        }
        return (
            <MyLayout>

            <Card title="登录用户" bordered={false} style={{ width: 400 }}>
                <div style={{ padding: '30px' }}>
                    <div style={{ display: errorshow ? 'block' : 'none' }}>
                        <Alert message="登录失败"
                               description="登录失败，请重新登录！"
                               type="error"
                               closable
                               onClose={onClose}
                        />

                    </div>
                    <div style={{ display: successshow ? 'block' : 'none' }}>
                        <Alert message="登录成功！"
                               type="success"
                               closable
                               onClose={onClose}
                        />

                    </div>
                    <Form onSubmit={this.handleSubmit}
                          ref="form1" className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入你的用户名！'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入你的密码！'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem>


                            <Button type="primary" htmlType="submit"
                                    className="login-form-button">
                                登录
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            注册
                        </FormItem>
                    </Form>

                </div>

            </Card>
            </MyLayout>
        );
    }
}
