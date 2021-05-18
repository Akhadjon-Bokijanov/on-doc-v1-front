import React from "react";
import {Button, Form, Input, Switch} from "antd";
import st from './account.module.scss'
import firebase from "../../../utils/firebase";
import { useTranslation } from "react-i18next";

function Account() {

    const { t } = useTranslation();
    
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        });
    }



    // useEffect(()=>{
    //     setUpRecaptcha();
    // },[])

    const onSignInSubmit = (values) => {
        //e.preventDefault();
        setUpRecaptcha();
        const phoneNumber = values.number//getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("SMS send");
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.error("SMS not send ", error);
            });

    }

    


    return(
        <>
            <div className={`${st.block} flexible`}>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Подключить телеграм бот:</p>
                    <Form
                    labelCol={{span: 24}}
                    requiredMark={false}
                    >
                        {/* <Form.Item>
                            <span className="custom-input-label-1"><p className="label"></p></span> */}
                            <Form.Item
                                label={t("Eski parolni kiriting")}
                                rules={[{required: true}]}
                                name="number">
                            <Input size="large" placeholder={t("Eski parolni kiriting")}/>
                            </Form.Item>
                        {/* </Form.Item> */}
                        {/* <Form.Item>
                            <span className="custom-input-label-1"><p className="label"></p></span> */}
                            <Form.Item
                                label={t("Yangi parolni kiriting")}
                                rules={[{required: true}]}
                                name="code">
                            <Input size="large" placeholder={t("Yangi parolni kiriting")} />
                            </Form.Item>
                        {/* </Form.Item> */}

                        {/* <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите новый пароль, еще раз:</p></span> */}
                            <Form.Item
                                label={t("Parolni qayta kiriting")}
                                rules={[{required: true}]}
                            >
                                <div className="flexible">
                                    <Switch name={'switch1'}/>
                                    <p className={st.desc}>Получать уведомление на номер телефона</p>
                                </div>
                                <div className="flexible">
                                    <Switch name={'switch2'} />
                                    <p className={st.desc}>Комфортный режим</p>
                                </div>
                            </Form.Item>
                        {/* </Form.Item> */}
                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
                <div style={{width:'4%'}}></div>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Получайте уведомления через телефонный номер:</p>
                    <Form
                    labelCol={{span: 24}}
                    requiredMark={false}
                        onFinish={onSignInSubmit}
                        name="sms-varifiaction"
                    >
                        {/* <Form.Item style={{marginTop:'9%'}}>
                            <span className="custom-input-label-1"><p className="label"></p></span> */}

                            <Form.Item
                                label={t("Telefon raqamni kiriting")}
                                rules={[{required: true}]}
                                style={{width:'61.5%'}}
                                name="number">
                                <div className={st.psw}>
                                    <Input.Password
                                        size="large"
                                        placeholder="+998xx xxx xx xx" />
                                </div>
                            </Form.Item>
                        {/* </Form.Item> */}
                        <div id="recaptcha-container">
                            
                        </div>
                        {/* <Form.Item> */}
                            <Form.Item
                                // rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="code" 
                                label="Введите новый пароль:"
                                >
                                {/* <span className="custom-input-label-1"><p className="label"></p></span> */}
                                <div className={st.psw}>
                                    <Input.Password
                                        size="large"
                                        placeholder="XXX-XXX" />
                                </div>
                            </Form.Item>
                        <Form.Item
                                // rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="code"
                                label="Введите новый пароль, еще раз:"
                                >
                                {/* <span className="custom-input-label-1"><p className="label"></p></span> */}
                                <div className={st.psw}>
                                    <Input.Password
                                        size="large"
                                        placeholder="XXX-XXX" />
                                </div>
                            </Form.Item>

                        {/* </Form.Item> */}
                        <Button size={"large"} htmlType="submit" className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Account;