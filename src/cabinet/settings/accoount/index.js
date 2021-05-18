import React, {useState} from "react";
import {Button, Form, Input, Switch} from "antd";
import st from './account.module.scss'

function Account() {
    const [switch1,setSwitch1]=useState(true);
    const [switch2,setSwitch2]=useState(true);

    return(
        <>
            <div className={`${st.block} flexible`}>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Данные для входа</p>
                    <Form>
                        <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Логин/Почта</p></span>
                            <Form.Item
                                rules={[{required: true}]}
                                name="number">
                                <Input size="large" placeholder="Логин/Почта" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <span className="custom-input-label-1"><p className="label">Номер телефона</p></span>
                            <Form.Item
                                rules={[{required: true}]}
                                name="number">
                                <Input size="large" placeholder="Номер телефона" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            {/*<span className="custom-input-label-1"><p className="label">Введите новый пароль, еще раз:</p></span>*/}
                            <Form.Item
                                rules={[{required: true}]}
                            >
                                <div className="flexible">
                                    <Switch name={'switch1'} className={switch1?st.switch_green:''} onChange={(e)=>setSwitch1(e)} defaultChecked={switch1}/>
                                    <p className={st.desc}>Получать уведомление на номер телефона</p>
                                </div>
                                <div className="flexible">
                                    <Switch name={'switch2'} className={switch2?st.switch_green:''} onChange={e=>setSwitch2(e)} defaultChecked={switch2}/>
                                    <p className={st.desc}>Комфортный режим</p>
                                </div>
                            </Form.Item>
                        </Form.Item>

                        <Button size={"large"} className={st.podkluchit}>Подключить</Button>
                    </Form>
                </div>
                <div style={{width:'4%'}}></div>
                <div style={{width:'48%'}}>
                    <p className={st.main_title}>Изменение пароля:</p>
                    <Form>
                        <Form.Item style={{height:'100px'}}>
                            <span className="custom-input-label-1"><p className="label">Введите старый пароль: <span className={'red_color'}>*</span></p></span>

                            <Form.Item
                                rules={[{required: true}]}
                                style={{width:'61.5%'}}
                                name="number">
                                <Input.Password
                                    size="large"
                                    placeholder="Введите старый пароль:" />
                                    <span className={st.error}>Неправильный пароль</span>
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

export default Account