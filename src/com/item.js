/**
 * Created by Administrator on 2017/10/25.
 */
import React from 'react';
import { Card ,Button} from 'antd';
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
const QUERY_URL = 'http://localhost:8083/pet/query/'

export default class Item extends React.Component{

    constructor(props){
        super(props)
        this.state={
            loginflag:false,
            cartflag:false,
            item: {//单独的宠物项目
                "itemid":"",
                "price":"",
                "pic":"",
                "desc":"",
                "attr1":""
            }
        }
        this.refresh(props.match.params.item)

    }
    componentWillReceiveProps(nextProps){
        let item=nextProps.match.params.item
        this.refresh(item)
    }
    refresh=(item)=>{

        var query={
            category:"",
            product:"",
            item:item
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

                        item:{
                            itemid:data[0].itemid,
                            price:data[0].listprice,
                            pic:data[0].product.pic,
                            desc:data[0].product.descn,
                            attr1:data[0].attr1,
                        }
                    })


                }.bind(this),
                404:function(data){

                }.bind(this)
            }


        });
    }
    handleSubmit=()=>{
        this.setState({
            cartflag:true
        })
    }
    render(){
        let username=localStorage.getItem("username")
        if(username==null){//登录
            return (
                <Redirect to={{pathname:'/login'}}/>
            )
        }
        if(this.state.cartflag&&username!=null){//可以进入购物车
            return (
                <Redirect to={{pathname:'/cart/1'}}/>
            )
        }

        return (
            <MyLayout>
                <Card style={{ width: 340 ,height:400}} bodyStyle={{ padding: 1 }}
                      title="宠物"
                      bordered={true}>
                    <div className="custom-image" >

                        <img alt={this.state.item.itemid} width="60%"
                             src={"../../images/"+this.state.item.pic} />
                    </div>
                    <div className="custom-card">
                        <h2>{this.state.item.itemid}</h2>
                        <h2>￥{this.state.item.price}</h2>
                        <h3>{this.state.item.attr1}  {this.state.item.desc}</h3>

                        <Button type="primary" onClick={this.handleSubmit}
                                size="small">进入购物车</Button>
                    </div>
                </Card>
            </MyLayout>

        )
    }
}