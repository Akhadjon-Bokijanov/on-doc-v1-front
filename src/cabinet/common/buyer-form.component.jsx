import React, { Fragment } from 'react';
import { Input, Form, Row, Col, message, Switch, Select, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import PersonFetch from './person-fetch/person-fetch.component';
import { setActClient } from '../act/create/create.component';
import {useTranslation} from "react-i18next";

const { Option } = Select;

const BuyerForm = ({ form, docType, remove, fieldList }) => {

  const {t} = useTranslation();
  const [isFacturaSingleSided, setIsFacturaSingleSided] = useState(false);
  const [buyerBranches, setBuyerBranches] = useState([]);

  const handleSingleSided = (value) => {
    setIsFacturaSingleSided(value)
  }

  const handleFetchBuyer = e => {
    console.log(e.target.value)
    if (!isNaN(e.target.value)) {
      if (e.target.value > 100000000 && e.target.value <= 999999999) {
        axios({
          url: 
          `info/contragent-by-tin?tin=${e.target.value}`,
          method: "GET",
         
        }).then(res => {
          const { 
            tin, 
            accountant, 
            account, 
            address, 
            phone, 
            name, 
            fullName, 
            mfo, 
            director,
            directorTin, 
            regCode } = res.data;

          let data = {
            buyerTin: tin,
            buyerAccountant: accountant,
            buyerAccount: account,
            buyerAddress: address,
            buyerMobilePhone: phone,
            buyerName: name ?? fullName,
            buyerMfo: mfo,
            buyerDirector: director,
            buyerDirectorTin: directorTin,
            buyerVatRegCode: regCode
          }

          if(docType==="act"){
            form.setFieldsValue({
              actText: setActClient(form.getFieldValue("SellerName"), name ?? fullName)
            })
          }


          if(fieldList){
            let fetcherData = form.getFieldValue("contract_partners");
            
            fetcherData[fieldList.name] = {...fetcherData[fieldList.name], ...data}

            setBuyerBranches(res.data.branches ?? []);

            form.setFieldsValue({contract_partners: [...fetcherData]})
          }else{
            
            form.setFieldsValue(data)
          }
         
        }).catch(err => {
          console.log(err)
        })
      } else {
        form.setFieldsValue({
          buyerAccountant: null,
          buyerAccount: null,
          buyerAddress: null,
          buyerMobilePhone: null,
          buyerName: null,
          buyerMfo: null,
          buyerDirector: null,
          buyerVatRegCode: null
        })
      }
    } else {
      message.warning(t("STIR notog'ri kiritildi!"))
    }

  }

  return (
    <div>
      
      <h3 style={{fontSize: 22, fontWeight: 700}}>{t("Kontragent ma'lumotlari")}</h3>
      {
        docType ==="contract"
        ? <PersonFetch 
          form={form} 
          pTin={fieldList ? [fieldList.name,"buyerPhysicalTin"] : "buyerPhysicalTin"} 
          pName={fieldList ? [fieldList.name, "buyerPhysicalFio"] : "buyerPhysicalFio"} 
          tinLabel={t("Jis. Shaxs STIR")} nameLabel={t("Jis. Shaxs FIO")} tinCol={11} nameCol={11} />
        : null
      }
      
      <Row justify="space-between">
        <Col md={docType !== "factura" ? 24 : 11}>
          {/* <Form.Item> */}
            <Form.Item
            label={t("STIR")}
              key={fieldList ? `dyna-form-item-inn-Buyer-${fieldList.key}` : "dyna-form-item-inn-Buyer"}
              name={fieldList ? [fieldList.name,"buyerTin"] : "buyerTin"}
              
            >
              <Input
                onChange={handleFetchBuyer}
                size="large"
                placeholder={t("STIR")} />
            </Form.Item>
            {/* <span className="custom-input-label-1"></span> */}
          {/* </Form.Item> */}
        </Col>
        <Col md={docType !== "factura" ? 0 : 11}>
          <h4>{t("Bir tomonlama fakturami?")}</h4>
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
            <h3>{t("Turi")}</h3>
            {/* <Form.Item
              key="sigle-sided-factura-type-1"
              
              > */}
              <Form.Item
                name={fieldList ? [fieldList.name, "singleSidedType"] : "singleSidedType"}
                label={t("Kontragent turi")}
              >
                <Select bordered={false} size="large">
                  <Option value={1}>На физ. лицо</Option>
                  <Option value={2}>На экспорт</Option>
                  <Option value={3}>На импорт</Option>
                  <Option value={4}>Реализация, связанная с гос. секретом</Option>
                  <Option value={5}>Финансовые услуги</Option>
                </Select>

              </Form.Item>
              {/* <span className="custom-input-label-1"></span> */}
            {/* </Form.Item> */}
          </div>
          : null
      }

      {
        !isFacturaSingleSided ?
          <div>
            {/* <Form.Item> */}
              <Form.Item
                rules={[{ required: true }]}
                key="buyer-name-1-BuyerName"
                name={fieldList ? [fieldList.name,"buyerName"] : "buyerName"}
              label={t("Hamkor korxonasi")}
              >
                <Input
                  onChange={val=>{
                    form.setFieldsValue({
                      actText: setActClient(form.getFieldValue("SellerName"), val.target.value)})
                    }
                  }
                  size="large"
                  placeholder={t("Nomi")} />
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
                        label={t("QQS tolovchi registratsiya raqami")}
                          key="seler-account-vatreg"
                          name={fieldList ? [fieldList.name, "buyerVatRegCode"] : "buyerVatRegCode"}
                        >
                          <Input
                            size="large"
                            placeholder={t("QQS tolovchi registratsiya raqami")}
                          />
                        </Form.Item>
                        // <span className="custom-input-label-1"></span>
                      // </Form.Item>
                  }

                  <Row justify="space-between">
                    <Col md={11} >
                      {/* <Form.Item> */}
                        <Form.Item
                          key="seler-account"
                        label={t("Hisob raqami")}
                          name={fieldList ? [fieldList.name,"buyerAccount"] : "buyerAccount"}
                          >
                          <Input
                            size="large"
                            placeholder={t("Hisob raqami")} />
                        </Form.Item>
                        {/* <span className="custom-input-label-1"></span> */}
                      {/* </Form.Item> */}
                    </Col>

                    <Col md={11}>
                      {
                        docType === "contract"?
                          // ? <Form.Item>
                          <Form.Item
                            key="seler-account"
                            label={t("Telfon raqam")}
                            name={fieldList ? [fieldList.name,"buyerMobilePhone"] : "buyerMobilePhone"}
                          >
                            <Input
                              size="large"
                              placeholder={t("Telfon raqam")}
                            />
                          </Form.Item>
                          
                        // </Form.Item>
                          // : <Form.Item>
                          :
                            <Form.Item
                              key="seler-account"
                              label={t("MFO")}
                              name={fieldList ? [fieldList.name,"buyerMfo"] : "buyerMfo"}
                            >
                              <Input
                                size="large"
                                placeholder={t("MFO")}
                              />
                            </Form.Item>
                          // </Form.Item>
                      }
                    </Col>
                  </Row>

                  {/* <Form.Item> */}
                    <Form.Item
                      rules={[{ required: true }]}
                      key="seler-account"
                      label={t("Manzil")}
                      name={fieldList ? [fieldList.name,"buyerAddress"] : "buyerAddress"}
                    >
                      <Input
                        size="large"
                        placeholder={t("Manzil")} />
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                    
                  {
                      docType==="contract"?
                      <Col md={24} >
                      {/* <Form.Item> */}
                        <Form.Item
                          key="seler-account"
                          name={fieldList ? [fieldList.name,"buyerBranch"] : "buyerBranch"}
                        >
                          <Select
                            bordered={false}
                            size="large"
                            defaultActiveFirstOption
                            placeholder="">
                              {buyerBranches.map(item=><Option value={item.tin}>{ item.tin } - {item.name}</Option>)}
                          </Select>
                        </Form.Item>
                        <span className="custom-input-label-1">{t("Filiali")}</span>
                      {/* </Form.Item> */}
                    </Col>
                    :null
                    }

                  <Row justify="space-between" align="stretch">
                    <Col md={11} >
                      {/* <Form.Item> */}
                        <Form.Item
                          key="seler-account"
                          name={fieldList ? [fieldList.name,"buyerDirector"] : "buyerDirector"}
                        label={t("Direktor")}
                        >
                          <Input
                            size="large"
                            placeholder={t("Direktor")}  />
                        </Form.Item>
                        {/* <span className="custom-input-label-1"></span> */}
                      {/* </Form.Item> */}
                    </Col>
                    <Col md={11} >
                      {
                        docType === "contract"
                          ? (remove && fieldList ? <Button 
                              className="factra-action-btns" 
                              style={{width: '100%'}} 
                              danger 
                              size="large" 
                              onClick={()=>remove(fieldList.name)} >
                                Olib tashlash
                                </Button> 
                                : null ) 
                          // : <Form.Item>
                            :<Form.Item
                              key="seler-account"
                              label={t("Bosh hisobchi")}
                              name={fieldList ? [fieldList.name,"buyerAccountant"] : "buyerAccountant"}
                            >
                              <Input
                                size="large"
                                placeholder={t("Bosh hisobchi")} />
                            </Form.Item>
                            // <span className="custom-input-label-1"></span>
                          // </Form.Item>
                      }

                    </Col>
                    {
                    docType==="contract" ?
                    <Col md={11}>
                      <Form.Item
                        key="seler-account-Buyer-dir-tin"
                        name={ fieldList ? [fieldList.name, "buyerDirectorTin"] :"buyerDirectorTin"}
                        >
                        <Input
                          type="hidden"
                          size="large"
                          placeholder={t("Direktor") + " " + t("STIR")} />
                      </Form.Item>
                      
                      </Col>
                    : null
                  }
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