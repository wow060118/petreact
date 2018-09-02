import React from 'react';


import { Layout, Menu, Breadcrumb ,Icon,message,Popconfirm } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class MyLayout extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {
        var title="我的宠物商店";
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

                                    &nbsp;&nbsp;

                                        <img  src="../../images/login.gif"/>

                                    &nbsp;&nbsp;
                                    <img  src="../../images/separator.gif"/>

                                        <img  src="../../images/reg.gif"/>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                theme="light"
                                onClick={this.handleClick}
                                style={{ width: 240 }}
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
                        <Content style={{ padding: '0 24px', minHeight: 450  }}>
                            {this.props.children}
                            {/*显示组件,重要的设置，显示所有嵌套在MyLayout标签下的组件*/}
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    yfr ©2017 宠物商店
                </Footer>
            </Layout>
        );
    }
}