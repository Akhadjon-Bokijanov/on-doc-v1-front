import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Row, Col, Input, Button } from 'antd'
import React, {useState} from 'react'

const PasswordChange = () => {

    const [loading, setLoading] = useState(false);
    
    const handleFinish = values=>{
        console.log(values)
    }


    return (
        <div>
            <Form
                onFinish={handleFinish}
            >
                <Row justify="space-between">
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                key={`dyna-form-facutura-no-old-tin`}
                                name="password"
                            >
                                <Input.Password
                                    rules={[{ required: true }]}
                                    size="large"
                                />
                            </Form.Item>
                            <span className="custom-input-label-1">Yangi parol</span>
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                key={`dyna-form-facutura-no-old-tin`}
                                name="password-confirm"
                            >
                                <Input.Password
                                    rules={[{ required: true }]}
                                    size="large"
                                />
                            </Form.Item>
                            <span className="custom-input-label-1">Prolni tasdiqlang</span>
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="factra-action-btns sing-btn"
                            size="large"
                            icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons" />}>
                            Saqlash
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default PasswordChange
