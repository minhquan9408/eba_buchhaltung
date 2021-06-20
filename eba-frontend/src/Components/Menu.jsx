import React from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Typography} from 'antd';
import {CalendarOutlined, EuroOutlined, GroupOutlined, TableOutlined, UserOutlined,} from '@ant-design/icons';
import {HashRouter as Router, Link, Route} from "react-router-dom";
import BookingOverview from "./Booking/BookingOverview";
import AccountOverview from "./Account/AccountOverview";
import SubMenu from "antd/es/menu/SubMenu";
import AccountCreate from "./Account/AccountCreate";
import BookingCreate from "./Booking/BookingCreate";
import Account from "./Account/Account";
import TaxReturn from "./Extra/TaxReturn";

const {Header, Content, Footer, Sider} = Layout;

export default function MenuLayout() {

    return (
        <Router>
            <Layout style={{minHeight: '200vh'}}>
                <Sider>
                    <div className="logo"/>
                    <Menu theme="dark"  mode="inline">

                            <Menu.Item key="1" icon={<EuroOutlined />}>
                                <span>Buchungsmodul</span>
                                <Link to="/booking/create"/>
                            </Menu.Item>

                            <Menu.Item key="2" icon={<UserOutlined/>}>
                                <span>Konto erstellen</span>
                                <Link to="/account/create"/>
                            </Menu.Item>


                         <SubMenu key="sub1" icon={<TableOutlined/>} title="Auswertungsmodul">
                            <Menu.Item key="3">
                                <span><CalendarOutlined />Journal</span>
                                <Link to="/booking/overview"/>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <span><GroupOutlined />Kontenblätter</span>
                                <Link to="/account/overview"/>
                            </Menu.Item>
                           <Menu.Item key="5">
                                <span><GroupOutlined />Alle Konten</span>
                                <Link to="/account/all-accounts"/>
                            </Menu.Item>
                           <Menu.Item key="6">
                                <span><GroupOutlined />Steuererklärung</span>
                                <Link to="/tax"/>
                            </Menu.Item>

                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <Typography.Title
                          level = {1}
                        style = {{
                          textAlign: 'center'
                        }}
                        >
                          EBA - Buchhaltungssystem
                        </Typography.Title>
                    </Header>
                    <Content>
                        <Route exact path="/booking/overview" component={BookingOverview}/>
                        <Route exact path="/booking/create" component={BookingCreate}/>
                        <Route exact path="/account/overview" component={AccountOverview}/>
                        <Route exact path="/account/create" component={AccountCreate}/>
                        <Route exact path="/account/all-accounts" component={Account}/>
                        <Route exact path="/tax" component={TaxReturn}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>EBA ©2021 Minh Quan Dong</Footer>
                </Layout>
            </Layout>
        </Router>
    );

}
