import React, { useState, useEffect } from 'react';
import 'react-datasheet/lib/react-datasheet.css';
import { Button, Input, Form, Row, Col, DatePicker, message, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import BuyerForm from '../../common/buyer-form.component';
import SellerForm from '../../common/seller-form.component';
import { connect } from 'react-redux';
import { selectCurrentUser, selectToken } from '../../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import PersonFetch from '../../common/person-fetch/person-fetch.component';


const TTYForm = ({ match }) => {

  const [form] = Form.useForm();
  const { ttyId } = match.params;
  const [initialData, setInitialData] = useState()
  const [isLoading, setIsloading] = useState(false);



  useEffect(() => {
    if (ttyId) {

      //fetch fatura data
      axios({
        url: `/api/v1/ttys/${ttyId}`,
        method: "GET",
      }).then(res => {
        let data = res.data;
        data.contractDate = moment(data.contractDate);
        data.created_at = moment(data.created_at);
        data.wayBillDate = moment(data.wayBillDate);
        data.tripTicketDate = moment(data.tripTicketDate);
        data.updated_at = moment(data.updated_at);
        console.log(data);

        setInitialData(res.data);
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

  //#region form methods

  const handleSubmit = (values) => {
    setIsloading(true);
    console.log(values)
    if (ttyId) {
      axios({
        url: `/api/v1/ttys/${ttyId}`,
        method: 'PATCH',
        data: { tty: values }
      }).then(res => {
        setIsloading(false);
        message.success("TTY yangilandi!");
        console.log(res)
      }).catch(err => {
        setIsloading(false)
        message.error("TTY yangilashda xatolik!");
        console.log(err)
      })
    } else {
      axios({
        url: '/api/v1/ttys',
        method: 'post',
        data: { tty: values }
      }).then(res => {
        setIsloading(false)
        message.success("TTY yaratildi!");
        console.log(res)
      }).catch(err => {
        setIsloading(false)
        message.error("TTY yaratishda xatolik!");
        console.log(err)
      })
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
          <h3>TTY yaratish</h3>

          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-facutura-no"
                  name="wayBillNo">
                  <Input
                    size="large"
                    placeholder="TTY raqami" />
                </Form.Item>
                <span className="custom-input-label-1">TTY raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  key="dyna-form-item-inn-date"
                  name="wayBillDate"
                  rules={[{ required: true }]}>
                  <DatePicker
                    size="large"
                    placeholder="TTY sanasi" />
                </Form.Item>
                <span className="custom-input-label-1">TTY sanasi</span>
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item
                name="deliveryType"
                key="deliveryType"
                initialValue={1}
              >
                <Radio.Group style={{ width: '100%' }} options={[
                  { label: "Omborxonadan omborxonaga", value: 1 },
                  { label: "Sotuvchidan xaridorgacha", value: 2 }
                ]}
                  optionType="button"
                />

              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="factura-data-sheet-container">
          <Row justify="space-between">
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
                  name="contractDate">
                  <DatePicker
                    size="large"
                    placeholder="Shartnoma sanasi" />
                </Form.Item>
                <span className="custom-input-label-1">Shartnoma sanasi</span>
              </Form.Item>
            </Col>

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-n0-TripTicketNo"
                  name="tripTicketNo">
                  <Input
                    size="large"
                    placeholder="Shartnoma raqami" />
                </Form.Item>
                <span className="custom-input-label-1">Yo'l varaqasi raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  key="dyna-form-item-contract-date-TripTicketDate"
                  name="tripTicketDate">
                  <DatePicker
                    size="large"
                    placeholder="Shartnoma sanasi" />
                </Form.Item>
                <span className="custom-input-label-1">Yo'l varaqasi sanasi</span>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">

          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="truckRegNo"
                  key="truckRegNo"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Avtomobil davlat raqami" />
                </Form.Item>
                <span className="custom-input-label-1">Avtomobil davlat raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="truckModel"
                  key="truckModel"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Avtomobil turi" />
                </Form.Item>
                <span className="custom-input-label-1">Avtomobil turi</span>
              </Form.Item>
            </Col>

            <Col md={24}>
              <Form.Item
                name="trailerType"
                key="trailerType"
                initialValue={1}
              >
                <Radio.Group style={{ width: '100%' }} options={[
                  { label: "Tirkama", value: 1 },
                  { label: "Yarim tirkama", value: 2 }
                ]}
                  optionType="button"
                />
              </Form.Item>
            </Col>

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="trailerRegNo"
                  key="TrailerRegNo"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Tirkama davlat raqami" />
                </Form.Item>
                <span className="custom-input-label-1">Tirkama davlat raqami</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="trailerModel"
                  key="TrailerRegNoType"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Tirkama turi" />
                </Form.Item>
                <span className="custom-input-label-1">Tirkama turi</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="driverFio"
                  key="DriverFio"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Haydovchi FIO" />
                </Form.Item>
                <span className="custom-input-label-1">Haydovchi FIO</span>
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
              <BuyerForm form={form} docType="act" />
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">

          <Row justify="space-between">
            <Col md={11}>
              <PersonFetch
                form={form}
                pName="carrierName"
                pTin="carrierTin"
                nameLabel="Tashuvchi FIO"
                tinLabel="Tashunchi STIR" />
            </Col>

            <Col md={11}>
              <PersonFetch
                form={form}
                pName="customerName"
                pTin="customerTin"
                nameLabel="Buyurtmachi FIO"
                tinLabel="Buyurtmachi STIR" />
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="pointOfLoading"
                  key="PointOfLoading"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Yuklash manzili</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="pointOfUnloading"
                  key="pointOfUnloading"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Tushirish mazili</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="pointOfRedirectName"
                  key="pointOfRedirectName"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Boshqa manzil nomi</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="pointOfRedirectAddress"
                  key="pointOfRedirectAddress"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Boshqa manzil manzili</span>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="factura-data-sheet-container">
          <Row justify="space-between">

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="giverFio"
                  key="giverFio"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Topshirdi</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="tekerFio"
                  key="tekerFio"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Qabul qildi</span>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="giverDriverFio"
                  key="giverDriverFio"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Topshiruvchi haydovchi FIO</span>
              </Form.Item>
            </Col>

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="takerDriverFio"
                  key="takerDriverFio"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Qabulqiluvchi haydovchi FIO</span>
              </Form.Item>
            </Col>


            <Col md={24} >
              <Form.Item>
                <Form.Item
                  key="selenote-field"
                  name="specialNotes">
                  <Input
                    size="large"
                    placeholder="Қўшимча майдон" />
                </Form.Item>
                <span className="custom-input-label-1">Қўшимча майдон</span>
              </Form.Item>
            </Col>

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="deliveryDistance"
                  key="deliveryDistance"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Tashish orligi</span>
              </Form.Item>
            </Col>

            <Col md={11}>
              <Form.Item>
                <Form.Item
                  name="deliveryDistanceInCity"
                  key="deliveryDistanceInCity"
                >
                  <Input size="large" />
                </Form.Item>
                <span className="custom-input-label-1">Tashish orqliq (Shaharda)</span>
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

      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser
})

export default connect(mapStateToProps)(TTYForm);