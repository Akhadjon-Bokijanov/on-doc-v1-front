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
import { selectCurrentUser, selectToken } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  } from '@ant-design/icons';
import { convertProductsToGrid, FIRST_ACT_GRID_ROW } from '../../../utils/main';
import TextArea from 'antd/lib/input/TextArea';
import MeasureViewer from '../../../components/data-sheet-custom-measure-selector/measure-viewer';
import { ConvertDataToGrid, ConvertGridToData } from '../../models/AktProduct';
import { ConvertDataToForm, GetActDataToSign } from '../../models/Akt';

export const setActClient = (seller, client) => {
  return `Биз қуйида имзо чекувчилар, "${seller ?? "___________"}" бир томондан,бундан кейин Пудратчи деб номланади ва "${client ?? '__________'}" бошқа томондан, бундан кейин Буюртмачи деб номланади, иш Буюртмачининг талабларига мувофиқ тўлиқ бажарилганлиги тўғрисида акт туздик.`;

}

const ActForm = ({ token, match, user })=> {

  const [form] = Form.useForm();
  const { actId, duplicateId } = match.params;
  const [initialData, setInitialData] = useState({actText: setActClient(user.name)})
  const [newActId, setNewActId] = useState();
  const [isLoading, setIsloading] = useState(false);

  const setNewDocId = () => {
    axios({
      url: "info/get-guid",
      method: "get"
    }).then(res => {
      if (res.data.success) {
        setNewActId(res.data.data)
      }
    }).catch(ex => {
      console.log(ex)
    })
  }

  useEffect(()=>{
    if(actId || duplicateId){
      
      if(duplicateId){
        setNewDocId()
      }else{
        setNewActId(actId)
      }
      //fetch fatura data
      axios({
        url: `act/view?ActId=${actId ?? duplicateId}&tin=${user.tin ?? user.username}`,
        method: "GET",
      }).then(res=>{
        
        if(res.data?.success){
          setInitialData(ConvertDataToForm(res.data?.data[0]));
        }
        form.resetFields();

        setGrid([grid[0], ...ConvertDataToGrid(res.data?.data[0]?.ProductList.Products)]);
      }).catch(err=>{
        console.log(err);
      })
      //end fetch factura data;
    }
    else{
      setNewDocId()
    }
  }, [])
  

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
    FIRST_ACT_GRID_ROW,
    [
      { readOnly: true, value: 1 },                           //0 ordNo
      { value: "" },                                          //1 product name
      { value: "", dataEditor: SelectMeasureEditor, valueViewer: MeasureViewer },        //2 measure
      { value: '' },                                          //3 amount
      { value: "", },                                         //4 price
      { value: '', readOnly: true,}                           //6 total
    ] 
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
        grid[row][5] = { ...grid[row][5], value: grid[row][3].value && grid[row][4].value ? grid[row][3].value * grid[row][4].value : 0};
     
    });
     setGrid([...grid]);
  };

  const handleAddRow = ()=>{
    
    const sampleRow = [
        { readOnly: true, value: grid.length },                 //0 ordNo
        { value: "" },                                          //1 product name
      { value: "", dataEditor: SelectMeasureEditor, valueViewer: MeasureViewer  },        //2 measure
        { value: '' },                                          //3 amount
        { value: "", },                                         //4 price
        { value: '', readOnly: true,}                           //5 total
      ];
    

    let newgrid = [...grid, sampleRow];

     setGrid(newgrid)
  }

  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;
//#endregion
  
  //#region form methods

  const handleSubmit = (values)=>{
    setIsloading(true);

    if(actId){
      axios({
        url: `act/update?id=${actId}&tin=${user.tin ?? user.username}`,
        method: 'post',
        data: GetActDataToSign(values, ConvertGridToData(grid), newActId)
      }).then(res=>{
        setIsloading(false);
        if(res.data.success){
          message.success("Akt yangilandi!");
        }
        else{
          message.error("Akt yangilashda xatolik!");
        }
        console.log(res)
      }).catch(err=>{
        setIsloading(false)
        message.error("Akt yangilashda xatolik!");
        console.log(err)
      })
    } else{
      axios({
        url:'act/create',
        method: 'post',
        data: GetActDataToSign(values, ConvertGridToData(grid), newActId)
      }).then(res=>{
        setIsloading(false)
        if(res.data.success){
          message.success("Akt yaratildi!");
        }
        else{
          message.error("Akt yaratishda xatolik!");
        }
        console.log(res)
      }).catch(err=>{
        setIsloading(false)
        message.error("Akt yaratishda xatolik!");
        console.log(err)
      })
    }
    

  }

  const handleImportExecl =(value)=>{
    console.log("me fired")

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
      <h3>Akt yaratish</h3>
       
      <Row justify="space-between">
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                rules={[{required: true}]}
                key="dyna-form-facutura-no"
                name="actNo">
                  <Input
                    size="large"
                    placeholder="Akt raqami" />
              </Form.Item>
                  <span className="custom-input-label-1">Akt raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-date"
                name="actDate"
                rules={[{required: true}]}>
                  <DatePicker                
                    size="large"
                    placeholder="Akt sanasi" />
              </Form.Item>
                  <span className="custom-input-label-1">Akt sanasi</span>
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
          <SellerForm form={form} docType="act" />
        </Col>

        <Col md={11}>
          <BuyerForm form={ form } docType="act" />
        </Col>
      </Row>
      </div>
      
      <div className="factura-data-sheet-container">
            <h3>Akt mazmuni</h3>
              <Form.Item name="actText">
                <TextArea size="large" rows={4} />
              </Form.Item>
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

      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser
})

export default connect(mapStateToProps)(ActForm);