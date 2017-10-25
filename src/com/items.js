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

export default class Items extends React.Component{
    constructor(props){
        super(props)
        this.state={
            datas:[],

        }

        this.refresh(props.match.params.pro)
    }
    componentWillReceiveProps(nextProps){
        let pro=nextProps.match.params.pro

        this.refresh(pro)
    }
    refresh=(pro)=>{

        var query={
            category:"",
            product:pro,
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
                title: '项目编号',
                dataIndex: 'itemid',
                key: 'itemid',
            }, {
                title: '产品编号',
                dataIndex: 'productid',
                key: 'productid',
            }, {
                title: '产品名称',
                dataIndex: 'product.name',//对应后端json数据的键
                key: 'product.name',
            },
            {
                title: '单价',
                dataIndex: 'listprice',//对应后端json数据的键
                key: 'listprice',
            },
            {
                title: '描述',
                dataIndex: 'product.descn',//对应后端json数据的键
                key: 'product.descn',

            },
            {
                title: '图片',
                dataIndex: 'product.pic',//对应后端json数据的键
                key: 'product.pic',
                render: (text, record) => (
                    <span>

                       <img src={"../../images/"+record.product.pic} />
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
                       <Link to={{ pathname: '/pet/items/'+record.productid+":"+record.itemid}}>明细</Link>
                       <span className="ant-divider" />

                  </span>
                ),
            }
        ];
        return (
            <div>
                <MyLayout>
                    <Card title="宠物项目列表" bordered={false} style={{  padding: '30px' }}>
                        <Table columns={columns} dataSource={this.state.datas} />
                    </Card>
                </MyLayout>
            </div>
        );
    }

}