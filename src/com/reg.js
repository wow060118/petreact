/**
 * Created by Administrator on 2017/7/4.
 */
/**
 * Created by Administrator on 2017/5/10.
 */
import {Form, Input, Tooltip, Icon, Cascader, Card, Select, Alert , Checkbox, Button} from 'antd';
import React from 'react';
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

const onClose = function (e) {
    console.log(e, 'I was closed.');
};
const QUERY_CATEGORY_ALL = 'http://localhost:8083/user/category/'
const REG_URL = 'http://localhost:8083/user/reg/'

export  default  class Reg extends React.Component {
    state = {
        confirmDirty: false,
        errorshow: false,//出现错误
        successhow:false,//成功
        options:[],
        langs:[{
            langid:'eng',
            name:'英语'
        },{
            langid:'chi',
            name:'汉语'
        }]
    };
    handleSubmit = (e) => {//注册新用户
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.reg(values)

            }
        });
    }
    reg = (values) => {
        values.profile.username=values.username
        $.ajax({
            type:"post",
            dataType:"json",
            contentType:"application/json",
            url:REG_URL,
            data:JSON.stringify(values),
            statusCode:{
                200:function(data){
                    //注册成功

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
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('所输入的两次密码必须一致！');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    componentWillMount() {//zu
        this.queryCategory();//
    }

    queryCategory = () => {
        //const {options}=this.state;
        $.ajax({
            type:"get",
            dataType:"json",
            url:QUERY_CATEGORY_ALL,
            statusCode:{
                200:function(data){
                    console.log(data)
                    //塞数据
                    this.setState({
                        options:data

                    })

                }.bind(this),
                404:function(data){

                }.bind(this)
            }


        });



    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { errorshow,successshow,langs } = this.state;

        if(successshow===true){
            return (
                <Redirect to={{pathname:'/login'}}/>
            )
        }
        const lang=this.state.langs.map(
            d=><option value={d.langid}>{d.name}</option>
        )
        const option=this.state.options.map(
            d=><option value={d.catid}>{d.name}</option>

        )
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };


        return (
                <MyLayout>

                <div style={{padding: '30px'}}>
                    <Card title="注册新用户" bordered={false}>
                        <div style={{ display: errorshow ? 'block' : 'none' }}>
                            <Alert message="注册失败"
                                   description="注册失败，请先同意章程！"
                                   type="error"
                                   closable
                                   onClose={onClose}/>

                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="用户名"
                                hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required: true, message: '必须输入用户名',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="密码"
                                hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true, message: '必须输入密码',
                                        },

                                        {
                                            min: 3, message: '请输入至少三位密码'
                                        },
                                        {
                                            max: 8, message: '请输入最多八位密码'
                                        }
                                    ],
                                })(
                                    <Input type="password"/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="校验密码"
                                hasFeedback
                            >
                                {getFieldDecorator('repassword', {
                                    rules: [{
                                        required: true, message: '请输入你的校验密码',
                                    }, {
                                        validator: this.checkPassword,
                                    }, {
                                        min: 3, message: '请输入至少三位密码'
                                    },
                                        {
                                            max: 8, message: '请输入最多八位密码'
                                        }],
                                })(
                                    <Input type="password" onBlur={this.handleConfirmBlur}/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="邮箱"
                                hasFeedback
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: '错误的邮箱格式',
                                    }, {
                                        required: true, message: '请输入你的邮箱！',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="姓名"
                                hasFeedback>
                                {getFieldDecorator('xm', {
                                    rules: [{
                                        required: true, message: '必须输入真实姓名！',
                                    },
                                        {
                                            pattern: /^.{1,10}$/,
                                            message: '真实姓名最多10个字符'
                                        }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="家庭住址"
                                hasFeedback>
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: true, message: '必须输入真实地址！',
                                    },
                                        {
                                            pattern: /^.{1,20}$/,
                                            message: '真实地址最多20个字符'
                                        }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="你的母语"
                            >
                                {getFieldDecorator('profile.lang', {
                                    rules: [{required: true, message: '请选择你的母语'}],

                                })(
                                    <Select placeholder="请选择你的母语">
                                        {lang}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="你喜爱的宠物"
                                hasFeedback>
                                {getFieldDecorator('profile.catid', {
                                    rules: [{required: true, message: '请选择你喜爱的宠物'}],

                                })(
                                    <Select placeholder="请选择你喜爱的宠物">
                                        {option}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>我同意遵循宠物商店章程</Checkbox>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary"
                                        htmlType="submit" size="large">注册</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
                </MyLayout>
        );
    }
}