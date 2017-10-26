/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import {Table, Icon, Card, Popconfirm} from 'antd';
import MyLayout from '../layout/MyLayout';
import Cell from './cell'
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch,
    Redirect

} from 'react-router-dom';
const QUERY_URL = 'http://localhost:8083/cart/query/'
const DEL_URL = 'http://localhost:8083/cart/del/'
const PUT_URL = 'http://localhost:8083/cart/update/'
const username = ""
export default class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            cartflag: false,
            successflag:false,
            editable1:"false",
            newquantity:0

        }

        this.username = localStorage.getItem("username")
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
                title: '照片',
                dataIndex: 'pic',
                width: '10%',
                render: (text, record) => (
                    <span>

                       <img src={"../../images/"+record.pic} />
                    </span>
                )
            },
            {
                title: '合计',
                dataIndex: 'sum',
                width: '7%',
                render: (text, record, index) => this.renderColumns(this.state.data, index, 'sum', text),
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record, index) => {

                    if (this.state.data[index].quantity == undefined) {////防止空数据时出现没有editable情况
                        return
                    }

                    const {editable} = this.state.data[index].quantity;
                    return (
                        <div className="editable-row-operations">
                            {
                                this.state.editable1==="true" ?
                                    <span>
                                  <a onClick={() => this.save(index, 'save')}>保存</a>&nbsp;&nbsp;
                                        <Popconfirm title="确定取消?" onConfirm={() => this.cancel(index, 'cancel')}>
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
    edit=(index,value)=>{

        this.setState({
            editable1:"true"
        })
    }
    save=(index)=>{
        let username=localStorage.getItem("username")
        var cart = {
            orderid:this.state.data[index].orderid,
            itemid: this.state.data[index].itemid,
            productid: this.state.data[index].productid,
            quantity: this.state.newquantity,
            username: username
        }
        $.ajax({
            type: "put",
            dataType: "json",
            data:JSON.stringify(cart),
            contentType:"application/json",
            url:PUT_URL,
            statusCode: {
                200: function (datas) {
                    //查询成功！
                    console.log(datas)
                    let obj = [{}]
                    datas.map((i, index) => {
                        console.log(i.itemid)
                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)
                        console.log(obj)
                    })


                    this.setState({
                        data:obj,
                        editable1:"false"
                    })


                }.bind(this),
                404: function (data) {

                }.bind(this)
            }


        });
    }
    cancel=(index)=>{

    }
    del=(index)=>{
        let username=localStorage.getItem("username")
        $.ajax({
            type: "delete",
            dataType: "json",
            url: DEL_URL +this.state.data[index].orderid+"/"+ username + "/"+this.state.data[index].itemid+"/"+this.state.data[index].productid+"/",
            statusCode: {
                200: function (datas) {
                    //查询成功！
                    console.log(datas)
                    let obj = [{}]
                    datas.map((i, index) => {
                        console.log(i.itemid)
                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)
                        console.log(obj)
                    })


                    this.setState({
                        data:obj,
                        editable1:"false"
                    })


                }.bind(this),
                404: function (data) {

                }.bind(this)
            }


        });


    }
    componentWillMount() {
        this.refresh()
    }
    makeObj=(i,index)=>{
        let obj
        obj ={
            key: index + 1,
            orderid:i.orderid,
            itemid:  i.itemid,
            pic:  i.item.product.pic,
            productid:  i.productid,
            descn:  i.item.product.descn,
            quantity: i.quantity,
            price: i.item.listprice,
            sum:i.quantity*i.item.listprice
        }
        return obj
    }
    getQuantity=(e)=>{
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(e.target.value)
        // this.setState({
        //     newquantity:e.target.value
        // })
        // console.log(e.target.value)
    }
    renderColumns(data, index, key, text) {
        //alert(data[index][key]);

        if (data[index][key] == undefined) {//防止空数据时出现没有editable情况
            //console.log("undefined")
            return;
        }
        const {editable, status} = data[index][key];
        console.log("@@@@")

        const {editable1}=this.state
        console.log(key);
        console.log(editable1);
        if(key==='quantity'&&editable1==="true"){
            return (<Cell
                editable={editable1}
                myvalue={this.getQuantity}
                onChange={value => this.handleChange(key, index, value)}
                status={status}
            />);
        }
        return text;



    }

    refresh = () => {
        $.ajax({
            type: "get",
            dataType: "json",
            url: QUERY_URL + this.username + "/",
            statusCode: {
                200: function (datas) {
                    //查询成功！
                    console.log(datas)
                    let obj = [{}]

                    datas.map((i, index) => {
                        console.log(i.itemid)
                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)
                        console.log(obj)
                    })


                    this.setState({
                        data:obj
                    })

                }.bind(this),
                404: function (data) {

                }.bind(this)
            }


        });
    }

    render() {

        if (this.username == null) {//登录
            return (
                <Redirect to={{pathname: '/login'}}/>
            )
        }
        let columns = this.columns
        return (
            <div>
                <MyLayout>
                    <Card title="宠物项目列表" bordered={false} style={{padding: '30px'}}>
                        <Table columns={columns} dataSource={this.state.data}/>
                    </Card>
                </MyLayout>
            </div>
        );
    }

}