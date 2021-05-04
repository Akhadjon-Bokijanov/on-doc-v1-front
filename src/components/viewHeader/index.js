import React, {useEffect} from 'react'
import st from "./viewHead.module.css";
import {Button} from "antd";
import moment from 'moment'
import {DownloadOutlined,ArrowUpOutlined, PrinterFilled,CheckCircleOutlined ,PlusCircleOutlined,CheckOutlined ,ClockCircleOutlined} from "@ant-design/icons";
import {DateFormat} from "../../utils/DateFormat";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser, selectLoadedKey} from "../../redux/user/user.selector";
import {connect} from "react-redux";
import {SignDoc} from "../../utils/doc-sign";
import {GetEmpowermentDataToSign} from "../../cabinet/models/Empowerment";
import {ConverEmpGridToData} from "../../cabinet/models/EmpowermentProduct";

function ViewHeader({signDoc,data,docTitle,values,loadedKey,user,docId,products,status}) {

    const handleSign=()=>{
        try {
            SignDoc(
                loadedKey.id,
                GetEmpowermentDataToSign(values,ConverEmpGridToData(products),docId),
                signDoc,
                user.tin
            )
        }catch (ex){
            console.log('cat')
        }
    }

    return(
        <>
            <div className={`${st.flexible}`}>{console.log('sts docT',status,' ',signDoc)}
                <div className={`custom-section-wrapper ${st.flexible}`} style={{width:'65%'}}>
                    <div style={{width:'75%'}}>
                        <div>
                            <p className={st.title}>{docTitle}</p>
                            <h4>№ {data?.number} от {DateFormat(data?.contractDate)}</h4>
                        </div>
                        <br/>
                        <div className={st.flexible}>
                            <h4 className={st.number}>Отправитель:</h4>
                            <p style={{width:'55%'}} className={st.desc}>{data?.sender}</p>
                        </div>
                        <div className={st.flexible}>
                            <h4 className={st.number}>Дата:</h4>
                            <p style={{marginLeft:'55px'}}>№{data?.number} от {DateFormat(data?.date)}</p>
                        </div>
                    </div>
                    <div  style={{width:'35%'}}>
                        <p className={st.right_text}>Статус документа в ГНК</p>
                        <div className={`${st.flexible}`} style={{marginTop:'130px'}}>
                            <Button className={st.btns}>
                                <DownloadOutlined />
                                Скачать
                            </Button>
                            <Button className={st.btns}>
                                <PrinterFilled />
                                Печать
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={`custom-section-wrapper`} style={{width:'35%'}}>
                    <div className={st.flexible}>
                        <p className={st.title} style={{width:'55%'}}>Статус: </p>
                        <p className={st.right_text} style={{width:'45%'}}><ArrowUpOutlined />Прикрепить файл</p>
                    </div>

                    {
                        status==10&&
                        <>
                            <p className={st.status_waiting}><ClockCircleOutlined/>ОЖИДАЕТ ВАШЕЙ ПОДПИСИ</p>
                            <div className={st.flexible} style={{marginTop: '100px'}}>
                                <Button className={st.sign} onClick={handleSign}><CheckCircleOutlined/>Подписать</Button>
                                <Button className={st.delete}><PlusCircleOutlined className={`${st.delete_icon} `}/>Удалить</Button>
                            </div>
                        </>
                    }

                    {
                        status==15&&
                            <>
                                <p className={st.status_signed}><CheckOutlined />ПОДПИСАН</p>
                                <div className={st.flexible} style={{marginTop: '100px'}}>
                                    <Button className={st.copy}>Копировать</Button>
                                </div>
                            </>
                    }
                </div>

            </div>
        </>
    )
}

const mapStateToProps=createStructuredSelector({
    user:selectCurrentUser,
    loadedKey:selectLoadedKey
})


export default connect(mapStateToProps)(ViewHeader);