import React, { Fragment } from 'react';
import { Input, Form, Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import PersonFetch from './person-fetch/person-fetch.component';
import {useTranslation} from "react-i18next";

const SellerForm = ({ user, docType, form }) => {

    const {t} = useTranslation();

  const { tin, name, fullName, regCode, mfo, account, address, directorName, directorTin, accountant, phone } = user;

  return (
    <div>

      <h3>{t("Sizning ma'lumotlaringiz")}</h3>

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
      

      <Form.Item>
        <Form.Item
          key="dyna-form-item-inn-seller"
          name="sellerTin"
          rules={[{ required: true }]}
          initialValue={tin}>
          <Input
            disabled
            size="large"
            placeholder={t("STIR")} />
        </Form.Item>
        <span className="custom-input-label-1">{t("STIR")}</span>
      </Form.Item>
      {
        docType !== "contract" ?
          <h3>{t("Tashkilot")}</h3>
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
            placeholder={t("Sotuvchi nomi")} />
        </Form.Item>
        <span className="custom-input-label-1">{t("Sotuvchi nomi")}</span>
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
                      placeholder={t("QQS tolovchi registratsiya raqami")} />
                  </Form.Item>
                  <span className="custom-input-label-1">{t("QQS tolovchi registratsiya raqami")}</span>
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
                      placeholder={t("Hisob raqami")} />
                  </Form.Item>
                  <span className="custom-input-label-1">{t("Hisob raqami")}</span>
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
                          placeholder={t("Telfon raqam")} />
                      </Form.Item>
                      <span className="custom-input-label-1">{t("Telfon raqam")}</span>
                    </Form.Item>
                    : <Form.Item>
                      <Form.Item
                        key="seler-account"
                        name="sellerMfo"
                        initialValue={mfo}>
                        <Input
                          size="large"
                          placeholder={t("MFO")} />
                      </Form.Item>
                      <span className="custom-input-label-1">{t("MFO")}</span>
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
                  placeholder={t("Manzil")} />
              </Form.Item>
              <span className="custom-input-label-1">{t("Manzil")}</span>
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
                      placeholder={t("Direktor")} />
                  </Form.Item>
                  <span className="custom-input-label-1">{t("Direktor")}</span>
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
                          placeholder={t("Direktor") + " " + t("STIR")} />
                      </Form.Item>
                      <span className="custom-input-label-1">{t("Direktor")+ " " +t("STIR")}</span>
                    </Form.Item>
                    : <Form.Item>
                      <Form.Item
                        key="seler-account"
                        name="sellerAccountant"
                        initialValue={accountant}>
                        <Input
                          size="large"
                          placeholder={t("Bosh hisobchi")} />
                      </Form.Item>
                      <span className="custom-input-label-1">{t("Bosh hisobchi")}</span>
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
