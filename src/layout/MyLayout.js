/**
 * Created by Administrator on 2017/4/30.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb ,Icon,message,Popconfirm ,Card} from 'antd';

const { Header, Content, Footer,Sider  } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LOGOUT_URL = 'http://localhost:8083/user/logout/'
export default class MyLayout extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
        logout:false
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    confirm=(e)=> {
        if(localStorage.getItem("username")!=null){
            $.ajax({
                type:"get",
                dataType:"json",
                contentType:"application/json",
                url:LOGOUT_URL,

                statusCode:{
                    200:function(data){
                        //注销成功！
                        localStorage.removeItem("username");
                        this.setState({
                            logout:true
                        });
                        message.success('系统已经注销！');


                    }.bind(this),
                    404:function(data){
                        message.error('系统注销失败！');
                    }.bind(this)
                }


            });

        }
    }
    render() {
        //children固定，指的是子组件
        console.log(localStorage.getItem("username"))
        var title=localStorage.getItem("username")==null?"我的宠物商店":localStorage.getItem("username")+"宠物商店";


        return (
            <Layout>
                <Header className="header">
                    <div className="logo" >
                        <table
                            width="100%">
                            <tbody>
                            <tr>
                                <td>
                                    <a href="">
                                        <img src="../../images/logo-topbar.gif"/>
                                    </a>
                                </td>
                                <td>

                                        <img src="../../images/cart.gif"/>

                                    &nbsp;&nbsp;
                                    <img  src="../../images/separator.gif"/>
                                    &nbsp;&nbsp;
                                        <Link to={{pathname:'/login'}} >
                                            <img  src="../../images/login.gif"/>
                                        </Link>

                                    &nbsp;&nbsp;
                                    <img  src="../../images/separator.gif"/>
                                         <Link to={{pathname:'/reg'}} >
                                            <img  src="../../images/reg.gif"/>
                                         </Link>

                                    <img  src="../../images/separator.gif"/>

                                        <img  src="../../images/init.gif"/>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Header>
                <Layout>

                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>{title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ padding: '12px 12px', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    theme="dark"
                                    onClick={this.handleClick}
                                    style={{ width: 180 }}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline">
                                    <SubMenu key="sub1" title={<span><Icon type="meh-o" /><span>我的宠物</span></span>}>
                                        <Menu.Item key="FISH">
                                           小鱼
                                        </Menu.Item>
                                        <Menu.Item key="CATS">小猫</Menu.Item>
                                        <Menu.Item key="DOGS">小狗</Menu.Item>
                                        <Menu.Item key="BIRDS">小鸟</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                                        <Menu.Item key="5"> 登录</Menu.Item>

                                        <Menu.Item key="6">注册</Menu.Item>
                                        <Menu.Item key="7">
                                            <Popconfirm title="你真的确认注销当前用户吗？"
                                                        onConfirm={this.confirm}
                                                        okText="是" cancelText="否">
                                               注销

                                            </Popconfirm>
                                        </Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key="shopping">
                                         <Icon type="shopping-cart" />我的购物车
                                    </Menu.Item>
                                </Menu>

                            </Sider>
                            <Layout>
                                <Content style={{ background: '#fff', padding: 2, margin: 0, minHeight: 280 }}>
                                    {this.props.children}
                                    {/*显示组件*/}
                                </Content>
                            </Layout>
                        </Layout>
                    </Content>
                    <Layout>
                        <Footer style={{ textAlign: 'center' }}>
                            易圣通 ©2017 宠物商店
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
