import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Row, Col, Input, Select, Button, message, Radio } from 'antd'
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { succesLogIn } from '../../redux/user/user.action';
import { EIMZOClient } from '../../utils/e-imzo';
import moment from 'moment';
import './login.style.scss'

const { Option } = Select;

const Login = ({ setCurrentUser }) => {

    const [eKeys, setEKeys] = useState([])

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        EIMZOClient.listAllUserKeys(function (o, i) {
            // console.log(o);
            var itemId = "itm-" + o.serialNumber + "-" + i;
            return itemId;
        }, function (itemId, v) {
            eKeys.push({ value: itemId, text: v })
            setEKeys([...eKeys])
            console.log(v)
            console.log(eKeys)
            //return uiCreateItem(itemId, v);
        }, function (items, firstId) {
            console.log(items, firstId)
            // uiFillCombo(items);
            // uiLoaded();
            // uiComboSelect(firstId);
        }, function (e, r) {
            console.log((e, r))
            message.error("E-Imzo xatosi. Sizda E-Imzo programmasi yoki E-Imzo browseri mavjud emas!")
        });
    }, [])


    const [isLoading, setIsLoading] = useState(false);
    const [isKeyLoading, setKeyIsLoading] = useState(false);

    const validateMessages = {
        required: 'Bu maydon majburiy!',
    };

    const handleSubmit = value => {
        setIsLoading(true)
        console.log(value)
        axios({
            url: '/api/v1/login-with-password',
            data: value,
            method: 'POST',
        }).then(res => {
            setCurrentUser(res.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
            message.error("Kabinetga kirishda xatolik!");
        })
    }

    const handleKeySubmit = value => {
        //setKeyIsLoading(true)
        console.log(value)

        EIMZOClient.loadKey(
            value.key.text,
            id => {
                console.log(id);
                EIMZOClient.createPkcs7(id, "some_auth_text",
                    pkcs7Text => {
                        console.log(pkcs7Text);
                    },
                    (e, r) => {
                        console.log("e:", e);
                        console.log("r:", r);
                    })
            },
            function (e, r) {
                console.log("Load key e:", e);
                console.log("Load key r:", r);
            })

        EIMZOClient.createPkcs7(
            value.key,
            "random_key_to_authorize",
            null,
            pkcs7Text => {
                console.log(pkcs7Text);
            },
            (e, r) => {
                console.log(e);
                console.log(r)
            }
        )

    }

    return (
        <div className="login-main-container">
            <Row justify="space-around">
                <Col md={10}>
                    {
                        activeTab === 0 ?
                            <div className="login-form-containrer">
                                <Form
                                    name="e-key"
                                    onFinish={handleKeySubmit}
                                    scrollToFirstError
                                    validateMessages={validateMessages}
                                >
                                    <div style={{
                                        maxHeight: 300,
                                        overflowY: 'auto',
                                        border: "1px solid #999",
                                        borderRadius: 11,
                                        marginBottom: 10,
                                        padding: 10
                                    }}>
                                    <Form.Item
                                        name="key">
                                        <Radio.Group
                                            size="large">
                                            {
                                                eKeys.map(data => <Radio key={data.value} value={data}>
                                                    <div className="client-availbale-key">
                                                        <div>FIO: {data.text.CN} </div>
                                                        <div>STIR: {data.text.TIN}</div>
                                                        <div>Tashkilot: {data.text.O}</div>
                                                        <div>Amal qilish muddati: 
                                                            {moment(data.text.validTo).format("MMMM Do YYYY, H:mm:ss")}
                                                        </div>
                                                    </div>
                                                </Radio>)
                                            }
                                        </Radio.Group>
                                    </Form.Item>
                                    </div>
                                    <Form.Item>
                                        <Button
                                            loading={isKeyLoading}
                                            style={{ display: 'block', width: '100%' }}
                                            className="factra-action-btns sing-btn"
                                            size="large"
                                            htmlType="submit"
                                            icon={<FontAwesomeIcon icon="sign-in-alt" 
                                            className="factura-action-btn-icons" />}>
                                            Kirish
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div onClick={()=>setActiveTab(1)} style={{ textAlign: "center", cursor: "pointer" }}>STIR va parol orqali kirish</div>
                            </div>
                            :
                            <div className="login-form-containrer">
                                <h3>STIR va parol bilan kirish</h3>
                                <Form
                                    name="tin-pass"
                                    onFinish={handleSubmit}
                                    scrollToFirstError
                                    validateMessages={validateMessages}
                                >
                                    <Form.Item>
                                        <Form.Item
                                            key="dyna-form-facutura-no-old"
                                            name="tin"
                                            rules={[{ required: true }]}>
                                            <Input
                                                size="large"
                                                placeholder="STIR" />
                                        </Form.Item>
                                        <span className="custom-input-label-1">STIR</span>
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item
                                            key="dyna-form-facutura-no-old"
                                            name="password"
                                            rules={[{ required: true }]}>
                                            <Input.Password
                                                size="large"
                                                placeholder="Parol" />
                                        </Form.Item>
                                        <span className="custom-input-label-1">Parol</span>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            loading={isLoading}
                                            style={{ display: 'block', width: '100%' }}
                                            className="factra-action-btns sing-btn"
                                            size="large"
                                            htmlType="submit"
                                            icon={<FontAwesomeIcon icon="sign-in-alt" className="factura-action-btn-icons" />}>
                                            Kirish
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div style={{textAlign: "center", cursor: "pointer"}} onClick={()=>setActiveTab(0)}>E-imzo bilan kirish</div>
                            </div>

                    }

                </Col>
            
            </Row>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (data) => dispatch(succesLogIn(data))
})

export default connect(null, mapDispatchToProps)(Login)
