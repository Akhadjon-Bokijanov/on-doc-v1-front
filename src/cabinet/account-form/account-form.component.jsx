import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Input, Row, Form, Button, message} from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setUser } from '../../redux/user/user.action';
import { selectCurrentUser } from '../../redux/user/user.selector';

const AccountForm = ({user, setUserOnly}) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit=(values)=>{
        console.log(values);
        setLoading(true)
        axios({
            method: "patch",
            data: values,
            url: `api/v1/companies/${user.id}`
        }).then(res=>{
            setLoading(false)
            setUserOnly(res.data)
            message.success("Succesfully updated!")
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
    }

    const fields = [
        {
            name: "name",
            label: "Nomi"
        },
        {
            name: "address",
            label: "Manzil"
        },
        {
            name: "oked",
            label: "OKED"
        },
        {
            name: "directorName",
            label: "Direktor"
        },
        {
            name: "accountant",
            label: "Hisobchi"
        },
        {
            name: "phone",
            label: "Telephone"
        },
        {
            name: "account",
            label: "Hisob raqam"
        },
        {
            name: "mfo",
            label: "MFO"
        },
        {
            name: "regCode",
            label: "QQS tolovchi royxatdan otish kodi"
        }
    ]

    return (
        <div className="factura-data-sheet-container" style={{ margin: 15 }}>
            <Form
                initialValues={user}
                onFinish={onSubmit}
                form={form}
            >
                <Row justify="space-between">
                    <Col md={11}>
                        <Form.Item>
                            <Form.Item
                                key={`dyna-form-facutura-no-old-tin`}
                                name="tin"
                                >
                                <Input
                                    rules={[{ required: true }]}
                                    size="large"
                                    disabled
                                    />
                            </Form.Item>
                            <span className="custom-input-label-1">STIR</span>
                        </Form.Item>
                    </Col>
                    {
                        fields.map(field => <Col md={11}>
                            <Form.Item>
                                <Form.Item
                                    key={`dyna-form-facutura-no-old-${field.name}`}
                                    name={field.name}
                                >
                                    <Input
                                        rules={[{ required: true }]}
                                        size="large"
                                    />
                                </Form.Item>
                                <span className="custom-input-label-1">{field.label}</span>
                            </Form.Item>
                        </Col>)
                    }
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

const mapDispatchToProps = dispatch=>({
    setUserOnly: (user)=>dispatch(setUser(user))
})

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)
