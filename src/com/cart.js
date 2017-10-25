/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import { Table, Icon,Card,Popconfirm } from 'antd';
import MyLayout from '../layout/MyLayout';
import Cell from './cell'
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch

} from 'react-router-dom';
const QUERY_URL = 'http://localhost:8083/pet/query/'

export default class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            datas:[],
            cartflag:false

        }
        this.columns = [
            {
                title: '项目编号',
                dataIndex: 'itemid',
                width: '15%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'itemid', text),
            },
            {
                title: '产品编号',
                dataIndex: 'productid',
                width: '15%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'productid', text),
            },
            , {
                title: '描述',
                dataIndex: 'descn',
                width: '25%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'descn', text),
            },
            {
                title: '单价',
                dataIndex: 'price',
                width: '8%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'price', text),
            },
            {
                title: '数量',
                dataIndex: 'quantity',
                width: '10%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'quantity', text),
            },
            {
                title: '合计',
                dataIndex: 'sum',
                width: '17%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'sum', text),
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {

                    if(this.state.data[index].quantity==undefined){////防止空数据时出现没有editable情况
                        return
                    }

                    const {editable} = this.state.data[index].quantity;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                  <a onClick={() => this.editDone(index, 'save')}>保存</a>&nbsp;&nbsp;
                                        <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>取消</a>
                                  </Popconfirm>
                                </span>
                                    :
                                    <span>
                                     <a onClick={() => this.edit(index)}>编辑</a>
                                        &nbsp;&nbsp;
                                        <a onClick={() => this.del(index)}>删除</a>
                                </span>

                            }
                        </div>
                    );
                },
            }];

    }
    renderColumns(data, index, key, text) {
        //alert(data[index][key]);
        if(data[index][key]==undefined){//防止空数据时出现没有editable情况

            return ;
        }
        const {editable, status} = data[index][key];
        //
        if (typeof editable === 'undefined') {
            return text;
        }

        return (<Cell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }

    refresh=()=>{


        // $.ajax({
        //     type:"post",
        //     dataType:"json",
        //     contentType:"application/json",
        //     url:QUERY_URL,
        //     data:JSON.stringify(query),
        //     statusCode:{
        //         200:function(data){
        //             //查询成功！
        //             console.log(data)
        //             this.setState({
        //                 datas:data
        //             })
        //
        //         }.bind(this),
        //         404:function(data){
        //
        //         }.bind(this)
        //     }
        //
        //
        // });
    }
    render(){
        let columns=this.columns
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