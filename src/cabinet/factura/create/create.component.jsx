import React, { useState, useEffect } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Datasheet from 'react-datasheet';
import SelectEditor from '../../../components/data-sheet-custom-selector/custom-selector.component';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import { Button, Input, Form, Row, Col, DatePicker, Select, Upload, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create.style.scss';
import axios from 'axios';
import BuyerForm from '../../common/buyer-form.component';
import SellerForm from '../../common/seller-form.component';
import { connect } from 'react-redux';
import { selectToken } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  } from '@ant-design/icons';
import { convertProductsToGrid } from '../../../utils/main';
import PersonFetch from '../../common/person-fetch/person-fetch.component';
import {useTranslation} from "react-i18next";

const { Option } = Select;

const FacturaCreateForm = ({ token, match })=> {

    const {t, i18n} = useTranslation();
  const [form] = Form.useForm();
  const { facturaId } = match.params;
  const [initialData, setInitialData] = useState({facturaType: 0})
  const [facturaType, setFacturaType] = useState();
  const [saveLoading, setSaveLoading] = useState(false);


  useEffect(()=>{
    if(facturaId){

      //fetch fatura data
      axios({
        url: `/api/v1/facturas/${facturaId}`,
        method: "GET",
      }).then(res=>{
        let data = res.data;
        data.contractDate=moment(data.contractDate);
        data.created_at=moment(data.created_at);
        data.facturaDate=moment(data.facturaDate);
        data.empowermentDateOfIssue=moment(data.empowermentDateOfIssue);
        data.oldFacturaDate=moment(data.oldFacturaDate);
        data.updated_at=moment(data.updated_at);
        console.log(data);
  
        setInitialData(res.data);
        setGrid(convertProductsToGrid(res.data.factura_products));
        form.resetFields();
      }).catch(err=>{
        console.log(err);
      })
      //end fetch factura data;
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

  const [fullView, toglleFullView] = useState(false)

  const [grid, setGrid] = useState([
      [
          { readOnly: true, value: '', width: 50 },
          { value: t('Tovar/xizmat nomi'), readOnly: true, width: 200 },
          { value: t('Tovar/xizmatlar yagona elektron milliy katalog identifikatsiya kodi'), readOnly: true, width: 150 },
          { value: t('Tovar/xizmat shtrix kodi'), readOnly: true, width: 100 },
          { value: t("O'lchov birligi"), readOnly: true, width: 100 },
          { value: t("Miqdori"), readOnly: true, width: 100 },
          { value: t("Narxi"), readOnly: true, width: 100 },
          { value: t("Aksiz soliq (%)"), readOnly: true, width: 100 },
          { value: t("Aksiz soliq, miqdori"), readOnly: true, width: 100 },
          { value: t("Yetkazib berish narxi"), readOnly: true, width: 100 },
          { value: t("QQS (%)"), readOnly: true, width: 100 },
          { value: t("QQS, miqdori"), readOnly: true, width: 100 },
          { value: t("Umumiy summa"), readOnly: true, width: 150 },
      ],
    [
      { readOnly: true, value: 1 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor:  SelectEditor},                //2 catalogCode
      { value: "" },                                          //3 shrix code
      { value: "", dataEditor:  SelectMeasureEditor },        //4 measure
      { value: '' },                                          //5 amount
      { value: "", },                                         //6 price
      { value: '' },                                          //7 aksiz rate
      { value: '', readOnly: true },                          //8 aksiz amount
      { value: '' },                                          //9 delivery cost
      { value: "" },                                          //10 VAT rate
      { value: '', readOnly: true },                          //11 VAT amount
      { value: '', readOnly: true,},                          //12 total
    ], 
    [
      { readOnly: true, value: 2 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor:  SelectEditor},                //2 catalogCode
      { value: "" },                                          //3 shrix code
      { value: "", dataEditor:  SelectMeasureEditor },        //4 measure
      { value: '' },                                          //5 amount
      { value: "", },                                         //6 price
      { value: '' },                                          //7 aksiz rate
      { value: '', readOnly: true },                          //8 aksiz amount
      { value: '' },                                          //9 delivery cost
      { value: "" },                                          //10 VAT rate
      { value: '', readOnly: true },                          //11 VAT amount
      { value: '', readOnly: true,},                          //12 total
    ], 
    [
      { readOnly: true, value: 3 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor:  SelectEditor},                //2 catalogCode
      { value: "" },                                          //3 shrix code
      { value: "", dataEditor:  SelectMeasureEditor },        //4 measure
      { value: '' },                                          //5 amount
      { value: "", },                                         //6 price
      { value: '' },                                          //7 aksiz rate
      { value: '', readOnly: true },                          //8 aksiz amount
      { value: '' },                                          //9 delivery cost
      { value: "" },                                          //10 VAT rate
      { value: '', readOnly: true },                          //11 VAT amount
      { value: '', readOnly: true,},                          //12 total
    ], 
    [
      { readOnly: true, value: 4 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor:  SelectEditor},                //2 catalogCode
      { value: "" },                                          //3 shrix code
      { value: "", dataEditor:  SelectMeasureEditor },        //4 measure
      { value: '' },                                          //5 amount
      { value: "", },                                         //6 price
      { value: '' },                                          //7 aksiz rate
      { value: '', readOnly: true },                          //8 aksiz amount
      { value: '' },                                          //9 delivery cost
      { value: "" },                                          //10 VAT rate
      { value: '', readOnly: true },                          //11 VAT amount
      { value: '', readOnly: true,},                          //12 total
    ], 
  ])

  //#region data-sheet methods
  const handleRemoveRow = (rowId)=>{
    console.log(rowId)

    grid.splice(rowId, 1)
    setGrid([...grid])
  }

  const valueRenderer = cell => cell.value;
  const onCellsChanged = changes => {
    changes.forEach(({ cell, row, col, value }, index) => {
        //this sets changed values
        grid[row][col] = { ...grid[row][col], value };
        

        //Lets calculate
        let priceamount = parseFloat(grid[row][5].value) * parseFloat(grid[row][6].value);
        let aksizamount = parseFloat(priceamount * grid[row][7].value / 100);
        
        grid[row][8]={ value: parseFloat(aksizamount), readOnly: true };
        
        let vatamout = parseFloat(priceamount * parseFloat(grid[row][10].value) / 100);
        
        grid[row][11] = { value: vatamout, readOnly: true }

        grid[row][12] = { value: priceamount ? parseFloat(priceamount + aksizamount + vatamout + parseFloat(grid[row][9].value, 2), 2) : 0, readOnly: true}
       
     
    });
     setGrid([...grid]);
  };

  const handleAddRow = ()=>{
    
    const sampleRow = [
      { readOnly: true, value:    grid.length }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor:  SelectEditor}, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor:  SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 aksiz rate
      { value: '', readOnly: true }, //8 aksiz amount
      { value: '' }, //9 delivery cost
      { value: "" }, //10 VAT rate
      { value: '', readOnly: true }, //11 VAT amount
      { value: '', readOnly: true }, //12 total
    ]

    let newgrid = [...grid, sampleRow];

     setGrid(newgrid)
  }

  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;
//#endregion
  
  //#region form methods

  const handleSubmit = (values)=>{
    setSaveLoading(true);
    console.log(values)
    if(facturaId){
      axios({
        url:`/api/v1/facturas/${facturaId}`,
        method: 'PATCH',
        data: {factura: values, products: grid}
      }).then(res=>{
        if(res.data.ok){
          message.success(t("Faktura o'zgartirildi!"))
        }else{
          message.error(t("Faktura o'zgartirishda xatolik!"));
        }
        console.log(res)
        setSaveLoading(false);
      }).catch(err=>{
        message.error(t("Faktura o'zgartirishda xatolik!"));
        console.log(err)
        setSaveLoading(false);
      })
    } else{
      axios({
        url:'/api/v1/facturas',
        method: 'post',
        data: {factura: values, products: grid}
      }).then(res=>{
        if(res.data.ok){
          message.success(t("Faktura yaratili!"))
        }
        else{
          message.error(t("Faktura yaratishda xatolik!"));
        }
        console.log(res)
        setSaveLoading(false);
      }).catch(err=>{
        console.log(err)
        message.error(t("Faktura yaratishda xatolik!"));
        setSaveLoading(false);
      })
    }
    

  }

  const handleImportExecl =(value)=>{

    if(value.file.status=="done"){
      
      const { response } = value.file

      response.excel.forEach((element, index)=>{
        element[0].value = index + 1;
        element[0].readOnly = true;
        element[2].dataEditor = SelectEditor;
        element[4].dataEditor = SelectMeasureEditor;
      })

      setGrid([grid[0], ...response.excel])
      console.log(response)
    }
  }

  //#endregion
  
  return (
    <div style={{padding: 15}}>
      <Form
        initialValues={initialData}
        form={form}
        name="factura"
        onFinish = {handleSubmit}
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
          <Col md={facturaType===FACTURA_TYPES["QOSHIMCHA"] || facturaType===FACTURA_TYPES["TUZATUVCHI"] ? 11 : 0}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-facutura-no-old"
                name="oldFacturaId">
                  <Input
                    rules={[{required: true}]}
                    size="large"
                    placeholder="Eski faktura ID" />
              </Form.Item>
                  <span className="custom-input-label-1">{t("Eski faktura ID")}</span>
              </Form.Item>
          </Col>
      </Row>  
      <Row justify="space-between">
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                rules={[{required: true}]}
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
                rules={[{required: true}]}>
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
                rules={[{required: true}]}
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
                rules={[{required: true}]}
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
          <BuyerForm form={ form } docType="factura" />
        </Col>
      </Row>
      </div>
      <div className={`factura-data-sheet-container ${fullView ? 'grid-full-view' : null}`}>
        <div style={{marginBottom: 10, display: 'flex', justifyContent:'space-between'}}>
          <div style={{display: 'flex'}}>
              <Upload 
                headers={{
                  Authorization: "Bearer " + token
                }}
                multiple={false}
                action="http://127.0.0.1:8000/api/v1/factura-products/read-excel"
                accept=".xlsx, .xls" 
                onChange={handleImportExecl}>
                
                  <Button style={{marginRight: 10}}>{t("Exceldan yuklash")}</Button>
               
              </Upload>
              <a target="_blank" href="../../../excels/on_doc_factura_products.xlsx" download>
                <Button >
                    {t("Shablonni yuklash")}
                </Button>
              </a>
            </div>
            <Button
              type="primary"
              icon={fullView ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
              onClick={()=>toglleFullView(!fullView)}>
                { fullView ? t("Kichraytirish") : t("Kengaytirish") }
            </Button>
        </div>
        
      <div style={{overflowX: 'auto'}} >
        <div style={{width: '100%'}}>
          <Datasheet
            data={ grid}
            valueRenderer={ valueRenderer}
            onContextMenu={ onContextMenu}
            onCellsChanged={ onCellsChanged}
          />
        </div>
      </div>
      <Button 
        size="large" 
        style={{marginTop: 20, marginRight: 7, width: 220}} 
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "plus-square"]} />} 
        onClick={  handleAddRow }>{t("Qo'shish")}</Button>
      
      <Button 
        size="large" 
        style={{marginTop: 20, width: 220 }} 
        danger
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "trash-alt"]} />} 
        onClick={ ()=>{ if(grid.length>1){ handleRemoveRow(grid.length-1) }}  }>{t("Oxirgi qatorni o'chirish")}</Button>
      </div>
          
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

         

<Row justify="space-between">
  <Col md={24} >
    <Form.Item>
      <Form.Item 
    key="selenote-field"
    name="notes">
      <Input
        size="large"
        placeholder={t("Qo'shimcha ma'lumotlar")} />
    </Form.Item>
      <span className="custom-input-label-1">{t("Qo'shimcha ma'lumotlar")}</span>
    </Form.Item>
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
                  icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons"  />}>
                    {t("Saqlash")}
                  </Button>
              </Col>
              <Col>
                <Button 
                  className="factra-action-btns sing-btn" 
                  size="large"
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
          <Form.Item
      key="hidden-factura-id"
      name="facturaId"
      >
        <Input 
        type="hidden"
        />

      </Form.Item>
      <Form.Item
      key="hidden-factura-product-id"
      name="facturaProductId"
      >
        <Input 
        type="hidden"
        />

      </Form.Item>

      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken
})

export default connect(mapStateToProps)(FacturaCreateForm);