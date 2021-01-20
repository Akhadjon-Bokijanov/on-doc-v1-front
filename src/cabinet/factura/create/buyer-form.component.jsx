import React from 'react';
import { Input, Form, Row, Col, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const BuyerForm = ()=>{

    const [buyerData, setBuyerData] = useState();


    const handleFetchBuyer = e =>{
        console.log(e.target.value)
        if(!isNaN(e.target.value)){
            if (e.target.value > 100000000 && e.target.value <=999999999) {
                axios({
                    url: `/api/v1/companies/tin/${e.target.value}`,
                    method: "GET",
                }).then(res=>{
                    setBuyerData(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            }
        }else{
            message.warning("STIR notog'ri kiritildi!")
        }
        
    }

    return (
    <div>
        <h3>Контрагент маълумотлари</h3>
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-buyer"
                name="buyerTin"
                rules={[{required: true}]}
                >
                  <Input
                    onChange={handleFetchBuyer}
                    size="large"
                    placeholder="Oluvchi INN" />
              </Form.Item>
                  <span className="custom-input-label-1">INN</span>
              </Form.Item>
        {
            buyerData ? 
            <div>
                <h3>Ҳамкорингизнинг Корхонаси</h3>
          <Form.Item>
            <Form.Item 
            rules={[{required: true}]}
            key="buyer-name-1-buyerName"
            name="buyerName"
            initialValue={buyerData.companyName}
            >
              <Input      
                size="large"
                placeholder={buyerData.companyName ?? "Hоми"} />
          </Form.Item>
              <span className="custom-input-label-1">Hоми</span>
          </Form.Item>
         
          <Form.Item>
            <Form.Item 
              key="seler-account-vatreg"
              name="buyerVatRegCode"
              initialValue={buyerData.regCode}>
                <Input
                  size="large"
                  placeholder="ҚҚС тўловчисининг регистрация рақами"
                   />
              </Form.Item>
                <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
              </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
                    key="seler-account"
                    initialValue={buyerData.buyer}
                    name="buyerAccount">
                <Input
                  size="large"
                  placeholder="Ҳисоб рақами" />
              </Form.Item>
                <span className="custom-input-label-1">Ҳисоб рақами</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
                key="seler-account"
                name="buyerMfo"
                initialValue={buyerData.mfo}>
                <Input
                  size="large"
                  placeholder="МФО" 
                  />
              </Form.Item>
                <span className="custom-input-label-1">МФО</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            rules={[{required: true}]}
            key="seler-account"
            name="buyerAddress"
            initialValue={buyerData.address}>
              <Input
                size="large"
                placeholder="Манзил" />
          </Form.Item>
              <span className="custom-input-label-1">Манзил</span>
          </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerDirector"
              initialValue={buyerData.directorName}>
                <Input
                  size="large"
                  placeholder="Директор" />
              </Form.Item>
                <span className="custom-input-label-1">Директор</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerAccountant"
              initialValue={buyerData.accountant}>
                <Input
                  size="large"
                  placeholder="Бош хисобчи" />
              </Form.Item>
                <span className="custom-input-label-1">Бош хисобчи</span>
              </Form.Item>
            </Col>
        </Row>
            </div>
            :null
        }
        
    </div>
    )
}

export default BuyerForm;