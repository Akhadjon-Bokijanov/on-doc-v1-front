import React from "react";
import {Button, Form, Input} from "antd";
import st from './notify.module.scss'

function Notify() {
    return(
        <>
            <div className="flexible">
                <div style={{width:'48%'}}>
                    <h2>Подключить телеграм бот:</h2>
                    <Form>
                        <Form.Item style={{marginTop:'9%'}}>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <Input
                                    size="large"
                                    placeholder="Введите номер телефона:" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите номер телефона:</p></span>
                        </Form.Item>
                        <p className={st.description}>Перед подтверждением номера мобильного телефона, убедитесь что Ваш номер зарегистрирован в @OnlineFactura в Telegram.</p>
                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
                <div style={{width:'4%'}}></div>
                <div style={{width:'48%'}}>
                    <h2>Получайте уведомления через телефонный номер:</h2>
                    <Form>
                        <Form.Item style={{marginTop:'9%'}}>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <Input
                                    size="large"
                                    placeholder="Введите номер телефона:" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите номер телефона:</p></span>
                        </Form.Item>
                        <Form.Item style={{marginTop:'9%'}}>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <Input
                                    size="large"
                                    placeholder="XXX-XXX" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите код отправленный через SMS:</p></span>
                        </Form.Item>
                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Notify