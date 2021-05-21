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
import { selectCurrentUser, selectLoadedKey, selectToken } from '../../../redux/user/user.selector';
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
import { SignDoc } from '../../../utils/doc-sign';
import { useTranslation } from 'react-i18next';
import download from "../../../images/download.svg";
import delete_icon from "../../../images/delete-icon.svg";
import add_icon from "../../../images/add-icon.svg";

export const setActClient = (seller, client) => {
  return `Биз қуйида имзо чекувчилар, "${seller ?? "___________"}" бир томондан,бундан кейин Пудратчи деб номланади ва "${client ?? '__________'}" бошқа томондан, бундан кейин Буюртмачи деб номланади, иш Буюртмачининг талабларига мувофиқ тўлиқ бажарилганлиги тўғрисида акт туздик.`;

}

const ActForm = ({ token, match, user, loadedKey })=> {

  const { t } = useTranslation()
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
  const [totalSumm, setTotalSumm] = useState(0);

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

  const handleSign = ()=>{
    let values = form.getFieldsValue();
    try{
      SignDoc(
        loadedKey.id, 
        GetActDataToSign(values, ConvertGridToData(grid), newActId),
        'act',
        user.tin
        )
    }catch(ex){
      console.log(ex)
    }
  }

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
    if(value.file.status==="done"){
      
      const { response } = value.file
      let elements=[];
      console.log(response.data)
      if(Array.isArray(response.data)){
        response.data.forEach((item, index)=>{
          let i = [
            { readOnly: true, value: index+1 },                 //0 ordNo
            { value: item?.ProductName },                                          //1 product name
            { value: item?.ProductMeasureId, dataEditor: SelectMeasureEditor, valueViewer: MeasureViewer },        //2 measure
            { value: item?.ProductCount },                                          //3 amount
            { value: item?.ProductSumma },                                         //4 price
            { value: item?.ProductDeliverySum, readOnly: true, }                           //5 total
          ]
          elements.push(i);
        })
      }

      setGrid([grid[0], ...elements])
    
    }
  }

  //#endregion
  
  return (
    <div style={{padding: 32}}>
      <h1 style={{ fontWeight: 'bold' }}>{t("Dokument yaratish:")}{t("Akt")}</h1>
      <Form
        requiredMark={false}
        initialValues={initialData}
        form={form}
        labelCol={{span: 24}}
        name="factura"
        onFinish = {handleSubmit}
        scrollToFirstError
        validateMessages={validateMessages}
      >

      <div className="factura-data-sheet-container">
       
      <Row justify="space-between" gutter={[32, 0]}>
            <Col md={12}>
            {/* <Form.Item> */}
              <Form.Item 
                rules={[{required: true}]}
                label={t("Akt raqami")}
                key="dyna-form-facutura-no"
                name="actNo">
                  <Input
                    size="large"
                    placeholder="Akt raqami" />
              </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
            </Col>
            <Col md={12}>
            {/* <Form.Item> */}
              <Form.Item 
                key="dyna-form-item-inn-date"
                name="actDate"
                label={t("Akt sanasi")}
                rules={[{required: true}]}>
                  <DatePicker                
                    size="large"
                    placeholder="Akt sanasi" />
              </Form.Item>
                  {/* <span className="custom-input-label-1"></span> */}
              {/* </Form.Item> */}
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
          <SellerForm form={form} docType="act" />
        </Col>

        <Col md={12}>
          <BuyerForm form={ form } docType="act" />
        </Col>
      </Row>
      </div>
      
      <div className="factura-data-sheet-container">
          <h3>{t("Akt mazmuni") }</h3>
              <Form.Item name="actText">
                <TextArea size="large" rows={5} />
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
                action={`http://api.onlinefactura.uz/uz/act/import-excel`}
                accept=".xlsx, .xls" 
                name="Files[file]"
                data={{ tin: user.tin }}
                onChange={handleImportExecl}>
                
                <span style={{ cursor: 'pointer', marginRight: 10 }}>
                  <img src={download} alt="download" style={{ marginRight: 9 }} />
                  {t("Exceldan yuklash")}
                </span>
               
              </Upload>
              <a style={{ color: '#303030', marginLeft: 28 }} target="_blank" href="../../../excels/akt_products.xlsx" download>
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
            data={ grid}
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
        style={{marginTop: 20, marginRight: 7, width: 220}} 
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "plus-square"]} />} 
        onClick={  handleAddRow }>Qo'shish</Button> */}
      
      {/* <Button 
        size="large" 
        style={{marginTop: 20, width: 220 }} 
        danger
        type="primary" 
        icon={<FontAwesomeIcon 
          style={{marginRight: 7}} 
          icon={["far", "trash-alt"]} />} 
        onClick={ ()=>{ if(grid.length>1){ handleRemoveRow(grid.length-1) }}  }>Oxirgi qatorni o'chirish</Button> */}
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
  loadedKey: selectLoadedKey
})


export default connect(mapStateToProps)(ActForm);