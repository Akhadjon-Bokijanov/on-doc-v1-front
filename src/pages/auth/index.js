import React from "react";
import authImg from '../../assests/authImg.png'
import Login from "./login/login.component";
import {Col,Row} from "antd";
import st from './auth.module.scss'
import {Redirect, Route, Switch} from "react-router-dom";
export default function Auth() {

    return(
        <>
            <Row justify="space-between" align="top" >
                <Col span={12} className={st.auth_img_target} >

                </Col>
                <Col span={12} style={{paddingLeft: 50}}>
                    <Route path = '/login'><Login/></Route>
                    <Route render={() => <Redirect to="/login" />}></Route>
                </Col>
            </Row>
        </>
    )
}