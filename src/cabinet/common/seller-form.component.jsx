import React, { Fragment } from 'react';
import { Input, Form, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import PersonFetch from './person-fetch/person-fetch.component';

const SellerForm = ({ user, docType, form }) => {

  const { tin, name, fullName, regCode, mfo, account, address, directorName, directorTin, accountant, phone } = user;

  return (
    <div>

      <h3>Сизнинг маълумотларингиз</h3>

      {
        docType=="contract" ?
        <PersonFetch
        form={form}
        nameCol={11}
        tinCol={11}
        tinLabel="Jis.Shaxs STIR"
        nameLabel="Jis.Shaxs FIO"
        pTin="sellerFizTin"
        pName="sellerFizFio"
      />
      : null
      }
      

      <Form.Item>
        <Form.Item
          key="dyna-form-item-inn-seller"
          name="sellerTin"
          rules={[{ required: true }]}
          initialValue={tin}>
          <Input
            disabled
            size="large"
            placeholder="Sotuvchi INN" />
        </Form.Item>
        <span className="custom-input-label-1">INN</span>
      </Form.Item>
      {
        docType !== "contract" ?
          <h3>Ташкилот</h3>
          : null
      }
      <Form.Item>
        <Form.Item
          key="seller-name-1-sellerName"
          rules={[{ required: true }]}
          name="sellerName"
          initialValue={name ?? fullName}>
          <Input

            size="large"
            placeholder="Сотувчи номи" />
        </Form.Item>
        <span className="custom-input-label-1">Сотувчи номи</span>
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
                  docType === "contract"
                    ? <Form.Item>
                      <Form.Item
                        key="seler-account"
                        name="sellerMobilePhone"
                        initialValue={phone}>
                        <Input
                          size="large"
                          placeholder="Mobile phone" />
                      </Form.Item>
                      <span className="custom-input-label-1">Mobile phone</span>
                    </Form.Item>
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
                  rules={[{ required: true }]}
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
                  docType === "contract"
                    ? 
                    <Form.Item>
                      <Form.Item
                        key="seler-account"
                        name="sellerDirectorTin"
                        initialValue={directorTin}>
                        <Input
                          size="large"
                          placeholder="Директор INN" />
                      </Form.Item>
                      <span className="custom-input-label-1">Директор INN</span>
                    </Form.Item>
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
          </Fragment>
          : null
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps)(SellerForm);
