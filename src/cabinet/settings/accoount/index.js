import React from "react";
import {Button, Form, Input, Switch} from "antd";
import st from './account.module.scss'
import firebase from "../../../utils/firebase";
import { useTranslation } from "react-i18next";


import SaveBtn from "../../../components/Btns/SaveBtn";
import CancelBtn from "../../../components/Btns/CancelBtn";
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
            <Form
                // labelCol={{span: 24}}
                requiredMark={false}
            >
                <div className={`${st.block} flexible`}>


                <div style={{width: (window.innerWidth-32)/2}}>
                    <p className={st.main_title}>Данные для входа</p>


                            <Form.Item
                                // label={t("Eski parolni kiriting")}
                                rules={[{required: true}]}
                                name="number">
                                <span className={st.label}>Логин/Почта</span>
                            <Input size="large" placeholder="Логин/Почта"/>
                            </Form.Item>
                             <Form.Item
                                rules={[{required: true}]}
                                name="code">
                                 <span className={st.label}>Номер телефона</span>
                            <Input size="large" placeholder="Номер телефона" />
                            </Form.Item>

                            <Form.Item rules={[{required: true}]}>

                                <div className="flexible">
                                    <Switch name={'switch1'}/>
                                    <p className={st.desc}>Получать уведомление на номер телефона</p>
                                </div>
                                <div className="flexible">
                                    <Switch name={'switch2'} />
                                    <p className={st.desc}>Комфортный режим</p>
                                </div>
                            </Form.Item>
                    {/*</Form>*/}
                </div>

                <div style={{width: 32}}></div>
                <div style={{width: (window.innerWidth-32)/2}}>
                    <p className={st.main_title}>Изменение пароля:</p>
                    {/*<Form*/}
                    {/*labelCol={{span: 24}}*/}
                    {/*requiredMark={false}*/}
                    {/*    onFinish={onSignInSubmit}*/}
                    {/*    name="sms-varifiaction">*/}
                            <Form.Item
                                rules={[{required: true}]}
                                style={{width:'61.5%'}}
                                name="number">
                                <span className={st.label}>Введите старый пароль: <span className={'red_color'}>*</span></span>
                                <div className={st.psw}>
                                    <Input.Password size="large" placeholder="+998xx xxx xx xx" />
                                </div>
                            </Form.Item>
                        <div id="recaptcha-container">
                            
                        </div>
                            <Form.Item name="code">
                                <span className={st.label}>Введите новый пароль:</span>
                                <div className={st.psw}>
                                    <Input.Password size="large" placeholder="XXX-XXX" />
                                </div>
                            </Form.Item>
                        <Form.Item name="code">
                                <span className={st.label}>Введите новый пароль, еще раз:</span>
                                <div className={st.psw}>
                                    <Input.Password size="large" placeholder="XXX-XXX"/>
                                </div>
                        </Form.Item>
                </div>
                </div>
                <div className="flexible" style={{marginTop:'10px'}}>
                    <SaveBtn />
                    <CancelBtn />
                </div>
            </Form>

        </>
    )
}

export default Account;