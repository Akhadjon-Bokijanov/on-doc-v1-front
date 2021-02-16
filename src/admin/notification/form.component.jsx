import { Col, Form, Input, Row, Select, Button, Switch, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const { Option } = Select;

const NotificationForm = ({ match }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { notificationId } = match.params;
    
    useEffect(()=>{
        if(notificationId){
            axios({
                url:"api/v1/notifications/"+notificationId,
                method: "get"
            })
            .then(res=>{
                form.setFieldsValue(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[])
    
    const handleSubmit = values => {

        setLoading(true)
        axios({
            method:  notificationId ? "patch" : "post",
            data: values,
            url: notificationId ? "/api/v1/notifications/"+notificationId  : "/api/v1/notifications" 
        }).then(res=>{
            if(res.data.ok){
                message.success("Notification saqlandi!");
            }else{
                message.error("Notification saqlashda xatolik!");
            }
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            message.error("Notification saqalashda xatolik!");
            setLoading(false);
        })

    }

    return (
        <div style={{marginTop: 20}}>
            <Form
                form={form}
                onFinish={handleSubmit}
                scrollToFirstError
            >
                <div className="factura-data-sheet-container">
                <h3>Notification yaratish</h3>
                <Row justify="space-between">
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                rules={[{ required: true }]}
                                key="dyna-form-facutura-no"
                                name="title_uz">
                                <Input
                                    size="large"
                                    />
                            </Form.Item>
                            <span className="custom-input-label-1">Notification sarlavhasi (uz)</span>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                rules={[{ required: true }]}
                                key="dyna-form-facutura-no"
                                name="title_ru">
                                <Input
                                    size="large"
                                    />
                            </Form.Item>
                            <span className="custom-input-label-1">Notification sarlavhasi (ru)</span>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                rules={[{ required: true }]}
                                key="dyna-form-facutura-no"
                                name="title_en">
                                <Input
                                    size="large"
                                    />
                            </Form.Item>
                            <span className="custom-input-label-1">Notification sarlavhasi (en)</span>
                        </Form.Item>
                        
                        <Form.Item>
                            <Form.Item
                                rules={[{ required: true }]}
                                key="dyna-form-facutura-no"
                                name="importance">
                                <Select
                                    bordered={false}
                                    size="large"
                                    name="importance"
                                    defaultActiveFirstOption
                                >
                                    <Option value={1}>1 - Uncha muxim emas</Option>
                                    <Option value={2}>2 - Muxim emas</Option>
                                    <Option value={3}>3 - Muxim</Option>
                                    <Option value={4}>4 - Muximroq</Option>
                                    <Option value={5}>5 - O'ta muxim</Option>
                                </Select>
                            </Form.Item>
                            <span className="custom-input-label-1">Notification muximligi</span>
                        </Form.Item>
                        <Row justify="space-between">
                            <Col md={11}>
                                <Form.Item
                                    label="Holati"
                                    name="isActive"
                                    valuePropName="checked"
                                    rules={[{ required: true }]}
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col md={11}>
                                <Form.Item>
                                    <Button 
                                        loading={loading}
                                        style={{width: '100%'}}
                                        size="large" 
                                        htmlType="submit"
                                        className="factra-action-btns save-btn"
                                        >Saqlash</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            name="body_uz"
                            
                            rules={[{ required: true }]}
                        >
                            <TextArea 
                                placeholder="Body uz"
                                rows={4} size="large" />
                        </Form.Item>
                        <Form.Item
                        
                            name="body_ru"
                            rules={[{ required: true }]}
                        >
                            <TextArea rows={4} 
                                placeholder="Body ru"
                                size="large" />
                        </Form.Item>
                        <Form.Item
                            name="body_en"
                            
                            rules={[{ required: true }]}
                        >
                            <TextArea 
                                placeholder="Body en"
                                rows={4} size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                </div>
            </Form>
        </div>
    )
}

export default NotificationForm
