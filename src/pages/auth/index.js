import React from "react";
import authImg from '../../assests/authImg.png'
import Login from "./login/login.component";
import {Col,Row} from "antd";
import st from './auth.module.scss'
export default function Auth() {

    return(
        <>
            <Row justify="space-between" align="top">
                <Col span={14}>
                    <img src={authImg} className={st.auth_img} alt=""/>
                </Col>
                <Col span={10}>
                    <Login/>
                </Col>
            </Row>
        </>
    )
}