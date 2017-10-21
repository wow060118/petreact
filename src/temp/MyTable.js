/**
 * Created by Administrator on 2017/5/18.
 */
import {Table, Input, Popconfirm, Card,Button} from 'antd';
import React from 'react';
import TableCell from "./TableCell";




export default class MyTable extends React.Component {
    constructor(props) {
        super(props);
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
        this.state = {
            data://数据初始化 必须写一下初始化，否则做render是没有初始数据源，不好使
                [
                    {
                        key:0,//唯一键
                        itemid: {
                            value: '',
                        },
                        productid: {
                            value: '',
                        },
                        descn: {
                            value: '',
                        },
                        price: {
                            value: 0,
                        },
                        quantity: {
                            editable: false,
                            value:'',
                        },
                        sum: {
                            value: 0,
                        },

                    }
                ],
            loginflag: true,
            orderid:"",//该笔购物车所属的订单号
            productid:"",
            total:"",//总计
            checkout:false,//是否提交
            disabled:false
        };
    }




    renderColumns(data, index, key, text) {
        if(data[index][key]==undefined){//防止空数据时出现没有editable情况
            return ;
        }
        const {editable, status} = data[index][key];

        if (typeof editable === 'undefined') {
            return text;
        }

        return (<TableCell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }
    handleChange(key, index, value) {//儿子向父亲传值

    }


    edit(index) {
        const {data} = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({data});
    }
    del(index) {




    }
    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    handleSubmit=(e)=>{
        const {total,orderid}=this.state;
        var username = window.sessionStorage.getItem("pusername");
        var order={
            "orderdate":"",
            "totalprice":0,
            "orderid":0,
            username:""
        };
        order.orderid= orderid;
        order.username=username;
        order.orderdate=new Date();
        order.totalprice=total;


    }

    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });

            return obj;
        });
        const columns = this.columns;
        return (

            <Table bordered dataSource={dataSource} columns={columns} />

        )
    }
}