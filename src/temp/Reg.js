/**
 * Created by Administrator on 2017/7/4.
 */
/**
 * Created by Administrator on 2017/5/10.
 */
import {Form, Input, Tooltip, Icon, Cascader, Card, Select, Alert , Checkbox, Button} from 'antd';
import React from 'react';


const FormItem = Form.Item;

const onClose = function (e) {
    console.log(e, 'I was closed.');
};
export  default  class Reg extends React.Component {
    state = {

        confirmDirty: false,
        errorshow: false,//出现错误
        successhow:false//成功
    };
    handleSubmit = (e) => {//注册新用户
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });



    }
    reg = (values) => {

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

    componentWillMount() {
        this.queryCategory();
    }

    queryCategory = () => {
        //const {options}=this.state;



    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { errorshow,successshow } = this.state;
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
                                    rules: [{
                                        required: true, message: '必须输入密码',
                                    }, {
                                        validator: this.checkConfirm,
                                    }, {
                                        min: 3, message: '请输入至少三位密码'
                                    },
                                        {
                                            max: 8, message: '请输入最多八位密码'
                                        }],
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

                                    </Select>
                                )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>我同意遵循易圣通宠物商店章程</Checkbox>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary"
                                        htmlType="submit" size="large">注册</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>

        );
    }
}