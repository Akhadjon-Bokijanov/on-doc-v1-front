import React from "react";
import {Button, Col, Form, Input, Row, Space} from "antd";
import st from "./balance.module.scss";
import click from '../../assests/payment/click.png'
import payme from '../../assests/payment/payme.png'
import apelsin from '../../assests/payment/apelsin.png'

export default function Balance() {
    return(
        <>
            <div>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>
                    <Col md={7} style={{marginLeft:'3.5%',marginBottom:'-10px',marginTop:'23px'}}><h1>Пополнить баланс</h1></Col>
                </Row>
                <Row gutter={[16]} style={{marginRight:'0'}}>
                    <Col md={1}></Col>
                    <Col md={22} className={st.block}>
                        <div className={'flexible'} style={{marginLeft:'24px',marginTop:'32px'}}>
                            <div style={{width:'48.5%'}}>
                                <p className={st.main_title} style={{marginBottom:'8px'}}>Через карту</p>
                                <Form
                                    requiredMark={false}
                                    // labelCol={{span: 24}}
                                    name="factura"
                                    scrollToFirstError>
                                    <Row justify="space-between">
                                        <Col md={11}>
                                            <p className={st.label}>{("Сумма")}</p>
                                            <Form.Item>
                                                <Form.Item key={`sum`} name="sum">
                                                    <Input rules={[{ required: true }]} size="large"
                                                           placeholder={'Введите сумму'}/>
                                                </Form.Item>
                                            </Form.Item>

                                            <p className={st.label}>{("Номер карты")}</p>
                                            <Form.Item>
                                                <Form.Item key={`sum`} name="sum">
                                                    <Input rules={[{ required: true }]} size="large"
                                                           placeholder={'0000 0000 0000 0000'}/>
                                                </Form.Item>
                                            </Form.Item>

                                            <p className={st.label}>{("Срок карыт")}</p>
                                            <Form.Item>
                                                <Form.Item key={`sum`} name="sum">
                                                    <Input rules={[{ required: true }]} size="large"
                                                           placeholder={'00/00'}/>
                                                </Form.Item>
                                            </Form.Item>

                                            <Button style={{fontSize:'16px'}} className={st.send}>Отплатить</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div style={{width:'3%'}}></div>
                            <div style={{width:'48.5%'}}>
                                <p className={st.main_title}  style={{margin:'0'}}>Другие способы оплаты</p>
                                <p className={st.num_title} style={{paddingBottom:'12px'}}>Номер счета:122 132 434</p>
                                <Row gutter={[16,16]}>
                                    <Col md={11}>
                                        <div className={st.card}>
                                            <p className={st.payment}>Click</p>
                                            <img src={click} className={st.payment_icon} alt=""/>
                                        </div>
                                    </Col>
                                    <Col md={11}>
                                        <div className={st.card}>
                                            <p className={st.payment}>Payme</p>
                                            <img src={payme} className={st.payment_icon} alt=""/>
                                        </div>
                                    </Col>
                                    <Col md={11}>
                                        <div className={st.card}>
                                            <p className={st.payment}>Apelsin</p>
                                            <img src={apelsin} className={st.payment_icon} alt=""/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}