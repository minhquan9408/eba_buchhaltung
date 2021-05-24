import React from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,

} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import BookingOverview from "./BookingOverview";
import AccountOverview from "./AccountOverview";

const {Header, Content, Footer, Sider} = Layout;

export default function MenuLayout() {

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            <span>Booking</span>
                            <Link to = "booking"/>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            <span>Account</span>
                            <Link to = "account"/>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DesktopOutlined/>}>
                            <span>Actions</span>
                            <Link to = "action"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        this is header
                    </Header>
                    <Content>
                        <Route exact path ="/booking" component={BookingOverview}/>
                        <Route exact path ="/account" component={AccountOverview}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>EBA ©2021 Minh Quan Dong</Footer>
                </Layout>
            </Layout>
        </Router>
    );

}
