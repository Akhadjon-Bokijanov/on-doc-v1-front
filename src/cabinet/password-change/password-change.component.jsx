import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, Row, Col, Input, Button } from 'antd'
import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'

const PasswordChange = () => {

    const { t} = useTranslation();

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
                            <span className="custom-input-label-1">{t("Yangi parol")}</span>
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                key={`dyna-form-facutura-no-old-tphone`}
                                name="phone"
                            >
                                <Input
                                    placeholder="+998 xx xxx xx xx"
                                    rules={[{ required: true }]}
                                    size="large"
                                />
                            </Form.Item>
                            <span className="custom-input-label-1">{("Telefon raqam")}</span>
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
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
