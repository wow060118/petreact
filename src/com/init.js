/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Card, Button} from 'antd';
import MyLayout from '../layout/MyLayout';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch,
    Redirect

} from 'react-router-dom';

const INIT_URL = 'http://localhost:8083/init/init/'

export default class Init extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }

    }
    showModal=()=>{
        this.setState({
            visible:true
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    handleOk=()=>{//ajax init
        $.ajax({
            type:"get",
            url:INIT_URL,
            statusCode:{
                200:function(data){//200 404 401 500 403
                    //初始化成功！
                    this.setState({
                        visible:false,
                    })
                }.bind(this),
                404:function(data){

                }.bind(this)
            }


        });
    }
    render(){
        const {visible}=this.state
        return (
            <div>
                <MyLayout>
                    <Card style={{ width: 340 ,height:400}} bodyStyle={{ padding: 1 }}
                          title="初始化"
                          bordered={true}>
                        <Button type="primary" onClick={this.showModal}>
                            初始化后端数据，请谨慎操作！
                        </Button>
                        <Modal
                            visible={visible}
                            title="你真的确定初始化数据吗?"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" size="large"
                                        onClick={this.handleOk}>
                                    确定
                                </Button>,
                            ]}
                        >
                            <p>一旦点击确定，你的数据就没了，你将生无可恋了！</p>

                        </Modal>
                    </Card>
                </MyLayout>
            </div>
        )
    }
}