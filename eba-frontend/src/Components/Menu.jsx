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
import SummenSaldenliste from "./Extra/SummenSaldenliste";
import Hauptseite from "./Hauptseite";
import GewinnVerlustRechung from "./Extra/GewinnVerlustRechung";
import Bilanz from "./Extra/Bilanz";

const {Header, Content, Footer, Sider} = Layout;

export default function MenuLayout() {

  return (
    <Router>
      <Layout style={{minHeight: '100vh'}}>
        <Sider width={250}>
          <div className="logo"/>
          <Menu theme="dark" mode="inline">

            <Menu.Item key="1" icon={<EuroOutlined/>}>
              <span>Buchungsmodul</span>
              <Link to="/booking/create"/>
            </Menu.Item>

            <Menu.Item key="2" icon={<UserOutlined/>}>
              <span>Konto erstellen</span>
              <Link to="/account/create"/>
            </Menu.Item>


            <SubMenu key="sub1" icon={<TableOutlined/>} title="Auswertungsmodul">
              <Menu.Item key="3" icon={<CalendarOutlined/>}>
                <span> Journal </span>
                <Link to="/booking/overview"/>
              </Menu.Item>
              <Menu.Item key="4" icon={<GroupOutlined/>}>
                <span> Kontenblätter </span>
                <Link to="/account/overview"/>
              </Menu.Item>
              <Menu.Item key="5" icon={<GroupOutlined/>}>
                <span> Alle Konten </span>
                <Link to="/account/all-accounts"/>
              </Menu.Item>
              <Menu.Item key="6" icon={<GroupOutlined/>}>
                <span> Umsatzsteuererklärung </span>
                <Link to="/tax"/>
              </Menu.Item>
              <Menu.Item key="7" icon={<GroupOutlined/>}>
                <span> Summe und Saldenliste </span>
                <Link to="/summe-salden-liste"/>
              </Menu.Item>

               <Menu.Item key="8" icon={<GroupOutlined/>}>
                <span> GuV-Rechnung </span>
                <Link to="/guv"/>
              </Menu.Item>

              {/* <Menu.Item key="9" icon={<GroupOutlined/>}>*/}
              {/*  <span> Bilanz </span>*/}
              {/*  <Link to="/bilanz"/>*/}
              {/*</Menu.Item>*/}

            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{padding: 0}}>
            <Typography.Title
              level={1}
              style={{
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
            <Route exact path="/summe-salden-liste" component={SummenSaldenliste}/>
            <Route exact path="/guv" component={GewinnVerlustRechung}/>
            <Route exact path="/bilanz" component={Bilanz}/>
            <Route exact path="/" component={Hauptseite}/>
          </Content>
          <Footer style={{textAlign: 'center'}}>EBA ©2021 Minh Quan Dong</Footer>
        </Layout>
      </Layout>
    </Router>
  );

}
