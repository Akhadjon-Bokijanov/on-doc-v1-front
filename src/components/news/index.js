import React, {useEffect, useState} from "react";
import {Button, Col, Row, Space} from "antd";
import st from './news.module.scss'
import {Link} from "react-router-dom";
//115

export default function News({data}) {
    return(
        <>
            <div>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>
                    <Col md={7} style={{marginLeft:'25px',marginBottom:'-10px',marginTop:'23px'}}><h1>news</h1></Col>
                </Row>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>
                    {
                        data.map((item,index)=>(
                            <Col className={st.card} md={7} key={index}>
                                <div className={'flexible'}>
                                    <p className={st.title} style={{width:'88%'}}>{item.title}</p>
                                    <p className={`${st.title}`} style={{width:'12%'}}>{item.time}</p>
                                </div>
                                <p>{item.content.length<=110?item.content:item.content.substr(0,110)+'...'}</p>
                                <Button className={st.btn}>
                                    <Link to={`/cabinet/news/${item.id}`}><p className={st.text}>Читать</p></Link>
                                </Button>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </>
    )
}