import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Input, Row, Form, Button, message, Select} from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setUser } from '../../../redux/user/user.action';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { TextInBracket } from '../../../utils/utils';

const { Option } = Select;

const AccountForm = ({user, setUserOnly}) => {

    const { t } = useTranslation();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit=(values)=>{
        console.log(JSON.stringify(values));
        setLoading(true)
        axios({
            method: "post",
            data: values,
            
            url: `company/update?id=${user.id}`
        }).then(res=>{
            setLoading(false)
            //setUserOnly(res.data)
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
            name: "director_fio",
            label: "Direktor"
        },
        {
            name: "accountant",
            label: "Hisobchi"
        },
        // {
        //     name: "phone",
        //     label: "Telephone"
        // },
        {
            name: "bank_account",
            label: "Hisob raqam"
        },
        {
            name: "mfo",
            label: "MFO"
        },
        
    ]
   

    return (
        
            <Form
                initialValues={user}
                onFinish={onSubmit}
                form={form}
            >
                <Row justify="space-between" gutter={[32, 0]}>
                    <Col md={12}>
                    
                        <Form.Item>
                            <Form.Item
                                initialValue={user.tin??user.username}
                                key={`dyna-form-facutura-no-old-tin`}
                                name="tin"
                                >
                                <Input
                                    rules={[{ required: true }]}
                                    size="large"
                                    disabled
                                    />
                            </Form.Item>
                            <span className="custom-input-label-1">{t("STIR")}</span>
                        </Form.Item>
                    </Col>
                    {
                        fields.map(field => <Col md={12}>
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
                    <Col md={12}>
                        <Form.Item>
                            <Form.Item
                                key={`dyna-form-facutura-no-old-tin-vil`}
                                name="ns10_code"
                            >
                                <Select
                                    rules={[{ required: true }]}
                                    size="large"
                                    bordered={false}
                                >

                                <Option value={1}>Tashkent</Option>
                                <Option value={2}>Andijon</Option>
                                <Option value={3}>Tashkent</Option>
                                <Option value={14}>Namangan</Option>
                                </Select>
                            </Form.Item>
                            <span className="custom-input-label-1">{t("Viloyat")}</span>
                        </Form.Item>
                    </Col>
                   <Col md={12}>
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
    )
}

const mapDispatchToProps = dispatch=>({
    setUserOnly: (user)=>dispatch(setUser(user))
})

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)
