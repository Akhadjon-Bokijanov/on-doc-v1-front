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
import {selectCurrentUser, selectToken} from '../../../redux/user/user.selector';
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

const EmpowermentForm = ({ token, match, user })=> {

  const [form] = Form.useForm();
  const { empowermentId,duplicateId } = match.params;
  const [initialData, setInitialData] = useState()
  const [newEmpId,setNewEmpId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [gridInitialValues, setGridInitialValues] = useState([]);
  const [tin,setTin] = useState('');


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



  const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
//#endregion
  
  //#region form methods

  const handleSubmit = (values)=>{
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
        }
      })
    } else{
      empApi.addEmp(GetEmpowermentDataToSign( values, products,newEmpId))
              .then(res=>{
                setIsLoading(false)
                if(res.data?.success){
                  message.success("Ishonchnma yaratildi!");
                }
            }
      )
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

      response.excel.forEach((element, index)=>{
        element[0].value = index + 1;
        element[0].readOnly = true;
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
      <h3>Ishonchnoma</h3>
      
      <Row justify="space-between">
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-facutura-no"
                name="empowermentNo">
                  <Input
                    size="large"
                    placeholder="Inshonchnoma raqami" />
              </Form.Item>
                  <span className="custom-input-label-1">Inshonchnoma raqami</span>
              </Form.Item>
            </Col>
            
            <Col md={11}>
              <div style={{display: 'flex', justifyContent: "space-between"}}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-date"
                name="empowermentDateOfIssue"
                rules={[{required: true}]}>
                  <DatePicker                
                    size="large"
                    placeholder="Berilgan sanasi" />
              </Form.Item>
                  <span className="custom-input-label-1">Berilgan sanasi</span>
              </Form.Item>
          
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-date-expire"
                name="empowermentDateOfExpire"
                rules={[{required: true}]}>
                  <DatePicker                
                    size="large"
                    placeholder="Amal qilish sanasi" />
              </Form.Item>
                  <span className="custom-input-label-1">Amal qilish sanasi</span>
              </Form.Item>
              </div>
            </Col>
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-item-contract-n0"
                name="contractNo">
                  <Input
                    size="large"
                    placeholder="Shartnoma raqami" />
              </Form.Item>
                  <span className="custom-input-label-1">Shartnoma raqami</span>
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
                    placeholder="Shartnoma sanasi" />
              </Form.Item>
                  <span className="custom-input-label-1">Shartnoma sanasi</span>
              </Form.Item>
            </Col>
          </Row>
      </div>

      <div className="factura-data-sheet-container">
        
        <Row justify="space-between">
        <Col md={11}>  
          <SellerForm docType="empowerment"/>
        </Col>

        <Col md={11}>
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
                action="http://127.0.0.1:8000/api/v1/factura-products/read-excel"
                accept=".xlsx, .xls" 
                onChange={handleImportExecl}>
                
                  <Button style={{marginRight: 10}}>Exceldan yuklash</Button>
               
              </Upload>
              <a target="_blank" href="../../../excels/on_doc_factura_products.xlsx" download>
                <Button >
                  Shablon yuklash
                </Button>
              </a>
            </div>
            <Button
              type="primary"
              icon={fullView ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
              onClick={()=>toglleFullView(!fullView)}>
                { fullView ? "Kichraytirish" : "Kengaytirish" }
            </Button>
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
      <Button 
        size="large" 
        style={{marginTop: 20, marginRight: 7, width: 220}} 
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
        onClick={ ()=>{ if(grid.length>1){ handleRemoveRow(grid.length-1) }}  }>Oxirgi qatorni o'chirish</Button>
      </div>
          
        <div className="factura-data-sheet-container">

          <Row justify="space-between">
          <Col md={7}>
              <Form.Item>
                <Form.Item 
              key="seler-account-tyin-inn"
              name="agentTin">
                <Input
                  size="large"
                  placeholder="СТИР"
                  onChange={fetchAgent}
                  />
              </Form.Item>
                <span className="custom-input-label-1">СТИР</span>
              </Form.Item>
            </Col>
            <Col md={7} >
              <Form.Item>
                <Form.Item 
              key="agentFio-no"
              name="agentFio">
                <Input
                  size="large"
                  placeholder="ФИШ" />
              </Form.Item>
                <span className="custom-input-label-1">ФИШ</span>
              </Form.Item>
            </Col>
            <Col md={7}>
              <Form.Item>
                <Form.Item 
              key="seler-account-empowerment-dateof-issue-agentJobTittle"
              name="agentJobTittle">
                <Input
                  size="large"
                  placeholder="Мансаб" />
              </Form.Item>
                <span className="custom-input-label-1">Мансаб</span>
              </Form.Item>
            </Col>
            
            <Col md={7}>
          
                <Form.Item>
                  <Form.Item 
                key="seler-account-agent-fioe"
                name="agentPassportNumber">
                  <Input
                    size="large"
                    placeholder="Паспорт серия ва рақами" />
                </Form.Item>
                  <span className="custom-input-label-1">Паспорт серия ва рақами</span>
                </Form.Item>
            
            </Col>

            <Col md={7} >
              <Form.Item>
                <Form.Item
              key="selenote-field"
              name="agentPassportIssuedBy">
                <Input
                  size="large"
                  placeholder="Ким томонидан берилган" />
              </Form.Item>
                <span className="custom-input-label-1">Ким томонидан берилган</span>
              </Form.Item>
            </Col>
            <Col md={7} >
              <Form.Item>
                <Form.Item
              key="selenote-field"
              name="agentPassportDateOfIssue">
                <DatePicker
                  size="large"
                  placeholder="Паспорт берилган сана" />
              </Form.Item>
                <span className="custom-input-label-1">Паспорт берилган сана</span>
              </Form.Item>
            </Col>

          </Row>
          </div>
          <div className="factura-data-sheet-container">
            <Row justify="space-around">
              <Col >
                <Button 
                  loading={isLoading}
                  primary
                  htmlType="submit"
                  className="factra-action-btns save-btn" 
                  size="large"
                  icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons"  />}>
                    Сақлаб қолиш
                  </Button>
              </Col>
              <Col>
                <Button 
                  className="factra-action-btns sing-btn" 
                  size="large"
                  icon={<FontAwesomeIcon icon="signature" className="factura-action-btn-icons" />}>
                    Имзолаш
                  </Button>
              </Col>
              <Col>
                <Button 
                  icon={<FontAwesomeIcon icon="ban" className="factura-action-btn-icons" />} 
                  danger 
                  className="factra-action-btns" 
                  size="large">
                    Бекор қилиш
                  </Button>
              </Col>
            </Row>
          </div>
          <Form.Item
            name="empowermentId"
            key="empowermemt-id"
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="empowermentProductId"
            key="empowermemt-product-id"
          >
            <Input type="hidden" />
          </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser
})

export default connect(mapStateToProps)(EmpowermentForm);