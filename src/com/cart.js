/**
 * Created by Administrator on 2017/10/25.
 */
/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import {Table, Icon, Card, Popconfirm,Button} from 'antd';
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
const CHECKOUT_URL = 'http://localhost:8083/cart/checkout/'
const username = ""
export default class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            cartflag: false,
            successflag:false,
            editable1:"false",
            newquantity:0,
            checkout:false,
            sum:0,
            total:0


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

                    const {editable} = this.state.data[index].exquantity;

                    return (
                        <div className="editable-row-operations">
                            {
                                editable==="true" ?
                                    <span>
                                      <a onClick={() => this.save(index)}>保存</a>&nbsp;&nbsp;
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
    total1=()=>{//计算总计

        const {data}=this.state;
        let sum=0

        if(data.length!==0){
            data.map((d) =>{
                return sum+=d.quantity*d.price
            })

        }


        this.setState({
            total:sum
        })



    }
    edit=(index,value)=>{
        const {data}=this.state

        data[index].exquantity.editable="true"

        this.setState({
            editable1:"true"
        })
    }
    save=(index)=>{
        var that=this
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

                    let obj = []
                    datas.map((i, index) => {

                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)

                    })
                    this.setState({
                        data:obj,
                        editable1:"false",


                    })
                    that.total1()

                }.bind(this),
                404: function (data) {

                }.bind(this)
            }


        });
    }
    cancel=(index)=>{
        const {data}=this.state
        data[index].exquantity.editable="false"
        this.setState({
            editable1:"false"
        })
    }
    del=(index)=>{
        let username=localStorage.getItem("username")
        var that=this
        $.ajax({
            type: "delete",
            dataType: "json",
            url: DEL_URL +this.state.data[index].orderid+"/"+ username + "/"+this.state.data[index].itemid+"/"+this.state.data[index].productid+"/",
            statusCode: {
                200: function (datas) {
                    //查询成功！

                    let obj = []
                    datas.map((i, index) => {

                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)

                    })
                    this.setState({
                        data:obj,
                        editable1:"false"
                    })
                    that.total1()
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
            quantity:i.quantity,
            exquantity: {
                editable:"false"
            },
            price: i.item.listprice,
            sum:i.quantity*i.item.listprice
        }
        return obj
    }
    getQuantity=(index,e)=>{
        let {data,newquantity} = this.state;
        data[index].sum=data[index].price*e.target.value
        newquantity=e.target.value
        this.setState({data,newquantity});


    }
    renderColumns(data, index, key, text) {
        //alert(data[index][key]);

        if (data[index][key] == undefined) {//防止空数据时出现没有editable情况
            //console.log("undefined")
            return;
        }
        const {editable, status} = data[index][key];


        const {editable1}=this.state


       // console.log(editable1);
        if(key==='quantity'&&data[index].exquantity.editable==="true"){
            return (<Cell
                editable={editable1}
                dvalue={data[index].quantity}
                myvalue={this.getQuantity.bind(this,index)}//带e，传参数
                onChange={value => this.handleChange(key, index, value) }
                status={status}
            />);
        }
        return text;
    }
    checkOut=()=>{
        var order={
            username:localStorage.getItem("username"),
            orderid:this.state.data[0].orderid,
            totalprice:this.state.total,
        }
        $.ajax({
            type: "post",
            contentType:"application/json",
            data:JSON.stringify(order),
            url: CHECKOUT_URL,
            statusCode: {
                200: function (datas) {
                    // //查询成功！
                    this.setState({
                        checkout:true
                    })


                }.bind(this),
                404: function (data) {

                }.bind(this)
            }


        });
    }
    refresh = () => {
        var that=this
        $.ajax({
            type: "get",
            dataType: "json",
            url: QUERY_URL + this.username + "/",
            statusCode: {
                200: function (datas) {
                    //查询成功！

                    let obj = []
                    datas.map((i, index) => {

                        // console.log(datas[index].itemid)
                        obj[index]=this.makeObj(i,index)

                    })
                    this.setState({
                        data:obj,
                    })
                    that.total1()

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
        if (this.state.checkout) {//登录
            return (
                <Redirect to={{pathname: '/'}}/>
            )
        }
        let columns = this.columns
        return (
            <div>
                <MyLayout>
                    <Card title="宠物项目列表" bordered={false} style={{padding: '30px'}}>
                        <Table columns={columns} dataSource={this.state.data}/>
                        <span><h3>总计：{this.state.total}元</h3></span>
                        <br/>
                        {/*this.state.data.itemid==undefined：没有数据*/}
                        <Button type="primary" onClick={this.checkOut}
                                disabled={this.state.total===0}>生成订单</Button>
                    </Card>
                </MyLayout>
            </div>
        );
    }

}