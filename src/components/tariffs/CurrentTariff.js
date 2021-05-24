import React, {useState} from "react";
import {Button, Col, Modal, Row} from "antd";
import st from "./tariff.module.scss";
import date from '../../assests/tariff/date.png'
import error from '../../assests/tariff/error.png'
import success from '../../assests/tariff/success.png'

function CurrentTariff({match}) {
    const [successModal,setSuccessModal]=useState(false);
    const [errorModal,setErrorModal]=useState(false);
    const handleErrorModal=()=>setErrorModal(!errorModal);
    const handleSuccessModal=()=>setSuccessModal(!successModal)
    return(
        <>
            <div>
                <Row gitter={[16,16]}>
                    <Col md={7}>


                        <Modal visible={successModal}
                               onCancel={handleSuccessModal}
                               footer={[
                                   <Button onClick={handleSuccessModal} className={st.activating_btn}><p>Вернуться на гланую</p></Button>
                               ]}
                            className={st.modall}>
                            <div>
                                <img src={success} style={{marginLeft:'44%',marginBottom:'27px'}} alt=""/>
                                <p className={st.main_title} style={{marginLeft:'23%'}}>Тариф активирован</p>
                                <div className="flexible">
                                    <div className={'flexible w50'} style={{marginLeft:'15px'}}>
                                        <img src={date} className={st.icons} alt=""/>
                                        <div>
                                            <p className={st.count_and_time}>Дата окончания:</p>
                                            <p className={st.count_and_time_values}>Не активна</p>
                                        </div>
                                    </div>
                                    <div className={'flexible w50'}>
                                        <img src={date} className={st.icons} alt=""/>
                                        <div>
                                            <p className={st.count_and_time}>Дата окончания:</p>
                                            <p className={st.count_and_time_values}>Не активна</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                    </Col>
                </Row>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>
                    <Col md={7} style={{marginLeft:'25px',marginBottom:'-10px',marginTop:'23px'}}><h1>CurrentTariff</h1></Col>
                </Row>
                <div className={`${st.main_block}`}>
                    <div className={'w50'}>
                        <p className={st.main_title}>На данный момент, у Вашей компании активен другой пакет</p>
                        <div className={'flexible'}>
                            <img src={date} className={st.icons} alt=""/>
                            <div>
                                <p className={st.count_and_time}>Количество</p>
                                <p className={st.count_and_time_values}>2500 шт</p>
                            </div>
                        </div>
                        <div className={'flexible'}>
                            <img src={date} className={st.icons} alt=""/>
                            <div>
                                <p className={st.count_and_time}>Время активности</p>
                                <p className={st.count_and_time_values}>1 Месяц</p>
                            </div>
                        </div>
                        <div className={'flexible'}>
                            <img src={date} className={st.icons} alt=""/>
                            <div>
                                <p className={st.count_and_time}>Количество использований</p>
                                <p className={st.count_and_time_values}>0</p>
                            </div>
                        </div>
                        <div className={'flexible'}>
                            <img src={date} className={st.icons} alt=""/>
                            <div>
                                <p className={st.count_and_time}>Количество остатка:</p>
                                <p className={st.count_and_time_values}>5</p>
                            </div>
                        </div>
                    </div>


                    <div className={'w50'}>
                        <p className={st.main_title} style={{marginLeft:"2%"}}>Активировать этот тариф</p>
                        <div style={{marginLeft:'15px'}}>
                            <div className="flexible">
                                <div className={'flexible w50'}>
                                    <img src={date} className={st.icons} alt=""/>
                                    <div>
                                        <p className={st.count_and_time}>Бесплатно:</p>
                                        <p className={st.count_and_time_values}>5 документов</p>
                                    </div>
                                </div>
                                <div className={'flexible w50'}>
                                    <img src={date} className={st.icons} alt=""/>
                                    <div>
                                        <p className={st.count_and_time}>Дата активации:</p>
                                        <p className={st.count_and_time_values}>Не активна</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flexible">
                                <div className={'flexible w50'}>
                                    <img src={date} className={st.icons} alt=""/>
                                    <div>
                                        <p className={st.count_and_time}>Цена:</p>
                                        <p className={st.name} style={{color:'#2B63C0'}}>2 000 000 сум</p>
                                    </div>
                                </div>
                                <div className={'flexible w50'}>
                                    <img src={date} className={st.icons} alt=""/>
                                    <div>
                                        <p className={st.count_and_time}>Дата окончания:</p>
                                        <p className={st.count_and_time_values}>Не активна</p>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleSuccessModal} className={st.activating_btn}><p>Активировать тариф</p></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CurrentTariff