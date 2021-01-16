import React, { useState } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Datasheet from 'react-datasheet';
import SelectEditor from '../../../components/data-sheet-custom-selector/custom-selector.component';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import { Button, Input, Form, Row, Col, DatePicker, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaximizeMinimizeCard from '../../../components/maximize-minimize-card/max-min-card.component'
import './create.style.scss';

const { Option } = Select;

const FacturaCreateForm = ()=> {
  
  const actionsButton = ({ row })=>{
    return <div style={{textAlign: 'center'}}>
        <Button danger onClick={()=> handleRemoveRow(row)} icon={<FontAwesomeIcon icon={["far", "trash-alt"]}/>} ></Button>
      </div>
  }

  const [grid, setGrid] = useState([
    [
      { readOnly: true, value: '', width: 80 },
      { value: 'Товар (хизмат)лар номи*', readOnly: true, width: 300 },
      { value: 'Товар (хизмат) лар Ягона электрон миллий каталоги бўйича идентификация коди ва номи*', readOnly: true, width: 200 },
      { value: 'Товар/хизмат штрих коди', readOnly: true, width: 120 },
      { value: 'ўлчов бирлиги.*', readOnly: true, width: 120  },
      { value: "миқдори", readOnly: true, width: 120 },
      { value: "Нарҳ*", readOnly: true, width: 120 },
      { value: "Акциз солиғи ставкаси (%)", readOnly: true, width: 120 },
      { value: "Акциз, Миқдор", readOnly: true, width: 120 },
      { value: "етказиб бериш нарҳи*", readOnly: true, width: 120 },
      { value: "ққс, %", readOnly: true, width: 120 },
      { value: "ққс, Миқдор*", readOnly: true, width: 120 },
      { value: "Total*", readOnly: true, width: 220 },

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
  ])
  


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
        

        //Lets calculate
        let priceamount = grid[row][5].value * grid[row][6].value;
        let aksizamount = priceamount * grid[row][7].value;
        
        grid[row][8]={ value: aksizamount/100, readOnly: true };
        
        let vatamout = priceamount * grid[row][10].value;
        
        grid[row][11] = { value: vatamout/100, readOnly: true }

        grid[row][12] = { value: priceamount ? priceamount + aksizamount + vatamout + grid[row][9].value : 0, readOnly: true}
        //let vatamount = priceamount * grid[row][]
        //grid[row][12]= priceamount + grid[row][]
     
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
    console.log(values)
  }

  //#endregion
  
  return (
    <div style={{padding: 15}}>
      <Form
        name="factura"
        onFinish = {handleSubmit}
        scrollToFirstError
      >

      <div className="factura-data-sheet-container">
      <h3>Ҳужжат тури</h3>
      <Row>
      <Col md={11}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-facutura-no"
                name="facturaNo">
                  <Select
                    bordered={false}
                    size="large"
                    placeholder="Faktura turi">
                      <Option value={1}>Standard</Option>
                      <Option value={2}>Qo'shimcha</Option>
                      <Option value={3}>Harajatni qoplash</Option>
                      <Option value={4}>To'lovsiz</Option>
                      <Option value={5}>Tuzatuvchi</Option>
                    </Select>
              </Form.Item>
                  <span className="custom-input-label-1">Faktura turi</span>
              </Form.Item>
            </Col>
      </Row>  
      <Row justify="space-between">
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-facutura-no"
                name="facturaNo">
                  <Input
                    size="large"
                    placeholder="Faktura raqami" />
              </Form.Item>
                  <span className="custom-input-label-1">Faktura raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-date"
                name="facturaDate">
                  <DatePicker
                    size="large"
                    placeholder="Faktura sanasi" />
              </Form.Item>
                  <span className="custom-input-label-1">Faktura sanasi</span>
              </Form.Item>
            </Col>
            <Col md={11}>
            <Form.Item>
              <Form.Item 
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
        <Row justify="space-between" wrap>
            <Col md={11}>
              <h3>Сизнинг маълумотларингиз</h3>
              <Form.Item>
                <Form.Item 
                key="dyna-form-item-inn-seller"
                name="sellerTin">
                  <Input
                    size="large"
                    placeholder="Sotuvchi INN" />
              </Form.Item>
                  <span className="custom-input-label-1">INN</span>
              </Form.Item>
            </Col>
            <Col md={11}>
            <h3>Контрагент маълумотлари</h3>
            <Form.Item>
              <Form.Item 
                key="dyna-form-item-inn-buyer"
                name="buyerTin">
                  <Input
                    size="large"
                    placeholder="Oluvchi INN" />
              </Form.Item>
                  <span className="custom-input-label-1">INN</span>
              </Form.Item>
            </Col>
          </Row>
        
        <Row justify="space-between">
        <Col md={11}>
          <h3>Ташкилот</h3>
          <Form.Item>
            <Form.Item 
            key="seller-name-1-sellerName"
            name="sellerName">
              <Input
                size="large"
                placeholder="Сотувчи номи" />
          </Form.Item>
              <span className="custom-input-label-1">Сотувчи номи</span>
          </Form.Item>
          <Form.Item>
            <Form.Item 
              key="seler-account-vatreg"
              name="sellerVatRegCode">
                <Input
                  size="large"
                  placeholder="ҚҚС тўловчисининг регистрация рақами" />
              </Form.Item>
                <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
              </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerAccount">
                <Input
                  size="large"
                  placeholder="Ҳисоб рақами" />
              </Form.Item>
                <span className="custom-input-label-1">Ҳисоб рақами</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerMfo">
                <Input
                  size="large"
                  placeholder="МФО" />
              </Form.Item>
                <span className="custom-input-label-1">МФО</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            key="seler-account"
            name="sellerAddress">
              <Input
                size="large"
                placeholder="Манзил" />
          </Form.Item>
              <span className="custom-input-label-1">Манзил</span>
          </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerDirector">
                <Input
                  size="large"
                  placeholder="Директор" />
              </Form.Item>
                <span className="custom-input-label-1">Директор</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="sellerAccountant">
                <Input
                  size="large"
                  placeholder="Бош хисобчи" />
              </Form.Item>
                <span className="custom-input-label-1">Бош хисобчи</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            key="seler-account"
            name="sellerAgent">
              <Input
                size="large"
                placeholder="Масъул шахс" />
          </Form.Item>
              <span className="custom-input-label-1">Масъул шахс</span>
          </Form.Item>
        </Col>

        <Col md={11}>
          <h3>Ҳамкорингизнинг Корхонаси</h3>
          <Form.Item>
            <Form.Item 
            key="buyer-name-1-buyerName"
            name="buyerName">
              <Input
                size="large"
                placeholder="Hоми" />
          </Form.Item>
              <span className="custom-input-label-1">Hоми</span>
          </Form.Item>
          <Form.Item>
            <Form.Item 
              key="seler-account-vatreg"
              name="buyerVatRegCode">
                <Input
                  size="large"
                  placeholder="ҚҚС тўловчисининг регистрация рақами" />
              </Form.Item>
                <span className="custom-input-label-1">ҚҚС тўловчисининг регистрация рақами</span>
              </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerAccount">
                <Input
                  size="large"
                  placeholder="Ҳисоб рақами" />
              </Form.Item>
                <span className="custom-input-label-1">Ҳисоб рақами</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerMfo">
                <Input
                  size="large"
                  placeholder="МФО" />
              </Form.Item>
                <span className="custom-input-label-1">МФО</span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item 
            key="seler-account"
            name="buyerAddress">
              <Input
                size="large"
                placeholder="Манзил" />
          </Form.Item>
              <span className="custom-input-label-1">Манзил</span>
          </Form.Item>
          <Row justify="space-between">
            <Col md={11} >
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerDirector">
                <Input
                  size="large"
                  placeholder="Директор" />
              </Form.Item>
                <span className="custom-input-label-1">Директор</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item 
              key="seler-account"
              name="buyerAccountant">
                <Input
                  size="large"
                  placeholder="Бош хисобчи" />
              </Form.Item>
                <span className="custom-input-label-1">Бош хисобчи</span>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
      <div className="factura-data-sheet-container">
      <div style={{overflowX: 'auto'}} >
        <div style={{width: '130%'}}>
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

          <Row justify="space-between">
            <Col md={5} >
              <Form.Item>
                <Form.Item 
              key="empowerment-no"
              name="empowermentNo">
                <Input
                  size="large"
                  placeholder="Ишончнома рақами" />
              </Form.Item>
                <span className="custom-input-label-1">Ишончнома рақами</span>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item>
                <Form.Item 
              key="seler-account-empowerment-dateof-issue"
              name="empowermentDateOfIssue">
                <Input
                  size="large"
                  placeholder="Ишончнома санаси" />
              </Form.Item>
                <span className="custom-input-label-1">Ишончнома санаси</span>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item>
                <Form.Item 
              key="seler-account-tyin-inn"
              name="agentTin">
                <Input
                  size="large"
                  placeholder="СТИР" />
              </Form.Item>
                <span className="custom-input-label-1">СТИР</span>
              </Form.Item>
            </Col>
            <Col md={5}>
          
                <Form.Item>
                  <Form.Item 
                key="seler-account-agent-fioe"
                name="agentFio">
                  <Input
                    size="large"
                    placeholder="Масъул шахснинг Ф.И.Ш.и" />
                </Form.Item>
                  <span className="custom-input-label-1">Масъул шахснинг Ф.И.Ш.и</span>
                </Form.Item>
            
            </Col>
          </Row>

         

<Row justify="space-between">
  <Col md={24} >
    <Form.Item>
      <Form.Item 
    key="selenote-field"
    name="note">
      <Input
        size="large"
        placeholder="Қўшимча майдон" />
    </Form.Item>
      <span className="custom-input-label-1">Қўшимча майдон</span>
    </Form.Item>
  </Col>
  
</Row>
</div>
          <div className="factura-data-sheet-container">
            <Row justify="space-around">
              <Col >
                <Button 
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

export default FacturaCreateForm;