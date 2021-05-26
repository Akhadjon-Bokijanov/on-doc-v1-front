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
import {useHistory} from 'react-router-dom'
const { Option } = Select;

const FacturaCreateForm = ({ match, user, loadedKey, setTimer, setDraftFactura, drafts }) => {

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { facturaId, duplicateId } = match.params;
  const [newFacturaId, setNewFacturaId]=useState(facturaId);
  const [initialData, setInitialData] = useState({ facturaType: 0 })
  const [facturaType, setFacturaType] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [products, setProducts] = useState();
  const [gridInitialValue, setGridInitialValue] = useState();
  const history = useHistory();

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

  useEffect(()=>{
    const handleEsc=(e)=>{
      if (e.keyCode===27||e.keyCode===8){
        history.push('/cabinet/factura')
      }
    };
    window.addEventListener('keydown',handleEsc);
    return ()=>window.removeEventListener('keydown',handleEsc)
  },[])

  //#endregion

  // var draftComponents = [];
  // for (var i in drafts) {
  //   console.log("draft-"+i, drafts[i]);
  //   draftComponents.push(i)
  // }

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{fontWeight: 'bold'}}>{t("Dokument yaratish:")}{t("Faktura")}</h1>
      <Form
        requiredMark={false}
        //onValuesChange={(value, values)=>handleSaveDraft(values, products, newFacturaId)}
        initialValues={initialData}
        colon={false}
        labelCol={{span: 24}}
        form={form}
        name="factura"
        onFinish={handleSubmit}
        scrollToFirstError
        validateMessages={validateMessages}
      >

        <div className="factura-data-sheet-container">
          <Row justify="space-between" gutter={[32, 0]}>
            <Col md={12}>
              {/* <Form.Item> */}
                <Form.Item
                  key="dyna-form-facutura-no"
                  name="facturaType"
                  label={ t("Faktura turi") }
                >
                  <Select
                    onChange={setFacturaType}
                    // bordered={false}
                    size="large"
                    allowClear
                    placeholder="Faktura turi">
                    <Option value={FACTURA_TYPES["STANDARD"]}>{t("Standard")}</Option>
                    <Option value={FACTURA_TYPES["QOSHIMCHA"]}>{t("Qo'shimcha")}</Option>
                    <Option value={FACTURA_TYPES["HARAJATLARNI QOPLASH"]}>{t("Harajatni qoplash")}</Option>
                    <Option value={FACTURA_TYPES["TOLOVSIZ"]}>{t("To'lovsiz")}</Option>
                    <Option value={FACTURA_TYPES["TUZATUVCHI"]}>{t("Tuzatuvchi")}</Option>
                  </Select>
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 12 : 0}>
              {/* <Form.Item> */}
                <Form.Item
                  key="dyna-form-facutura-no-old"
                  label={t("Eski faktura ID")}
                  name="oldFacturaId">
                  <Input
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura ID" />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 12 : 0}>
              {/* <Form.Item> */}
                <Form.Item
                  key="dyna-form-facutura-no-old"
                  label={t("Eski faktura No")}
                  name="oldFacturaNo">
                  <Input
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura No" />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={facturaType === FACTURA_TYPES["QOSHIMCHA"] || facturaType === FACTURA_TYPES["TUZATUVCHI"] ? 12 : 0}>
              {/* <Form.Item> */}
                <Form.Item
                  key="dyna-form-facutura-no-old"
                label={t("Eski faktura Sanasi")}
                  name="oldFacturaDate">
                  <DatePicker
                    rules={[{ required: true }]}
                    size="large"
                    placeholder="Eski faktura Sanasi" />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
          </Row>
          <Row justify="space-between" gutter={[32, 0]}>
            <Col md={12}>
              {/* <Form.Item> */}
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-facutura-no"
                  label={t("Faktura raqami")}
                  name="facturaNo">
                  <Input
                    size="large"
                    placeholder={t("Faktura raqami")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
              {/* <Form.Item> */}
                <Form.Item
                  key="dyna-form-item-inn-date"
                  name="facturaDate"
                label={t("Faktura sanasi")}
                  rules={[{ required: true }]}>
                  <DatePicker
                    size="large"
                    placeholder={t("Faktura sanasi")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
              {/* <Form.Item> */}
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-n0"
                label={t("Shartnoma raqami")}
                  name="contractNo">
                  <Input
                    size="large"
                    placeholder={t("Shartnoma raqami")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
              {/* <Form.Item> */}
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-date"
                label={t("Shartnoma sanasi")}
                  name="contractDate">
                  <DatePicker
                    size="large"
                    placeholder={t("Shartnoma sanasi")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">

          <Row justify="space-between" gutter={[32, 0]}>
            <Col md={12}>
              <SellerForm form={form} />
            </Col>

            <Col md={12}>
              <BuyerForm form={form} docType="factura" />
            </Col>
          </Row>
        </div>
        <FacturaProductGrid initialValues={ gridInitialValue } getProducts={getProducts} form={form} />

        <div className="factura-data-sheet-container">
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 28}}>{t("Ishonchnoma")}</h2>
          </div>
          <Row justify="space-between" gutter={[24, 0]}>
            <Col md={6} >
              {/* <Form.Item> */}
                <Form.Item
                  key="empowerment-no"
                label={t("Ishonchnoma raqami")}
                  name="empowermentNo">
                  <Input
                    size="large"
                    placeholder={t("Ishonchnoma raqami")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={6}>
              {/* <Form.Item> */}
                <Form.Item
                  key="seler-account-empowerment-dateof-issue"
                label={t("Ishonchnoma sanasi")}
                  name="empowermentDateOfIssue">
                  <DatePicker
                    size="large"
                    placeholder={t("Ishonchnoma sanasi")} />
                </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
              <PersonFetch
                pName="agentFio"
                pTin="agentTin"
                nameLabel={t("Ma'sul shaxs FIO")}
                tinLabel={t("STIR")}
                tinCol={12}
                nameCol={12}
                form={form}
              />
            </Col>

          </Row>

        </div>
        {/* <div className="factura-data-sheet-container"> */}
        <div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div >
              <Button
                icon={<FontAwesomeIcon icon="ban" className="factura-action-btn-icons" />}
                danger
                style={{marginRight: 24}}
                className="custom-ant-primary-btn cancel-btn"
              >
                {t("Bekor qilish")}
              </Button>
              <Button
                loading={saveLoading}
                primary
                style={{ marginRight: 24 }}
                htmlType="submit"
                className="custom-ant-primary-btn save-btn"//"factra-action-btns save-btn"
                icon={<FontAwesomeIcon icon={["far", "check-circle"]} className="factura-action-btn-icons" />}>
                {t("Hujjatni korish")}
              </Button>
            </div>
            <div>

            <Button
              loading={saveLoading}
              primary
              style={{marginRight: 24}}
              htmlType="submit"
              className="custom-ant-primary-btn save-btn"//"factra-action-btns save-btn"
              icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons" />}>
              {t("Saqlash")}
            </Button>
              <Button
                loading={saveLoading}
                className="custom-ant-primary-btn sign-btn"
                onClick={handleSign}
                icon={<FontAwesomeIcon icon="signature" className="factura-action-btn-icons" />}>
                {t("Imzolash")}
              </Button>
            </div>
          </div>
        </div>
        {/* </div> */}
        

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