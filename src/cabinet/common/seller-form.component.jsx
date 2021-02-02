import React from 'react';
import { Input, Form, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';

const SellerForm = ({ user, docType }) => {

  const { tin, name, fullName, regCode, mfo, account, address, directorName, accountant } = user;

    return (
        <div>
            <h3>Сизнинг маълумотларингиз</h3>
              <Form.Item>
                <Form.Item 
                key="dyna-form-item-inn-seller"
                name="sellerTin"
                rules={[{required: true}]}
                initialValue={tin}>
                  <Input    
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
            name="sellerName"
            initialValue={name ?? fullName}>
              <Input
                
                size="large"
                placeholder="Сотувчи номи" />
          </Form.Item>
              <span className="custom-input-label-1">Сотувчи номи</span>
          </Form.Item>
          {
            docType ==="contract"
            ? null
            : <Form.Item>
            <Form.Item 
              key="seler-account-vatreg"
              name="sellerVatRegCode"
              initialValue={regCode}>
                <Input
                  size="large"
                  placeholder="ҚҚС тўловчисининг регистрация рақами" />
              </Form.Item>
                <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
              </Form.Item>
          }
          
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerAccount"
              initialValue={account}>
                <Input
                  size="large"
                  placeholder="Ҳисоб рақами" />
              </Form.Item>
                <span className="custom-input-label-1">Ҳисоб рақами</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              {
                docType ==="contract"
                ? null
                : <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerMfo"
              initialValue={mfo}>
                <Input
                  size="large"
                  placeholder="МФО" />
              </Form.Item>
                <span className="custom-input-label-1">МФО</span>
              </Form.Item>
              }
              
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            key="seler-account"
            name="sellerAddress"
            initialValue={address}>
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
              name="sellerDirector"
              initialValue={directorName}>
                <Input
                  size="large"
                  placeholder="Директор" />
              </Form.Item>
                <span className="custom-input-label-1">Директор</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              {
                docType ==="contract"
                ? null
                : <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerAccountant"
              initialValue={accountant}>
                <Input
                  size="large"
                  placeholder="Бош хисобчи" />
              </Form.Item>
                <span className="custom-input-label-1">Бош хисобчи</span>
              </Form.Item>
              }
            </Col>
          </Row>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps)(SellerForm);
