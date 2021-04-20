import React from "react";
import authImg from '../../assests/authImg.png'
import Login from "./login/login.component";
import {Col, Divider, Row} from "antd";
import st from './auth.module.scss'
export default function Auth() {

    return(
        <>
            {/*<Divider orientation="left">sub-element align full</Divider>*/}

            <Row>
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