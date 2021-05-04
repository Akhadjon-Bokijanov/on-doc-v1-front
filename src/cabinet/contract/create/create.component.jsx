import React, { useState, useEffect } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import Datasheet from 'react-datasheet';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import { Button, Input, Form, Row, Col, DatePicker, Upload, Divider, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './create.style.scss';
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
  PlusOutlined
} from '@ant-design/icons';
import { convertProductsToGrid, FIRST_CONTRACT_GRID_ROW } from '../../../utils/main';
import SelectEditor from '../../../components/data-sheet-custom-selector/custom-selector.component';
import TextArea from 'antd/lib/input/TextArea';

const ConractCreateForm = ({ token, match }) => {

  const [form] = Form.useForm();
  const { contractId } = match.params;
  const [initialData, setInitialData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contractId) {

      //fetch fatura data
      axios({
        url: `/api/v1/contracts/${contractId}`,
        method: "GET",
      }).then(res => {
        let data = res.data;
        data.contractDate = moment(data.contractDate);
        data.created_at = moment(data.created_at);
        data.contractExpireDate = moment(data.contractExpireDate);
        data.updated_at = moment(data.updated_at);
        data.parts = data.contract_parts
        data.contract_partners = data.contract_partners.map(partner=>{
          const { 
            account, 
            address, 
            branchCode, 
            branchName, 
            director, 
            directorTin, 
            fizFio, 
            fizTin, 
            mobilePhone,
            name, 
            oked, 
            tin,
            workPhone,
            physicalTin,
            physicalName
          } = partner;
          return {
            buyerAccount: account, 
            buyerAddress: address, 
            buyerBranch: branchCode, 
            buyerBranchName: branchName, 
            buyerDirector: director, 
            buyerDirectorTin: directorTin, 
            buyerPhysicalFio: fizFio, 
            buyerPhysicalTin: fizTin, 
            buyerMobilePhone: mobilePhone,
            buyerName: name, 
            oked, 
            buyerTin: tin,
          }
        })
        console.log(data);

        setInitialData(data);
        setGrid(convertProductsToGrid(res.data.contract_products, "contract"));
        form.resetFields();
      }).catch(err => {
        console.log(err);
      })
      //end fetch factura data;
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
    FIRST_CONTRACT_GRID_ROW,
    [
      { readOnly: true, value: 1 }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor: SelectEditor }, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor: SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 delivery cost
      { value: '', readOnly: true, }, //8 total
    ],
    [
      { readOnly: true, value: 2 }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor: SelectEditor }, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor: SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 delivery cost
      { value: '', readOnly: true, }, //8 total
    ],
    [
      { readOnly: true, value: 3 }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor: SelectEditor }, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor: SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 delivery cost
      { value: '', readOnly: true, }, //8 total
    ],
    [
      { readOnly: true, value: 4 }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor: SelectEditor }, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor: SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 delivery cost
      { value: '', readOnly: true, }, //8 total
    ],
  ])


  //#region data-sheet methods
  const handleRemoveRow = (rowId) => {
    grid.splice(rowId, 1)
    setGrid([...grid])
  }

  const valueRenderer = cell => cell.value;
  const onCellsChanged = changes => {
    changes.forEach(({ cell, row, col, value }, index) => {
      //this sets changed values
      grid[row][col] = { ...grid[row][col], value };


      //Lets calculate
      grid[row][8].value = grid[row][5].value && grid[row][6].value
        ? parseFloat(grid[row][5].value) * parseFloat(grid[row][6].value)
        + parseFloat(grid[row][7].value ? grid[row][7].value : 0)
        : 0



    });
    setGrid([...grid]);
  };

  const handleAddRow = () => {

    const sampleRow = [
      { readOnly: true, value: grid.length }, //0 ordNo
      { value: "" }, //1 product name
      { value: "", dataEditor: SelectEditor }, //2 catalogCode
      { value: "" }, //3 shrix code
      { value: "", dataEditor: SelectMeasureEditor }, //4 measure
      { value: '' }, //5 amount
      { value: "", }, //6 price
      { value: '' }, //7 delivery cost
      { value: '', readOnly: true, }, //8 total
    ]

    let newgrid = [...grid, sampleRow];

    setGrid(newgrid)
  }

  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;
  //#endregion

  //#region form methods

  const handleSubmit = (values) => {
    console.log(values)
    setIsLoading(true);
    let parts = values.parts.map((part, index) => ({ ...part, ordNo: index + 1 }));
    let partners = values.contract_partners;
    delete values.parts;
    delete values.contract_partners;
    if (contractId) {
      axios({
        url: `/api/v1/contracts/${contractId}`,
        method: 'PATCH',
        data: { contract: values, products: grid, parts: parts, contract_partners: partners }
      }).then(res => {
        console.log(res)
        if (res.data.ok) {
          message.success("Shartnoma yangilandi!");
        } else {
          message.error("Shartnoma yangilashda xatolik!");
        }
        setIsLoading(false);
      }).catch(err => {
        message.error("Shartnoma yangilashda xatolik!");
        console.log(err)
        setIsLoading(false);
      })
    } else {
      axios({
        url: '/api/v1/contracts',
        method: 'post',
        data: { contract: values, products: grid, parts: parts, contract_partners: partners  }
      }).then(res => {
        console.log(res)
        if (res.data.ok) {
          message.success("Yangi shartnoma yaratildi!")
        } else {
          message.error("Shartnoma yaratish xatolik!");
        }
        setIsLoading(false);
      }).catch(err => {
        console.log(err)
        message.error("Shartnoma yaratish xatolik!");
        setIsLoading(false);
      })
    }


  }

  const handleImportExecl = (value) => {

    if (value.file.status == "done") {

      const { response } = value.file

      response.excel.forEach((element, index) => {
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
    <div style={{ padding: 15 }}>
      <Form
        initialValues={initialData}
        form={form}
        name="factura"
        onFinish={handleSubmit}
        scrollToFirstError
        validateMessages={validateMessages}
      >

        <div className="factura-data-sheet-container">
          <h3>Shartnoma</h3>

          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-facutura-no"
                  name="contractName">
                  <Input
                    size="large"
                    placeholder="Nomi" />
                </Form.Item>
                <span className="custom-input-label-1">Nomi</span>
              </Form.Item>
            </Col>

            <Col md={11}>
              <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <Form.Item>
                  <Form.Item
                    key="dyna-form-item-inn-date"
                    name="contractDate"
                    rules={[{ required: true }]}>
                    <DatePicker
                      size="large"
                      placeholder="Tuzilgan sanasi" />
                  </Form.Item>
                  <span className="custom-input-label-1">Tuzilgan sanasi</span>
                </Form.Item>

                <Form.Item>
                  <Form.Item
                    key="dyna-form-item-inn-date-expire"
                    name="contractExpireDate"
                    rules={[{ required: true }]}>
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-date"
                  name="contractPlace">
                  <Input
                    size="large"
                    placeholder="Shartnoma joyi" />
                </Form.Item>
                <span className="custom-input-label-1">Shartnoma joyi</span>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">

          <Row justify="space-between">
            <Col md={11}>
              <SellerForm docType="contract" form={form} />
            </Col>

          <Form.List name="contract_partners">
            {(fields, { add, remove }) => (
              <>
                  {fields.map(field => (
                    <Col sm={11}>
                      <BuyerForm
                        key={field.key}
                        fieldList={field}
                        remove={remove}
                        docType="contract"
                        form={form} />
                    </Col>
                  ))}
                <Form.Item>
                  <Button 
                    size="large" 
                    className="factra-action-btns" 
                    style={{width:'100%'}} 
                    type="dashed" 
                    onClick={() => add()} 
                    icon={<PlusOutlined />}>
                    Kontragent qo'shish
              </Button>
                </Form.Item>
              </>
            )}

          </Form.List>
          </Row>
        </div>
        <div className={`factura-data-sheet-container ${fullView ? 'grid-full-view' : null}`}>
          <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Upload
                headers={{
                  Authorization: "Bearer " + token
                }}
                multiple={false}
                action="http://127.0.0.1:8000/api/v1/factura-products/read-excel"
                accept=".xlsx, .xls"
                onChange={handleImportExecl}>

                <Button style={{ marginRight: 10 }}>Exceldan yuklash</Button>

              </Upload>
              <a target="_blank" href="../../../excels/contract_products.xlsx" download>
                <Button >
                  Shablon yuklash
                </Button>
              </a>
            </div>
            <Button
              type="primary"
              icon={fullView ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={() => toglleFullView(!fullView)}>
              {fullView ? "Kichraytirish" : "Kengaytirish"}
            </Button>
          </div>

          <div style={{ overflowX: 'auto' }} >
            <div style={{ width: '100%' }}>
              <Datasheet
                data={grid}
                valueRenderer={valueRenderer}
                onContextMenu={onContextMenu}
                onCellsChanged={onCellsChanged}
              />
            </div>
          </div>
          <Button
            size="large"
            style={{ marginTop: 20, marginRight: 7, width: 220 }}
            type="primary"
            icon={<FontAwesomeIcon
              style={{ marginRight: 7 }}
              icon={["far", "plus-square"]} />}
            onClick={handleAddRow}>Qo'shish</Button>

          <Button
            size="large"
            style={{ marginTop: 20, width: 220 }}
            danger
            type="primary"
            icon={<FontAwesomeIcon
              style={{ marginRight: 7 }}
              icon={["far", "trash-alt"]} />}
            onClick={() => { if (grid.length > 1) { handleRemoveRow(grid.length - 1) } }}>Oxirgi qatorni o'chirish</Button>
        </div>

        <div className="factura-data-sheet-container">
          <h3>Shartnoma shartlari</h3>
          <Form.List name="parts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Row key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Col sm={24}>
                      <Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, 'title']}
                          fieldKey={[field.fieldKey, 'title']}
                          rules={[{ required: true }]}
                        >
                          <Input
                            className="border-right-square"
                            size="large"
                            placeholder="Shart sarlavhasi"
                            addonAfter={
                              <FontAwesomeIcon
                                icon={["far", "times-circle"]}
                                onClick={() => remove(field.name)} />} />
                        </Form.Item>
                        <span className="custom-input-label-1">Shart sarlavhasi</span>
                      </Form.Item>
                    </Col>
                    <Col sm={24}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'body']}
                        fieldKey={[field.fieldKey, 'body']}
                        rules={[{ required: true }]}
                      >
                        <TextArea rows={4} placeholder="Sharnoma matni" size="large" />
                      </Form.Item>
                    </Col>

                    <Divider />
                  </Row>
                ))}
                <Form.Item>
                  <Button size="large" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Maydon qo'shish
              </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <div className="factura-data-sheet-container">
          <Row justify="space-around">
            <Col >
              <Button
                primary
                htmlType="submit"
                loading={isLoading}
                className="factra-action-btns save-btn"
                size="large"
                icon={<FontAwesomeIcon icon="save" className="factura-action-btn-icons" />}>
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
          name="contractId"
          key="contractId-1"
        >
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken
})

export default connect(mapStateToProps)(ConractCreateForm);