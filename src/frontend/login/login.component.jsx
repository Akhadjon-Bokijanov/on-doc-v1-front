import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Row, Col, Input, Select, Button, message, Radio } from 'antd'
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUserCompanies, succesLogIn } from '../../redux/user/user.action';
import { EIMZOClient } from '../../utils/e-imzo';
import moment from 'moment';
import './login.style.scss'
import { withRouter } from 'react-router-dom';
import { Generator } from '../../utils/utils';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Login = ({ setCurrentUser, history, setUserComps }) => {

    const { t } = useTranslation();
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
            setUserComps([
                {
                    name: "Tech Stack ma'sulyati cheklangan jamiyati",
                    tin: 307607131,
                    id: 1
                },
                {
                    name: "Updated User",
                    tin: 518059386,
                    id: 2
                }
            ])
            history.push("/home/choosecompany")
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
            message.error(t("Kabinetga kirishda xatolik!"));
        })
    }

    const handleKeySubmit = value => {
        //setKeyIsLoading(true)        
        let data = Generator(24);

        EIMZOClient.loadKey(
            value.key.text,
            id => {

                console.log(id);
                EIMZOClient.createPkcs7(
                    id, 
                    data,
                    null,
                    pkcs7Text => {
                        //console.log(pkcs7Text);
                        
                        console.log(JSON.stringify(
                            {
                                keyId: id,
                                guid: data,
                                pkcs7: pkcs7Text
                            }
                        ))

                        axios({
                            url: "site/auth",
                            method: "post",
                            data: {
                                keyId: id,
                                guid: data,
                                pkcs7: pkcs7Text
                            }
                        }).then(res=>{
                            console.log(res)
                            let { success } = res.data;
                            if (success){
                                setCurrentUser(res.data)
                                message.success(t("Muaffaqiyatli kirish!"));
                                history.push("/home/choosecompany")
                            }else{
                                message.error(t("Kabinetga kirishda xatolik!"))
                            }
                        }).catch(e=>{
                            console.log(e);
                        })
                    },
                    (e, r) => {
                        console.log("e:", e);
                        console.log("r:", r);
                        message.error(r);
                    },
                    (e, r)=>{
                        console.log("e:", e);
                        console.log("r:", r);
                        message.error(r);
                    }
                    )
            },
            function (e, r) {
                console.log("Load key e:", e);
                console.log("Load key r:", r);
            })
        
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
                                                        <div>{t("FIO")}: {data.text.CN} </div>
                                                        <div>{t("STIR")}: {data.text.TIN}</div>
                                                        <div>{t("Tashkilot")}: {data.text.O}</div>
                                                        <div>{t("Amal qilish muddati")}: 
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
                                            {t("Kirish")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div onClick={()=>setActiveTab(1)} style={{ textAlign: "center", cursor: "pointer" }}>{t("STIR va parol orqali kirish")}</div>
                            </div>
                            :
                            <div className="login-form-containrer">
                                <h3>{t("STIR va parol bilan kirish")}</h3>
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
                                                placeholder={t("STIR")} />
                                        </Form.Item>
                                        <span className="custom-input-label-1">{t("STIR")}</span>
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item
                                            key="dyna-form-facutura-no-old"
                                            name="password"
                                            rules={[{ required: true }]}>
                                            <Input.Password
                                                size="large"
                                                placeholder={t("Parol")} />
                                        </Form.Item>
                                        <span className="custom-input-label-1">{t("Parol")}</span>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            loading={isLoading}
                                            style={{ display: 'block', width: '100%' }}
                                            className="factra-action-btns sing-btn"
                                            size="large"
                                            htmlType="submit"
                                            icon={<FontAwesomeIcon icon="sign-in-alt" className="factura-action-btn-icons" />}>
                                            {t("Kirish")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div style={{textAlign: "center", cursor: "pointer"}} onClick={()=>setActiveTab(0)}>{t("E-imzo bilan kirish")}</div>
                            </div>

                    }

                </Col>
            
            </Row>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (data) => dispatch(succesLogIn(data)),
    setUserComps: data=>dispatch(setUserCompanies(data))
})

export default connect(null, mapDispatchToProps)(withRouter(Login))
