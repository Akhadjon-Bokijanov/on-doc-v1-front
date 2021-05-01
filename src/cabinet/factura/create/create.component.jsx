import React, { useState, useEffect } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import { Button, Input, Form, Row, Col, DatePicker, Select, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create.style.scss';
import axios from 'axios';
import BuyerForm from '../../common/buyer-form.component';
import SellerForm from '../../common/seller-form.component';
import { connect } from 'react-redux';
import { selectCurrentUser, selectLoadedKey, selectToken } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import PersonFetch from '../../common/person-fetch/person-fetch.component';
import { useTranslation } from "react-i18next";
import FacturaProductGrid from './product-grid.component';
import { ConvertGridToProduct, ConvertProductToGrid } from '../../models/FacturaProduct';
import { FacturaDataToForm, GetFacturaDataToSign } from '../../models/Factura';
import { EIMZOClient } from '../../../utils/e-imzo';
import { setLoadedKeyId } from '../../../redux/user/user.action';
import { saveFacturaDraft } from '../../../redux/factura-draft/factura-draft.action';
import { selectDrafts } from '../../../redux/factura-draft/factura-draft.selector';

const { Option } = Select;

const FacturaCreateForm = ({ match, user, loadedKey, setTimer, setDraftFactura, drafts }) => {

  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const { facturaId, duplicateId } = match.params;
  const [newFacturaId, setNewFacturaId]=useState(facturaId);
  const [initialData, setInitialData] = useState({ facturaType: 0 })
  const [facturaType, setFacturaType] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [products, setProducts] = useState();
  const [gridInitialValue, setGridInitialValue] = useState();

  const setNewDocId = ()=>{
    axios({
      url: "info/get-guid",
      method: "get"
    }).then(res => {
      if (res.data.success) {
        setNewFacturaId(res.data.data)
      }
    }).catch(ex => {
      console.log(ex)
    })
  }

  useEffect(() => {
    if (facturaId || duplicateId) {
      //fetch fatura data
      setNewFacturaId(facturaId)
      axios({
        url: `facturas/view?FacturaId=${facturaId??duplicateId}&tin=${user.tin??user.username}`,
        method: "GET",
      }).then(res => {
        let data = FacturaDataToForm(res.data.data[0]);
        console.log("data",(res.data.data[0]))
        data.contractDate = moment(data.contractDate);
        data.created_at = moment(data.created_at);
        data.facturaDate = moment(data.facturaDate);
        data.empowermentDateOfIssue = moment(data.empowermentDateOfIssue);
        data.oldFacturaDate = moment(data.oldFacturaDate);
        data.updated_at = moment(data.updated_at);
        console.log("dat",data);

        setInitialData(data);
        console.log(res.data.data[0]?.ProductList.Products);
        setProducts(res.data.data[0]?.ProductList)
        
        if(duplicateId){
          setNewDocId()
        }
        
        setGridInitialValue(ConvertProductToGrid(res.data.data[0]?.ProductList.Products))
        form.resetFields();
      }).catch(err => {
        console.log(err);
      })
      //end fetch factura data;
    }else{
      setNewDocId();
    }
    
  }, [])


  const validateMessages = {
    required: t('Bu maydon majburiy!'),
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },

  };

  const FACTURA_TYPES = {
    "STANDARD": 0,
    "QOSHIMCHA": 1,
    "HARAJATLARNI QOPLASH": 2,
    "TOLOVSIZ": 3,
    "TUZATUVCHI": 4
  }





  //#region data-sheet methods

  const getProducts = data=>{

    setProducts(ConvertGridToProduct(data, user.tin ?? user.username, newFacturaId))
    //setGridInitialValue(data)
    let formValues = form.getFieldsValue();
    console.log("trigger set draft");
    // setDraftFactura(
    //   GetFacturaDataToSign((
    //     formValues, 
    //     ConvertGridToProduct(data, user.tin ?? user.username, newFacturaId), 
    //     newFacturaId)), 
    // newFacturaId)
    
  }
  //#endregion

  //#region form methods

  const handleSign = ()=>{
    setSaveLoading(true)
    let values = form.getFieldsValue()
    //console.log(JSON.stringify(GetFacturaDataToSign(values, products, newFacturaId)));
    EIMZOClient.createPkcs7(
      loadedKey.id, 
      JSON.stringify(GetFacturaDataToSign(values, products, newFacturaId)),
      null,
      pkcs7=>{
        console.log(JSON.stringify(GetFacturaDataToSign(values, products, newFacturaId)))
        console.log(pkcs7)
        axios({
          url: `facturas/send?tin=${user.tin??user.username}`,
          method: 'post',
          data: {
            Sign: pkcs7
          }
        })
        .then(res=>{

          if(res.data.success){
            message.success(t("Faktura muaffaqiyatli imzolandi!"))
            setTimer({ id: loadedKey.id, time: Date.now() })
            if(!facturaId){
              handleSubmit(values)
            }
          }
          else{
            message.error(t("Faktura imzolashda xatolik!"))
          }

          setSaveLoading(false)
        })
        .catch(ex=>{
          console.log(ex)
          message.error(t("Faktura imzolashda xatolik!"))
          setSaveLoading(false)
        })
      },
      (e,r)=>{
        console.log("e", e, "r", r)
        setSaveLoading(false)
      }
      )
      
    
  }

  const handleSubmit = (values) => {
    setSaveLoading(true);

    if (facturaId) {
      //console.log(JSON.stringify(GetFacturaDataToSign(values, products, facturaId)))
      axios({
        url: `facturas/update?id=${facturaId}&tin=${user.tin??user.username}`,
        method: 'post',
        data: GetFacturaDataToSign(values, products, facturaId)
      }).then(res => {
        if (res.data.success) {
          message.success(t("Faktura o'zgartirildi!"))
        } else {
          message.error(t("Faktura o'zgartirishda xatolik!"));
        }
        console.log(res)
        setSaveLoading(false);
      }).catch(err => {
        message.error(t("Faktura o'zgartirishda xatolik!"));
        console.log(err)
        setSaveLoading(false);
      })
    } else {
      console.log("fact",JSON.stringify(GetFacturaDataToSign(values, products, newFacturaId)))
      axios({
        url: 'facturas/create',
        method: 'post',
        data: GetFacturaDataToSign(values, products, newFacturaId)
      }).then(res => {
        if (res.data.success) {
          message.success(t("Faktura yaratili!"))
        }
        else {
          message.error(t("Faktura yaratishda xatolik!"));
        }
        console.log(res)
        setSaveLoading(false);
      }).catch(err => {
        console.log(err)
        message.error(t("Faktura yaratishda xatolik!"));
        setSaveLoading(false);
      })
    }


  }

  const handleSaveDraft = (formValues, products)=>{
    //setDraftFactura(GetFacturaDataToSign((formValues, products, newFacturaId)), newFacturaId)
  }

  //#endregion

  // var draftComponents = [];
  // for (var i in drafts) {
  //   console.log("draft-"+i, drafts[i]);
  //   draftComponents.push(i)
  // }

  return (
    <div style={{ padding: 15 }}>
      
      <Form
        onValuesChange={(value, values)=>handleSaveDraft(values, products, newFacturaId)}
        initialValues={initialData}
        form={form}
        name="factura"
        onFinish={handleSubmit}
        scrollToFirstError
        validateMessages={validateMessages}
      >

        <div className="factura-data-sheet-container">
          <h3>{t("Hujjat turi")}</h3>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-facutura-no"
                  name="facturaType"
                >
                  <Select
                    onChange={setFacturaType}
                    bordered={false}
                    size="large"
                    placeholder="Faktura turi">
                    <Option value={FACTURA_TYPES["STANDARD"]}>{t("Standard")}</Option>
                    <Option value={FACTURA_TYPES["QOSHIMCHA"]}>{t("Qo'shimcha")}</Option>
                    <Option value={FACTURA_TYPES["HARAJATLARNI QOPLASH"]}>{t("Harajatni qoplash")}</Option>
                    <Option value={FACTURA_TYPES["TOLOVSIZ"]}>{t("To'lovsiz")}</Option>
                    <Option value={FACTURA_TYPES["TUZATUVCHI"]}>{t("Tuzatuvchi")}</Option>
                  </Select>
                </Form.Item>
                <span className="custom-input-label-1">{t("Faktura turi")}</span>
              </Form.Item>
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 11 : 0}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-facutura-no-old"
                  name="oldFacturaId">
                  <Input
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura ID" />
                </Form.Item>
                <span className="custom-input-label-1">{t("Eski faktura ID")}</span>
              </Form.Item>
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 11 : 0}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-facutura-no-old"
                  name="oldFacturaNo">
                  <Input
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura No" />
                </Form.Item>
                <span className="custom-input-label-1">{t("Eski faktura No")}</span>
              </Form.Item>
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 11 : 0}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-facutura-no-old"
                  name="oldFacturaDate">
                  <DatePicker
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura Sanasi" />
                </Form.Item>
                <span className="custom-input-label-1">{t("Eski faktura Sanasi")}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-facutura-no"
                  name="facturaNo">
                  <Input
                    size="large"
                    placeholder={t("Faktura raqami")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Faktura raqami")}</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-item-inn-date"
                  name="facturaDate"
                  rules={[{ required: true }]}>
                  <DatePicker
                    size="large"
                    placeholder={t("Faktura sanasi")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Faktura sanasi")}</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-n0"
                  name="contractNo">
                  <Input
                    size="large"
                    placeholder={t("Shartnoma raqami")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Shartnoma raqami")}</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-date"
                  name="contractDate">
                  <DatePicker
                    size="large"
                    placeholder={t("Shartnoma sanasi")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Shartnoma sanasi")}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">

          <Row justify="space-between">
            <Col md={11}>
              <SellerForm form={form} />
            </Col>

            <Col md={11}>
              <BuyerForm form={form} docType="factura" />
            </Col>
          </Row>
        </div>
        <FacturaProductGrid initialValues={ gridInitialValue } getProducts={getProducts} form={form} />

        <div className="factura-data-sheet-container">

          <Row justify="space-between">
            <Col md={5} >
              <Form.Item>
                <Form.Item
                  key="empowerment-no"
                  name="empowermentNo">
                  <Input
                    size="large"
                    placeholder={t("Ishonchnoma raqami")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Ishonchnoma raqami")}</span>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item>
                <Form.Item
                  key="seler-account-empowerment-dateof-issue"
                  name="empowermentDateOfIssue">
                  <DatePicker
                    size="large"
                    placeholder={t("Ishonchnoma sanasi")} />
                </Form.Item>
                <span className="custom-input-label-1">{t("Ishonchnoma sanasi")}</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <PersonFetch
                pName="agentFio"
                pTin="agentTin"
                nameLabel={t("Ma'sul shaxs FIO")}
                tinLabel={t("STIR")}
                tinCol={11}
                nameCol={11}
                form={form}
              />
            </Col>

          </Row>

        </div>
        <div className="factura-data-sheet-container">
          <Row justify="space-around">
            <Col >
              <Button
                loading={saveLoading}
                primary
                htmlType="submit"
                className="factra-action-btns save-btn"
                size="large"
                icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons" />}>
                {t("Saqlash")}
              </Button>
            </Col>
            <Col>
              <Button
                loading={saveLoading}
                className="factra-action-btns sing-btn"
                size="large"
                onClick={handleSign}
                icon={<FontAwesomeIcon icon="signature" className="factura-action-btn-icons" />}>
                {t("Imzolash")}
              </Button>
            </Col>
            <Col>
              <Button
                icon={<FontAwesomeIcon icon="ban" className="factura-action-btn-icons" />}
                danger
                className="factra-action-btns"
                size="large">
                {t("Bekor qilish")}
              </Button>
            </Col>
          </Row>
        </div>
        

      </Form>
    </div>
  );
}


const mapDispatchToProps = dispatch=>({
  setTimer: data=>dispatch(setLoadedKeyId(data)),
  setDraftFactura: (values, id) => dispatch(saveFacturaDraft(values, id))
})

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser,
  loadedKey: selectLoadedKey,
  drafts: selectDrafts
})

export default connect(mapStateToProps, mapDispatchToProps)(FacturaCreateForm);