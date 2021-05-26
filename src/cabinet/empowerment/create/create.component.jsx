import React, { useState, useEffect } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Datasheet from 'react-datasheet';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import { Button, Input, Form, Row, Col, DatePicker, Select, Upload, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './create.style.scss';
import axios from 'axios';
import BuyerForm from '../../common/buyer-form.component';
import SellerForm from '../../common/seller-form.component';
import { connect } from 'react-redux';
import {selectCurrentUser, selectLoadedKey, selectToken} from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  } from '@ant-design/icons';
import { convertProductsToGrid, FIRST_EMPOWERMENT_GRID_ROW } from '../../../utils/main';
import { GetEmpowermentDataToSign } from '../../models/Empowerment';
import {
  ConverEmpGridToData,
  ConvertEmpDataToForm,
  ConvertEmpDataToGrid,
  ConvertEmpProductToGrid
} from "../../models/EmpowermentProduct";
import {ConvertGridToProduct, ConvertProductToGrid} from "../../models/FacturaProduct";
import {ProductValueRendered} from "../../factura/create/product-grid.component";
import MeasureViewer from "../../../components/data-sheet-custom-measure-selector/measure-viewer";
import {empApi} from "../../../sevices/empService";
import {generateId} from "../../../sevices/api";
import {SignDoc} from "../../../utils/doc-sign";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import download from "../../../images/download.svg";
import delete_icon from "../../../images/delete-icon.svg";
import add_icon from "../../../images/add-icon.svg";
const EmpowermentForm = ({ token, match, user, loadedKey })=> {


  const [form] = Form.useForm();
  const { empowermentId,duplicateId } = match.params;
  const [initialData, setInitialData] = useState()
  const [newEmpId,setNewEmpId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [gridInitialValues, setGridInitialValues] = useState([]);
  const [tin,setTin] = useState('');

  const history = useHistory();

  const editEmp=()=>{
    empApi.getEmp(user?.tin,empowermentId??duplicateId)
        .then(res=>{
          let data = ConvertEmpDataToForm(res.data.data[0])
          console.log(data);
          data.contractDate=moment(data.contractDate);
          data.created_at=moment(data.created_at);
          data.empowermentDateOfExpire=moment(data.empowermentDateOfExpire);
          data.empowermentDateOfIssue=moment(data.empowermentDateOfIssue);
          data.agentPassportDateOfIssue=moment(data.agentPassportDateOfIssue);
          data.updated_at=moment(data.updated_at);
          setInitialData(data);
          form.resetFields();
          setGridInitialValues(ConvertEmpProductToGrid(res.data.data[0]?.ProductList.Products))
            if (duplicateId){
                generateId().then(res=>{
                    setNewEmpId(res.data.data)
                })
            }
        })
  }
  useEffect(()=>{
    if(empowermentId || duplicateId){
      setNewEmpId(empowermentId);
      editEmp();
    } else {
      generateId()
        .then(res => {
          setNewEmpId(res.data.data);
        })
    }
  }, [])

  useEffect(()=>{
    if (empowermentId){
      setGrid([
        grid[0],
        ...gridInitialValues
      ])
    }
  },[gridInitialValues]);

  const validateMessages = {
    required: 'Bu maydon majburiy!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
    
  };


  const [fullView, toglleFullView] = useState(false)


  const [grid, setGrid] = useState([
    FIRST_EMPOWERMENT_GRID_ROW,
    [
      { readOnly: true, value: 1 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor:  SelectMeasureEditor,valueViewer: MeasureViewer },        //2 measure
      { value: '' },                                          //3 amount
    ],
  ])

  const fetchAgent = e=>{
    let val = e.target.value;
    if(!isNaN(val)){

      if(val > 100000000 && val<999999999){
        axios({
          method: "GET",
          url: "info/contragent-by-tin?tin="+val
        })
        .then(res=>{
          setTin(val);
          const { 
            name, 
            fullName, 
            passIssueDate, 
            passOrg,
            passNumber,
            passSeries
          } = res.data;
          
          form.setFieldsValue({
            agentFio: fullName ?? name,
            agentPassportDateOfIssue: moment(passIssueDate)._isValid ? moment(passIssueDate) : null,
            agentPassportIssuedBy: passOrg,
            agentPassportNumber: passSeries + passNumber
          })
        })
      }

    }else{
      message.warning("STIR notog'ri kiritildi!");
    }
  }


  //#region data-sheet methods
  const handleRemoveRow = (rowId)=>{
    console.log(rowId)

    console.log(grid)
    grid.splice(rowId, 1)
    console.log(grid)
    setGrid([...grid])
  }

  const valueRenderer = cell => cell.value;
  const onCellsChanged = changes => {
    changes.forEach(({ cell, row, col, value }, index) => {
        //this sets changed values
        grid[row][col] = { ...grid[row][col], value };        

    });
     setGrid([...grid]);
  };

  const [totalSumm, setTotalSumm] = useState(0);
  useEffect(() => {
    let total = 0;
    grid.forEach((row, index) => {
      if (index !== 0) {
        if (parseFloat(row[row.length - 1].value) > 0) {
          total += parseFloat(row[row.length - 1].value)
        }
      }
    })
    setTotalSumm(total);
  }, [grid])
  const handleAddRow = ()=>{
    
    const sampleRow = [
      { readOnly: true, value:    grid.length }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor:  SelectMeasureEditor,valueViewer: MeasureViewer }, //4 measure
      { value: '' }, //5 amount
    ]

    let newgrid = [...grid, sampleRow];

     setGrid(newgrid)
  }

    useEffect(()=>{
        const handleEsc=(e)=>{
            if (e.keyCode===27||e.keyCode===8){
                history.push('/cabinet/empowerment')
            }
        };
        window.addEventListener('keydown',handleEsc);
        return ()=>window.removeEventListener('keydown',handleEsc)
    },[])


  const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
//#endregion
  
  //#region form methods

  const handleSubmit=(values)=>{
    console.log("data",GetEmpowermentDataToSign( values, products,newEmpId))
    setIsLoading(true)
    if(empowermentId){
          empApi
              .editEmp(empowermentId,user,GetEmpowermentDataToSign( values, products,newEmpId))
              .then(res=>{
        console.log(res)
        setIsLoading(false);
        if(res.data.success){
          message.success("Ishonchnoma ozgartirildi!")
            history.push('/cabinet/empowerment');
        }
      })
    } else{
      empApi.addEmp(GetEmpowermentDataToSign( values, products,newEmpId))
              .then(res=>{
                setIsLoading(false)
                if(res.data?.success){
                  message.success("Ishonchnma yaratildi!");
                  history.push('/cabinet/empowerment');
                }
            }
      )
    }
  }

  const handleSign=()=>{
      let values = form.getFieldsValue();
      try {
          SignDoc(
              loadedKey.id,
              GetEmpowermentDataToSign(values,ConverEmpGridToData(grid),newEmpId),
              'emp',
              user.tin
          )
      }catch (ex){

      }
  }

  function getProducts(){
     setProducts(ConverEmpGridToData(grid));
  }
  useEffect(()=>{
    getProducts();
  },[grid])

  const handleImportExecl =(value)=>{
    console.log("me fired")

    if(value.file.status=="done"){
      
      const { response } = value.file
        let collector=[];
        console.log("responese",response)
        if (response.success){
            response.data.forEach((row,index)=>{
                const {
                    ProductName,
                    ProductMeasureId,
                    ProductCount
                } = row
                collector.push(
                    [
                        {value:index+1,readOnly:true},
                        {value:ProductName},
                        {value:ProductMeasureId},
                        {value:ProductCount}
                    ]
                )
            })
        }

      setGrid([grid[0], ...collector])
    }
  }
  const { t } = useTranslation()
  //#endregion
  
  return (
    <div style={{padding: 32}}>
      <Form
        requiredMark={false}
        labelCol={{span: 24}}
        initialValues={initialData}
        form={form}
        name="factura"
        onFinish = {handleSubmit}
        scrollToFirstError
        validateMessages={validateMessages}
      >
        <h1 style={{fontWeight: 'bold'}}>{t("Dokument yaratish:")}{t("Ishonchnoma")}</h1>
      <div className="factura-data-sheet-container">
      
      <Row justify="space-between" gutter={[32,0]}>
            <Col md={12}>
            {/* <Form.Item> */}
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-facutura-no"
                label={t("Inshonchnoma raqami")}
                name="empowermentNo">
                  <Input
                    size="large"
                    placeholder="Inshonchnoma raqami" />
              </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            
            <Col md={12}>

              <Row justify="space-between" gutter={[32, 0]}>
                <Col md={12}>
                  {/* <Form.Item> */}
                  <Form.Item

                    key="dyna-form-item-inn-date"
                    name="empowermentDateOfIssue"
                    label={t("Berilgan sanasi")}
                    rules={[{ required: true }]}>
                    <DatePicker
                      size="large"
                      placeholder="Berilgan sanasi" />
                  </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col md={12}>
                  {/* <Form.Item> */}
                  <Form.Item
                    key="dyna-form-item-inn-date-expire"
                    name="empowermentDateOfExpire"
                    label={t("Amal qilish sanasi")}
                    rules={[{ required: true }]}>
                    <DatePicker
                      size="large"
                      placeholder="Amal qilish sanasi" />
                  </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
              </Row>
              
            </Col>
            <Col md={12}>
            {/* <Form.Item> */}
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-item-contract-n0"
                label={t("Shartnoma raqami")}
                name="contractNo">
                  <Input
                    size="large"
                    placeholder="Shartnoma raqami" />
              </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
            {/* <Form.Item> */}
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-item-contract-date"
                label={t("Shartnoma sanasi")}
                name="contractDate">
                  <DatePicker
                    size="large"
                    placeholder="Shartnoma sanasi" />
              </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
          </Row>
      </div>

      <div className="factura-data-sheet-container">
        
        <Row justify="space-between" gutter={[32, 0]}>
        <Col md={12}>  
          <SellerForm docType="empowerment"/>
        </Col>

        <Col md={12}>
          <BuyerForm form={ form } docType="empowerment"/>
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
                action={`http://api.onlinefactura.uz/uz/emp/import-excel`}
                accept=".xlsx, .xls"
                name="Files[file]"
                data={{tin: user.tin}}
                onChange={handleImportExecl}>
                
                <span style={{ cursor: 'pointer', marginRight: 10 }}>
                  <img src={download} alt="download" style={{ marginRight: 9 }} />
                  {t("Exceldan yuklash")}
                </span>
               
              </Upload>
              <a style={{ color: '#303030', marginLeft: 28 }} target="_blank" href="../../../excels/empowerment_products.xlsx" download>
                <span >
                  <img src={download} alt="download" style={{ marginRight: 9 }} />
                  {t("Shablonni yuklash")}
                </span>
              </a>
              
            </div>
            {/* <Button
              type="primary"
              icon={fullView ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
              onClick={()=>toglleFullView(!fullView)}>
                { fullView ? "Kichraytirish" : "Kengaytirish" }
            </Button> */}
        </div>
        
      <div style={{overflowX: 'auto'}} >
        <div style={{width: '100%'}}>
          <Datasheet
            data={grid}
            valueRenderer={ valueRenderer}
            onContextMenu={ onContextMenu}
            onCellsChanged={ onCellsChanged}
          />
        </div>
      </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h3>{t("Total")}: {totalSumm}</h3>
            <div>
              <span
                onClick={() => { if (grid.length > 1) { handleRemoveRow(grid.length - 1) } }}
                style={{ color: '#2B63C0', fontSize: 16, cursor: 'pointer' }}>
                <img src={delete_icon} alt="" style={{ marginRight: 10 }} />
                {t("Oxirgi qatorni o'chirish")}
              </span>
              <span
                onClick={handleAddRow}
                style={{ color: '#2B63C0', fontSize: 16, cursor: 'pointer' }}>
                <img src={add_icon} alt="" style={{ marginRight: 10, marginLeft: 34 }} />
                {t("Qo'shish")}
              </span>
            </div>
          </div>
      {/* <Button 
        size="large" 
        style={{marginTop: 20, marginRight: 8, width: 220}} 
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "plus-square"]} />} 
        onClick={  handleAddRow }>Qo'shish</Button>
      
      <Button 
        size="large" 
        style={{marginTop: 20, width: 220 }} 
        danger
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "trash-alt"]} />} 
        onClick={ ()=>{ if(grid.length>1){ handleRemoveRow(grid.length-1) }}  }>Oxirgi qatorni o'chirish</Button> */}
      </div>
          
        <div className="factura-data-sheet-container">

          <Row justify="space-between" gutter={[32, 0]}>
          <Col md={8}>
              {/* <Form.Item> */}
                <Form.Item 
              key="seler-account-tyin-inn"
              label={t("STIR")}
              name="agentTin">
                <Input
                  size="large"
                  placeholder="СТИР"
                  onChange={fetchAgent}
                  />
              </Form.Item>
                {/* <span className="custom-input-label-1">СТИР</span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={8} >
              {/* <Form.Item> */}
                <Form.Item 
              key="agentFio-no"
              label={t("FIO")}
              name="agentFio">
                <Input
                  size="large"
                  placeholder="ФИШ" />
              </Form.Item>
                {/* <span className="custom-input-label-1">ФИШ</span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={8}>
              {/* <Form.Item> */}
                <Form.Item 
                label={t("Mansab")}
              key="seler-account-empowerment-dateof-issue-agentJobTittle"
              name="agentJobTittle">
                <Input
                  size="large"
                  placeholder="Мансаб" />
              </Form.Item>
                {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            
            <Col md={8}>
          
                {/* <Form.Item> */}
                  <Form.Item 
                key="seler-account-agent-fioe"
                label={t("Passport seriya va raqami")}
                name="agentPassportNumber">
                  <Input
                    size="large"
                    placeholder="Паспорт серия ва рақами" />
                </Form.Item>
                  {/* <span className="custom-input-label-1">Паспорт серия ва рақами</span> */}
                {/* </Form.Item> */}
            
            </Col>

            <Col md={8} >
              {/* <Form.Item> */}
                <Form.Item
              key="selenote-field"
              label={t("Kim tomonidan berilgan")}
              name="agentPassportIssuedBy">
                <Input
                  size="large"
                  placeholder="Ким томонидан берилган" />
              </Form.Item>
                {/* <span className="custom-input-label-1">Ким томонидан берилган</span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={8} >
              {/* <Form.Item> */}
                <Form.Item
              key="selenote-field"
              label={t("Passport berilgan sana")}
              name="agentPassportDateOfIssue">
                <DatePicker
                  size="large"
                  placeholder="Паспорт берилган сана" />
              </Form.Item>
                {/* <span className="custom-input-label-1">Паспорт берилган сана</span> */}
              {/* </Form.Item> */}
            </Col>

          </Row>
          </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div >
              <Button
                icon={<FontAwesomeIcon icon="ban" className="factura-action-btn-icons" />}
                danger
                style={{ marginRight: 24 }}
                className="custom-ant-primary-btn cancel-btn"
              >
                {t("Bekor qilish")}
              </Button>
              <Button
                loading={isLoading}
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
                loading={isLoading}
                primary
                style={{ marginRight: 24 }}
                htmlType="submit"
                className="custom-ant-primary-btn save-btn"//"factra-action-btns save-btn"
                icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons" />}>
                {t("Saqlash")}
              </Button>
              <Button
                loading={isLoading}
                className="custom-ant-primary-btn sign-btn"
                onClick={handleSign}
                icon={<FontAwesomeIcon icon="signature" className="factura-action-btn-icons" />}>
                {t("Imzolash")}
              </Button>
            </div>
          </div>
        </div>
          
      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser,
  loadedKey:selectLoadedKey
})

export default connect(mapStateToProps)(EmpowermentForm);