import React from "react";
import {Button, Form, Input} from "antd";
import st from './notify.module.scss'

function Notify() {
    return(
        <>
            <div className={`${st.block} flexible`}>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Подключить телеграм бот:</p>
                    <Form>
                        <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите старый пароль:</p></span>
                            <Form.Item
                                rules={[{required: true}]}
                                name="number">
                                <Input size="large" placeholder="Введите старый пароль:" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите новый пароль:</p></span>
                            <Form.Item
                                rules={[{required: true}]}
                                name="number">
                                <Input size="large" placeholder="Введите новый пароль" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Введите новый пароль, еще раз:</p></span>
                            <Form.Item
                                rules={[{required: true}]}
                                name="number">
                                <Input size="large" placeholder="Введите новый пароль" />
                            </Form.Item>
                        </Form.Item>
                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
                <div style={{width:'4%'}}></div>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Получайте уведомления через телефонный номер:</p>
                    <Form>
                        <Form.Item style={{marginTop:'9%'}}>
                            <span className="custom-input-label-1"><p className="label">Введите номер телефона:</p></span>

                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <Input
                                    size="large"
                                    placeholder="Введите номер телефона:" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <span className="custom-input-label-1"><p className="label">Введите код отправленный через SMS:</p></span>
                                <Input
                                    size="large"
                                    placeholder="XXX-XXX" />
                            </Form.Item>
                        </Form.Item>
                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Notify