import React, {useContext, useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import axios from "axios";
import {Button, message, Spin, Table} from "antd";
import ReactToPrint from "react-to-print";
import {useTranslation} from "react-i18next";
import st from './view.module.scss'
import moment from "moment";

const QRCode = require('qrcode.react');
const EmpView = ({ match, user }) => {
    // const {token} = useContext(UserContext);
    const {empId} = match.params;
    const { t } = useTranslation();
    const[emp,setEmp]=useState();
    const printRef = useRef();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getEmpoverment();
    },[empId,user]);

    const getEmpoverment = () =>{
        axios({
            url: `emp/view/?tin=${user.tin}&EmpId=${empId}`,
            method: "GET",
        }).then(res=>{
            console.log("empRes",res.data.data[0])
            setEmp(res.data.data[0]);
            setLoading(false)
        }).catch(err=>{
            message.error("Error status 400 or 401")
            setLoading(false)
        })
    }

    return (
        <>
            <Spin spinning={loading}>
                <div className="custom-section-wrapper">
                    <ReactToPrint
                        trigger={() => <Button>Chop etish</Button>}
                        content={() => printRef.current}
                        documentTitle={`emp-${emp?.empId}`}
                    />
                    <Button type="primary">{t("Jonatish")}</Button>
                    <div className={st.factura_view_page_pdf_container}>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <div>
                                <div><strong>ID:</strong>{emp?.EmpowermentId}</div>
                                {
                                    // OldEmp?
                                }
                            </div>
                            <div style={{width: 300, textAlign:'center'}}>
                                <h4>
                                    {
                                        t("hi",{
                                            ContractDate: moment(emp?.ContractDoc.ContractDate).format('MMMM Do YYYY'),
                                            EmpowermentNo: emp?.EmpowermentDoc.EmpowermentNo,
                                            EmpowermentDateOfIssue: moment(emp?.EmpowermentDoc.EmpowermentDateOfIssue).format('MMMM Do YYYY')
                                        })
                                    }
                                </h4>
                            </div>
                            <div>
                                <QRCode value={JSON.stringify({ID:emp?.EmpowermentId,Doc:"Empowerment"})}/>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <table cellPadding={10}>
                                    <tr>
                                        <td>
                                            <strong>yetkazib beruvchi:</strong>
                                        </td>
                                        <td>
                                            {emp?.Seller.Name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Manzil::</strong>
                                        </td>
                                        <td>
                                            {emp?.Seller.Address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>STIR:</strong>
                                        </td>
                                        <td>
                                            {emp?.SellerTin}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <table cellPadding={10}>
                                    <tr>
                                        <td>
                                            <strong>Oluvchi beruvchi:</strong>
                                        </td>
                                        <td>
                                            {emp?.Buyer.Name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Manzil:</strong>
                                        </td>
                                        <td>
                                            {emp?.Buyer.Address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>STIR:</strong>
                                        </td>
                                        <td>
                                            {emp?.BuyerTin}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                        <div style={{ marginTop: 40 }}>
                            <table cellPadding={10} className="product-table">
                                <thead  style={{fontSize: 10, textAlign: 'center'}} className="product-table-head">
                                    <tr>
                                        <th>
                                            №
                                        </th>
                                        <th>
                                            Tovar/xizmat nomi
                                        </th>
                                        <th>
                                            Tovar/xizmatlar yagona elektron milliy katalog identifikatsiya kodi
                                        </th>
                                        <th>
                                            O'lchov birligi
                                        </th>
                                        <th>
                                            Miqdori
                                        </th>
                                        <th>
                                            Narxi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="product-list-body">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Spin>
            </>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(EmpView)
