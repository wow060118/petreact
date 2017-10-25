/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import { Table, Icon,Card } from 'antd';
import MyLayout from '../layout/MyLayout';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch

} from 'react-router-dom';
const QUERY_URL = 'http://localhost:8083/pet/query/'

export default class Product extends React.Component{

    constructor(props){
        super(props)
        this.state={
            datas:[],

        }
        let cate=props.match.params.cate
        this.refresh(cate)
    }
    componentWillReceiveProps(nextProps){
        this.refresh(nextProps.match.params.cate)
    }
    refresh=(cate)=>{

        var query={
            category:cate,
            product:"",
            item:""
        }
        $.ajax({
            type:"post",
            dataType:"json",
            contentType:"application/json",
            url:QUERY_URL,
            data:JSON.stringify(query),
            statusCode:{
                200:function(data){
                    //查询成功！
                    console.log(data)
                    this.setState({
                        datas:data
                    })

                }.bind(this),
                404:function(data){

                }.bind(this)
            }


        });
    }
    render(){
        const columns = [
            {
                title: '产品编号',
                dataIndex: 'productid',
                key: 'productid',
            }, {
                title: '产品名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '产品描述',
                dataIndex: 'descn',//对应后端json数据的键
                key: 'descn',
            },
            {
                title: '图片',
                dataIndex: 'pic',//对应后端json数据的键
                key: 'pic',
                render: (text, record) => (
                    <span>
                       <img src={"../../images/"+record.pic} />
                    </span>
                )
            },
            {
                title: '操作',
                dataIndex: 'opt',
                key: 'opt',
                render: (text, record) => (
                    <span>
                      <span className="ant-divider" />
                      <Link to={{ pathname: '/pet/pro/'+record.productid }}>明细</Link>
                        {/*<Link to="/pet/pro/">进入明细</Link>*/}
                        <span className="ant-divider" />

                  </span>
                ),
            }
        ];
        return (
            <div>

                <MyLayout>
                    <Card title="宠物产品列表" bordered={false} style={{  padding: '30px' }}>
                        <Table columns={columns} dataSource={this.state.datas} />
                    </Card>
                </MyLayout>
            </div>
        );
    }

}