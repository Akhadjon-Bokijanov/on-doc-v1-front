import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Row, Col, Input, Select, Button, message, Radio } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setLoadedKeyId, setKeyUser, succesLogIn } from '../../../redux/user/user.action';
import { EIMZOClient } from '../../../utils/e-imzo';
import moment from 'moment';
import st from './login.module.scss'
import { withRouter } from 'react-router-dom';
import { Generator } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Login = ({ setCurrentUser, history, setEspUser, setKeyId }) => {

    const { t } = useTranslation();
    const [eKeys, setEKeys] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyLoading, setKeyIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [notFound, setNotFound] = useState(false);


    useEffect(() => {
        EIMZOClient.listAllUserKeys(function (o, i) {
            // console.log(o);
            var itemId = "itm-" + o.serialNumber + "-" + i;
            return itemId;
        }, function (itemId, v) {
            eKeys.push({ value: itemId, text: v })
            setEKeys([...eKeys])
            //return uiCreateItem(itemId, v);
        }, function (items, firstId) {
            // uiFillCombo(items);
            // uiLoaded();
            // uiComboSelect(firstId);
        }, function (e, r) {
            console.log((e, r))
            message.error(t("E-Imzo xatosi. Sizda E-Imzo programmasi yoki E-Imzo browseri mavjud emas!"))
        });
    }, [])

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
            history.push("/home/choosecompany")
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
            message.error(t("Kabinetga kirishda xatolik!"));
            setNotFound(!notFound);

        })
    }

    const handleKeySubmit = value => {
        //setKeyIsLoading(true)        
        let data = Generator(24);
        console.log(value);
        EIMZOClient.loadKey(
            value.key.text,
            id => {
                setKeyId({id: id, time: Date.now()});
                EIMZOClient.createPkcs7(
                    id, 
                    data,
                    null,
                    pkcs7Text => {
                        
                        axios({
                            url: "site/auth",
                            method: "post",
                            data: {
                                keyId: id,
                                guid: data,
                                pkcs7: pkcs7Text
                            }
                        }).then(res=>{
                            let { success } = res.data;
                            if (success){
                                setCurrentUser(res.data)
                                setEspUser(res.data.data)
                                message.success(t("Muaffaqiyatli kirish!"));
                                history.push("/home/choosecompany")
                            }else{
                                message.error(t("Kabinetga kirishda xatolik!"))
                                setNotFound(!notFound);
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
        <div className={st.login_main_container} style={{
            marginTop:"140px",
            marginRight:"100px"}
        }>
            <Row justify="space-around">
                {
                    !notFound&&
                    <Col md={24}>
                    {
                        activeTab === 0 ?
                            <div>
                                <h2>Welcome</h2>
                                <Form
                                    name="e-key"
                                    onFinish={handleKeySubmit}
                                    scrollToFirstError
                                    validateMessages={validateMessages}
                                >
                                    <div>
                                        <Form.Item
                                            className={st.login_form_container}
                                            name="key">
                                            <Radio.Group
                                                size="large">
                                                {
                                                    eKeys.map(data => <Radio key={data.value} value={data}>
                                                        <div className={st.client_availbale_key}>
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
                                            style={{display: 'block', width: '55%'}}
                                            className={st.login_btn}
                                            size="large"
                                            htmlType="submit"
                                        >
                                            {t("Kirish")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div onClick={() => setActiveTab(1)}
                                     className={st.login_link}>{t("STIR va parol bilan kirish")}</div>
                            </div>
                            :
                            <div>
                                <h2>Enter with pssword</h2>
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
                                            rules={[{required: true}]}>
                                            <Input
                                                size="large"
                                                placeholder={t("STIR")}/>
                                        </Form.Item>
                                        {/*<span className="custom-input-label-1">{t("STIR")}</span>*/}
                                    </Form.Item>
                                    {/*<Form.Item>*/}
                                    <Form.Item
                                        key="dyna-form-facutura-no-old"
                                        name="password"
                                        rules={[{required: true}]}>
                                        <Input.Password
                                            size="large"
                                            // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            placeholder={t("Parol")}/>
                                    </Form.Item>
                                    {/*<span className="custom-input-label-1">{t("Parol")}</span>*/}
                                    {/*</Form.Item>*/}

                                    <Form.Item>
                                        <Button
                                            loading={isLoading}
                                            style={{display: 'block', width: '100%'}}
                                            className={st.login_btn}
                                            size="large"
                                            htmlType="submit">
                                            {t("Kirish")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className={st.login_link} onClick={() => setActiveTab(0)}>{t("E-imzo bilan kirish")}</div>
                            </div>

                    }
                </Col>}
                {
                    notFound &&
                    <Col span={24}>
                    <h1>Certificate not found</h1>
                    <Button
                        onClick={()=>setNotFound(!notFound)}
                        loading={isLoading}
                        style={{display: 'block', width: '100%'}}
                        className={st.login_btn}
                        size="large"
                        htmlType="submit">
                        Enter with password.
                    </Button>
                </Col>}
            </Row>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (data) => dispatch(succesLogIn(data)),
    setEspUser: data=>dispatch(setKeyUser(data)),
    setKeyId: id => dispatch(setLoadedKeyId(id))
})

export default connect(null, mapDispatchToProps)(withRouter(Login))
