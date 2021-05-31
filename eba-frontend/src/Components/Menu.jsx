import React from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    UserOutlined,

} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import BookingOverview from "./Booking/BookingOverview";
import AccountOverview from "./Account/AccountOverview";
import SubMenu from "antd/es/menu/SubMenu";
import AccountUpdate from "./Account/AccountUpdate";
import AccountCreate from "./Account/AccountCreate";
import BookingCreate from "./Booking/BookingCreate";
import BookingUpdate from "./Booking/BookingUpdate";

const {Header, Content, Footer, Sider} = Layout;

export default function MenuLayout() {

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="Buchungen">
                            <Menu.Item key="1">
                                <span>Alle Buchungen</span>
                                <Link to="/booking/overview"></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <span>Buchungen erstellen</span>
                                <Link to="/booking/create"></Link>


                            </Menu.Item>
                            <Menu.Item key="3">
                                <span>Buchungen aktualisieren</span>
                                <Link to="/booking/update"></Link>

                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<UserOutlined/>} title="Konten">
                            <Menu.Item key="4">
                                <span>Alle Konten</span>
                                <Link to="/account/overview"/>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <span>Konten erstellen</span>
                                <Link to="/account/create"/>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <span>Konten aktualisieren</span>
                                <Link to="/account/update"/>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="7" icon={<DesktopOutlined/>}>
                            <span>Actions</span>
                            <Link to="action"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        EBA Software
                    </Header>
                    <Content>
                        <Route exact path="/booking/overview" component={BookingOverview}/>
                        <Route exact path="/booking/create" component={BookingCreate}/>
                        <Route exact path="/booking/update" component={BookingUpdate}/>
                        <Route exact path="/account/overview" component={AccountOverview}/>
                        <Route exact path="/account/update" component={AccountUpdate}/>
                        <Route exact path="/account/create" component={AccountCreate}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>EBA ©2021 Minh Quan Dong</Footer>
                </Layout>
            </Layout>
        </Router>
    );

}
