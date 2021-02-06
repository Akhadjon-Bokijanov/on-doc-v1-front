import { Form, Input, Row, Col, message } from 'antd'
import axios from 'axios';
import React from 'react'

const PersonFetch = ({ pTin, tinLabel, pName, nameLabel, form, tinCol, nameCol }) => {

    const handleChange = e => {
        console.log(e.target.value)
        if (!isNaN(e.target.value)) {
            if (e.target.value > 100000000 && e.target.value <= 999999999) {
                axios({
                    url: `/api/v1/companies/tin/${e.target.value}`,
                    method: "GET",
                }).then(res => {
                    //setBuyerData(res.data)
                    const { name, fullName } = res.data;
                    let data = {};
                    data[pName] = name ?? fullName;
                    form.setFieldsValue(data)
                }).catch(err => {
                    console.log(err)
                })
            } else {

            }
        } else {
            message.warning("STIR notog'ri kiritildi!")
        }

    }

    return (
        <div>
            <Row justify="space-between">
                <Col md={tinCol ?? 24}>
                    <Form.Item>
                        <Form.Item

                            name={pTin}
                            key={`${pTin}-tin-name`}
                        >
                            <Input size="large" onChange={handleChange} />
                        </Form.Item>
                        <span className="custom-input-label-1">{tinLabel}</span>
                    </Form.Item>
                </Col>
                <Col md={nameCol ?? 24}>
                    <Form.Item>
                        <Form.Item
                            name={pName}
                            key={`${pName}-tin-name`}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <span className="custom-input-label-1">{nameLabel}</span>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default PersonFetch
