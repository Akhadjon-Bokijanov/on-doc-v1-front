import React from 'react';
import { Input, Form, Row, Col } from 'antd';

const SellerForm = () => {
    return (
        <div>
            <h3>Сизнинг маълумотларингиз</h3>
              <Form.Item>
                <Form.Item 
                key="dyna-form-item-inn-seller"
                name="sellerTin"
                rules={[{required: true}]}>
                  <Input    
                    defaultValue="999111333"
                    disabled
                    size="large"
                    placeholder="Sotuvchi INN" />
              </Form.Item>
                  <span className="custom-input-label-1">INN</span>
              </Form.Item>
            <h3>Ташкилот</h3>
          <Form.Item>
            <Form.Item 
            key="seller-name-1-sellerName"
            rules={[{required: true}]}
            name="sellerName">
              <Input
                
                size="large"
                placeholder="Сотувчи номи" />
          </Form.Item>
              <span className="custom-input-label-1">Сотувчи номи</span>
          </Form.Item>
          <Form.Item>
            <Form.Item 
              key="seler-account-vatreg"
              name="sellerVatRegCode">
                <Input
                  size="large"
                  placeholder="ҚҚС тўловчисининг регистрация рақами" />
              </Form.Item>
                <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
              </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerAccount">
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
              name="sellerMfo">
                <Input
                  size="large"
                  placeholder="МФО" />
              </Form.Item>
                <span className="custom-input-label-1">МФО</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            key="seler-account"
            name="sellerAddress">
              <Input
                rules={[{required: true}]}
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
              name="sellerDirector">
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
              name="sellerAccountant">
                <Input
                  size="large"
                  placeholder="Бош хисобчи" />
              </Form.Item>
                <span className="custom-input-label-1">Бош хисобчи</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
    )
}

export default SellerForm;
