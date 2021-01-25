import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Row, Col, Input, Select, Button, message, Radio } from 'antd'
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { succesLogIn } from '../../redux/user/user.action';
import { EIMZOClient } from '../../utils/e-imzo';
import './login.style.scss'

const { Option } = Select;

const Login = ({ setCurrentUser }) => {

    const [eKeys, setEKeys] = useState([])

    useEffect(() => {
        EIMZOClient.listAllUserKeys(function(o, i){
            // console.log(o);
            var itemId = "itm-" + o.serialNumber + "-" + i;
            return itemId;
        },function(itemId, v){
            eKeys.push({value: itemId, text: v})
            setEKeys([...eKeys])
            console.log(v)
            console.log(eKeys)
            //return uiCreateItem(itemId, v);
        },function(items, firstId){
            console.log(items, firstId)
            // uiFillCombo(items);
            // uiLoaded();
            // uiComboSelect(firstId);
        },function(e, r){
            console.log((e, r))
            message.error("E-Imzo xatosi. Sizda E-Imzo programmasi yoki E-Imzo browseri mavjud emas!")
        });
    }, [])


    const [isLoading, setIsLoading] = useState(false);
    const [isKeyLoading, setKeyIsLoading] = useState(false);

    const validateMessages = {
        required: 'Bu maydon majburiy!',
      };

    const handleSubmit = value =>{
        setIsLoading(true)
        console.log(value)
        axios({
            url: '/api/v1/login-with-password', 
            data: value,
            method: 'POST',
        }).then(res=>{
            setCurrentUser(res.data)
            setIsLoading(false)
        }).catch(err=>{
            console.log(err)
            setIsLoading(false)
            message.error("Kabinetga kirishda xatolik!");
        })
    }

    const handleKeySubmit = value =>{
        setIsLoading(true)
        console.log(value)
        axios({
            url: '/api/v1/key-login', //URL for company: '/api/v1/company-login'
            data: value,
            method: 'POST',
        }).then(res=>{
            setCurrentUser(res.data)
            setIsLoading(false)
        }).catch(err=>{
            console.log(err)
            setIsLoading(false)
            message.error("Kabinetga kirishda xatolik!");
        })
    }
    
    return (
        <div className="login-main-container">
            <Row justify="space-around">
                <Col md={10}>
                    <div className="login-form-containrer">
                    <Form
                        name="e-key"
                        onFinish = {handleKeySubmit}
                        scrollToFirstError
                        validateMessages={validateMessages}
                    >
                      <Form.Item valuePropName="checked">
                        <Radio.Group 
                        name="key"
                        size="large">
                        {   
                            eKeys.map(data=><Radio key={data.value} value={data.value}>
                                <div className="client-availbale-key">
                                    <div>FIO: {data.text.CN} </div>
                                    <div>STIR: {data.text.TIN}</div> 
                                    <div>Tashkilot: {data.text.O}</div>
                                </div>
                            </Radio>)
                        }
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                        <Button
                            loading={isKeyLoading}
                            style={{display: 'block', width: '100%'}}
                            className="factra-action-btns sing-btn" 
                            size="large"
                            htmlType="submit"
                            icon={<FontAwesomeIcon icon="sign-in-alt" className="factura-action-btn-icons" />}>
                                Kirish
                        </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Col>
                <Col md={10}>
                    <div className="login-form-containrer">
                        <h3>STIR va parol bilan kirish</h3>
                    <Form
                        name="tin-pass"
                        onFinish = {handleSubmit}
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
                                placeholder="STIR" />
                        </Form.Item>
                            <span className="custom-input-label-1">STIR</span>
                        </Form.Item>  
                        <Form.Item>
                            <Form.Item 
                                key="dyna-form-facutura-no-old"
                                name="password"
                                rules={[{required: true}]}>
                                <Input.Password
                                    size="large"
                                    placeholder="Parol" />
                            </Form.Item>
                            <span className="custom-input-label-1">Parol</span>
                        </Form.Item>   
                       
                        <Form.Item>
                        <Button
                            loading={isLoading}
                            style={{display: 'block', width: '100%'}}
                            className="factra-action-btns sing-btn" 
                            size="large"
                            htmlType="submit"
                            icon={<FontAwesomeIcon icon="sign-in-alt" className="factura-action-btn-icons" />}>
                                Kirish
                        </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapDispatchToProps = dispatch=>({
    setCurrentUser: (data)=>dispatch(succesLogIn(data))
})

export default connect(null, mapDispatchToProps)(Login)
