import React, { Fragment } from 'react';
import { Input, Form, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import PersonFetch from './person-fetch/person-fetch.component';
import {useTranslation} from "react-i18next";

const SellerForm = ({ user, docType, form }) => {

    const {t} = useTranslation();

  const { tin, name, fullName, regCode, mfo, bank_account, address, director_fio, director_tin, accountant, phone } = user;

  return (
    <div>

      <h3 style={{ fontSize: 22, fontWeight: 700 }}>{t("Sizning ma'lumotlaringiz")}</h3>

      {
        docType=="contract" ?
        <PersonFetch
        form={form}
        nameCol={11}
        tinCol={11}
        tinLabel={t("Jis.Shaxs STIR")}
        nameLabel={t("Jis.Shaxs FIO")}
        pTin="sellerFizTin"
        pName="sellerFizFio"
      />
      : null
      }
      

      {/* <Form.Item> */}
        <Form.Item
          key="dyna-form-item-inn-seller"
          name="sellerTin"
          label={t("STIR")}
          rules={[{ required: true }]}
          initialValue={tin}>
          <Input
            disabled
            size="large"
            placeholder={t("STIR")} />
        </Form.Item>
        {/* <span className="custom-input-label-1"></span> */}
      {/* </Form.Item> */}
     
      {/* <Form.Item> */}
        <Form.Item
          key="seller-name-1-sellerName"
          rules={[{ required: true }]}
          name="sellerName"
        label={t("Sotuvchi nomi")}
          initialValue={name ?? fullName}>
          <Input

            size="large"
            placeholder={t("Sotuvchi nomi")} />
        </Form.Item>
        {/* <span className="custom-input-label-1"></span> */}
      {/* </Form.Item> */}
      {
        docType !== "act" ?
          <Fragment>
            {
              docType === "contract" || docType === "empowerment"
                ? null
                // : <Form.Item>
                  :<Form.Item
                    key="seler-account-vatreg"
                    name="sellerVatRegCode"
                    label={t("QQS tolovchi registratsiya raqami")}
                    initialValue={regCode}>
                    <Input
                      size="large"
                      placeholder={t("QQS tolovchi registratsiya raqami")} />
                  </Form.Item>
                  // <span className="custom-input-label-1"></span>
                // </Form.Item>
            }

            <Row justify="space-between">
              <Col md={11} >
                {/* <Form.Item> */}
                  <Form.Item
                    key="seler-account"
                    name="sellerAccount"
                  label={t("Hisob raqami")}
                    initialValue={bank_account}>
                    <Input
                      size="large"
                      placeholder={t("Hisob raqami")} />
                  </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
                {/* </Form.Item> */}
              </Col>
              <Col md={11}>
                {
                  docType === "contract"
                    // ? <Form.Item>
                      ?<Form.Item
                        key="seler-account"
                        label={t("Telfon raqam")}
                        name="sellerMobilePhone"
                        initialValue={phone}>
                        <Input
                          size="large"
                          placeholder={t("Telfon raqam")} />
                      </Form.Item>
                      // <span className="custom-input-label-1"></span>
                    // </Form.Item>
                    // : <Form.Item>
                      :<Form.Item
                        key="seler-account"
                        name="sellerMfo"
                        label={t("MFO")}
                        initialValue={mfo}>
                        <Input
                          size="large"
                          placeholder={t("MFO")} />
                      </Form.Item>
                      // <span className="custom-input-label-1"></span>
                    // </Form.Item>
                }

              </Col>
            </Row>
            {/* <Form.Item> */}
              <Form.Item
                key="seler-account"
                name="sellerAddress"
              label={t("Manzil")}
                initialValue={address}>
                <Input
                  rules={[{ required: true }]}
                  size="large"
                  placeholder={t("Manzil")} />
              </Form.Item>
              <span className="custom-input-label-1"></span>
            {/* </Form.Item> */}
            <Row justify="space-between">
              <Col md={11} >
                {/* <Form.Item> */}
                  <Form.Item
                    key="seler-account"
                    name="sellerDirector"
                  label={t("Direktor")}
                    initialValue={director_fio}>
                    <Input
                      size="large"
                      placeholder={t("Direktor")} />
                  </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
                {/* </Form.Item> */}
              </Col>
              <Col md={11}>
                {
                  docType === "contract"
                    ? 
                    // <Form.Item>
                      <Form.Item
                        label={t("Direktor")+ " " +t("STIR")}
                        key="seler-account"
                        name="sellerDirectorTin"
                        initialValue={director_tin}>
                        <Input
                          size="large"
                          placeholder={t("Direktor") + " " + t("STIR")} />
                      </Form.Item>
                      // <span className="custom-input-label-1"></span>
                    // </Form.Item>
                    // : <Form.Item>
                      :<Form.Item
                        key="seler-account"
                        name="sellerAccountant"
                        label={t("Bosh hisobchi")}
                        initialValue={accountant}>
                        <Input
                          size="large"
                          placeholder={t("Bosh hisobchi")} />
                      </Form.Item>
                      // <span className="custom-input-label-1"></span>
                    // </Form.Item>
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
