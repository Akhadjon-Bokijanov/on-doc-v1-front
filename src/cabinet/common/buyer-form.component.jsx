import React, { Fragment } from 'react';
import { Input, Form, Row, Col, message, Switch, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const BuyerForm = ({ form, docType }) => {

  const [isFacturaSingleSided, setIsFacturaSingleSided] = useState(false);

  const handleSingleSided = (value) => {
    setIsFacturaSingleSided(value)
  }

  const handleFetchBuyer = e => {
    console.log(e.target.value)
    if (!isNaN(e.target.value)) {
      if (e.target.value > 100000000 && e.target.value <= 999999999) {
        axios({
          url: `/api/v1/companies/tin/${e.target.value}`,
          method: "GET",
        }).then(res => {
          //setBuyerData(res.data)
          const { tin, accountant, account, address, phone, name, fullName, mfo, directorName, regCode } = res.data;
          let data = {
            buyerAccountant: accountant,
            buyerAccount: account,
            buyerAddress: address,
            buyerPhone: phone,
            buyerName: name ?? fullName,
            buyerMfo: mfo,
            buyerDirector: directorName,
            buyerVatRegCode: regCode
          }
          form.setFieldsValue(data)
        }).catch(err => {
          console.log(err)
        })
      } else {
        form.setFieldsValue({
          buyerAccountant: null,
          buyerAccount: null,
          buyerAddress: null,
          buyerPhone: null,
          buyerName: null,
          buyerMfo: null,
          buyerDirector: null,
          buyerVatRegCode: null
        })
      }
    } else {
      message.warning("STIR notog'ri kiritildi!")
    }

  }

  return (
    <div>
      <h3>Контрагент маълумотлари</h3>
      <Row justify="space-between">
        <Col md={docType !== "factura" ? 24 : 11}>
          <Form.Item>
            <Form.Item
              key="dyna-form-item-inn-buyer"
              name="buyerTin"
              rules={[{ required: true }]}
            >
              <Input
                onChange={handleFetchBuyer}
                size="large"
                placeholder="Oluvchi INN" />
            </Form.Item>
            <span className="custom-input-label-1">INN</span>
          </Form.Item>
        </Col>
        <Col md={docType !== "factura" ? 0 : 11}>
          <h4>Bir tomolaman fakturami?</h4>
          <Switch
            onChange={handleSingleSided}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Col>
      </Row>

      {
        isFacturaSingleSided ?
          <div>
            <h3>Turi</h3>
            <Form.Item
              key="sigle-sided-factura-type-1"
              name="singleSidedType">
              <Form.Item>
                <Select bordered={false} size="large">
                  <Option value={1}>На физ. лицо</Option>
                  <Option value={2}> На экспорт</Option>
                  <Option value={3}>На импорт</Option>
                  <Option value={4}>Реализация, связанная с гос. секретом</Option>
                  <Option value={5}>Финансовые услуги</Option>
                </Select>

              </Form.Item>
              <span className="custom-input-label-1">Kontragent turi</span>
            </Form.Item>
          </div>
          : null
      }

      {
        !isFacturaSingleSided ?
          <div>
            <h3>Ҳамкорингизнинг Корхонаси</h3>
            <Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                key="buyer-name-1-buyerName"
                name="buyerName"
              >
                <Input
                  size="large"
                  placeholder="Hоми" />
              </Form.Item>
              <span className="custom-input-label-1">Hоми</span>
            </Form.Item>
            {
              docType !== "act" ?
                <Fragment>
                  {
                    docType === "contract" || docType === "empowerment"
                      ? null
                      : <Form.Item>
                        <Form.Item
                          key="seler-account-vatreg"
                          name="buyerVatRegCode"
                        >
                          <Input
                            size="large"
                            placeholder="ҚҚС тўловчисининг регистрация рақами"
                          />
                        </Form.Item>
                        <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
                      </Form.Item>
                  }

                  <Row justify="space-between">
                    <Col md={11} >
                      <Form.Item>
                        <Form.Item
                          key="seler-account"

                          name="buyerAccount">
                          <Input
                            size="large"
                            placeholder="Ҳисоб рақами" />
                        </Form.Item>
                        <span className="custom-input-label-1">Ҳисоб рақами</span>
                      </Form.Item>
                    </Col>
                    <Col md={11}>
                      {
                        docType === "contract"
                          ? null
                          : <Form.Item>
                            <Form.Item
                              key="seler-account"
                              name="buyerMfo"
                            >
                              <Input
                                size="large"
                                placeholder="МФО"
                              />
                            </Form.Item>
                            <span className="custom-input-label-1">МФО</span>
                          </Form.Item>
                      }
                    </Col>
                  </Row>
                  <Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      key="seler-account"
                      name="buyerAddress"
                    >
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
                        >
                          <Input
                            size="large"
                            placeholder="Директор" />
                        </Form.Item>
                        <span className="custom-input-label-1">Директор</span>
                      </Form.Item>
                    </Col>
                    <Col md={11}>
                      {
                        docType === "contract"
                          ? null
                          : <Form.Item>
                            <Form.Item
                              key="seler-account"
                              name="buyerAccountant"
                            >
                              <Input
                                size="large"
                                placeholder="Бош хисобчи" />
                            </Form.Item>
                            <span className="custom-input-label-1">Бош хисобчи</span>
                          </Form.Item>
                      }

                    </Col>
                  </Row>
                </Fragment>
                : null
            }
          </div>
          : null
      }

    </div>
  )
}

export default BuyerForm;