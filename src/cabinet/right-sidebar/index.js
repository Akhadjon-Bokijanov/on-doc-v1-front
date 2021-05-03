import React from 'react'
import {Layout, Menu, Breadcrumb, Col} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import CabinetHeader from "../cabinet-header/CabinetHeader";
import st from './lside.module.scss'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function SideNav(props) {
    return(
        <>
            <Layout>
                <Sider width={256} className={st.site_layout_background}>
                    <Menu
                        className={st.side_menu}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' ,borderRight:0}}
                    >
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header><CabinetHeader/></Header>
                    <Content style={{padding: 24, margin: 0, minHeight: 280}}>{props.children}</Content>
                </Layout>
            </Layout>
        </>
    )
}
export default SideNav;