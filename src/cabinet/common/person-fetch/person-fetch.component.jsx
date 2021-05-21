import { Form, Input, Row, Col, message } from 'antd'
import axios from 'axios';
import React from 'react'

const PersonFetch = ({ pTin, tinLabel, pName, nameLabel, form, tinCol, nameCol }) => {

    const handleChange = e => {
        console.log(e.target.value)
        if (!isNaN(e.target.value)) {
            if (e.target.value > 100000000 && e.target.value <= 999999999) {
                axios({
                    url: `info/contragent-by-tin?tin=${e.target.value}`,
                    method: "GET",
                }).then(res => {
                    //setBuyerData(res.data)
                    console.log(res)
                    const { name, fullName } = res.data;
                    let data = {};
                    if(Array.isArray(pName)){
                        let fetcherData = form.getFieldValue("contract_partners");
                        fetcherData[pName[0]][pName[1]] = name ?? fullName;
                        form.setFieldsValue({contract_partners: [...fetcherData, ]})
                    }else{
                        data[pName] = name ?? fullName;
                        form.setFieldsValue(data)
                    }
                    
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
            <Row justify="space-between" gutter={[24, 0]}>
                <Col md={tinCol ?? 24}>
                    {/* <Form.Item> */}
                        <Form.Item
                        label={tinLabel}
                            name={pTin}
                            key={`${pTin}-tin-name`}
                        >
                            <Input size="large" onChange={handleChange} placeholder={tinLabel}/>
                        </Form.Item>
                        {/* <span className="custom-input-label-1"></span> */}
                    {/* </Form.Item> */}
                </Col>
                <Col md={nameCol ?? 24}>
                    {/* <Form.Item> */}
                        <Form.Item
                            name={pName}
                            key={`${pName}-tin-name`}
                        label={nameLabel}
                        >
                            <Input size="large" placeholder={nameLabel}/>
                        </Form.Item>
                        {/* <span className="custom-input-label-1"></span> */}
                    {/* </Form.Item> */}
                </Col>
            </Row>
        </div>
    )
}

export default PersonFetch
