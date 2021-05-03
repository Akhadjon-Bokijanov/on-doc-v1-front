import React, {useContext, useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import axios from "axios";
import {Button, Col, Form, message, Row, Spin, Table} from "antd";
import ReactToPrint from "react-to-print";
import {useTranslation} from "react-i18next";
import st from './view.module.scss'
import moment from "moment";
import {DownloadOutlined,PrinterOutlined} from '@ant-design/icons';
import MeasureViewer from "../../../components/data-sheet-custom-measure-selector/measure-viewer";
import axiosInstance from "../../../sevices/api";
import {empApi} from "../../../sevices/empService";
import GetToken from "../../../sevices/getToken";
import ViewHeader from "../../../components/viewHeader";
import {ConvertEmpDataToForm} from "../../models/EmpowermentProduct";
import {formats} from "../../../utils/main";
import {Link} from "react-router-dom";

const QRCode = require('qrcode.react');
const EmpView = ({ match, user,params }) => {
    // const {token} = useContext(UserContext);
    const {empId} = match.params;
    const { t } = useTranslation();
    const[emp,setEmp]=useState();
    const[products,setProducts]=useState();
    const[headEmp,setHeadEmp]=useState();
    const printRef = useRef();
    const [loading, setLoading] = useState(true)
    const {status}=match.params;
    const [form]=Form.useForm();
    useEffect(()=>{
        const value = form.getFieldsValue();
        console.log('val',status);
        getEmpowerment();
    },[empId,user]);

    const getEmpowerment = () => {
        empApi.getEmp(user?.tin, empId)
            .then(res => {
                console.log("res", res.data.data[0]);
                setEmp(res.data.data[0]);
                setProducts(res.data.data[0].ProductList.Products);
                setHeadEmp({
                    number:res.data.data[0].EmpowermentDoc.EmpowermentNo,
                    contractDate:res.data.data[0].ContractDoc.ContractDate,
                    sender:res.data.data[0].Seller.Name,
                    date:res.data.data[0].EmpowermentDoc.EmpowermentDateOfExpire
                })
                setLoading(false);
            })
    }

    return (
        <>
            <Spin spinning={loading}>
                <ViewHeader status={status} signDoc={'emp'} docTitle={'Empowerment'} data={headEmp} docId={empId} values={emp} products={products}/>
                <div className="custom-section-wrapper">
                    <ReactToPrint
                        trigger={() => <Button>Chop etish</Button>}
                        content={() => printRef.current}
                        documentTitle={`emp-${emp?.EmpowermentId}`}
                    />
                    <Button type="primary">{t("Jonatish")}</Button>
                    <Link to={`/cabinet/empowerment/duplicate/${emp?.EmpowermentId}`}>
                        <Button type="primary">{t("Duplikat")}</Button>
                    </Link>
                    <div className={st.factura_view_page_pdf_container} ref={printRef }>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <div>
                                <div><strong>ID:</strong>{emp?.EmpowermentId}</div>
                            </div>
                            <div style={{width: 300, textAlign:'center'}}>
                                <h4>
                                    {
                                        t("ContractDate dagi EmpowermentNo sonli shartnomaga EmpowermentDateOfIssue dagi",{
                                            ContractDate: moment(emp?.ContractDoc.ContractDate).format('MMMM Do YYYY'),
                                            EmpowermentNo: emp?.EmpowermentDoc.EmpowermentNo,
                                            EmpowermentDateOfIssue: moment(emp?.EmpowermentDoc.EmpowermentDateOfIssue).format('MMMM Do YYYY')
                                        })
                                    }
                                </h4>
                                <h2>Ishonchnoma</h2>
                            </div>
                            <div>
                                <QRCode value={JSON.stringify({ID:emp?.EmpowermentId,Doc:"Empowerment",title:"nma gaaaap"})}/>
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
                                            O'lchov birligi
                                        </th>
                                        <th>
                                            Miqdor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="product-list-body">
                                {
                                    emp?.ProductList.Products.map((item,index)=><tr key={index}>
                                        <td align="center">{item.OrdNo}</td>
                                        <td>{item.Name}</td>
                                        <td>
                                            <MeasureViewer value={item.MeasureId}/>
                                        </td>
                                        <td>{item.Count}</td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <div style={{marginTop: 30, display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <table>
                                    <tr>
                                        <td><strong>Raxbar: </strong></td>
                                        <td>{emp?.Seller.Director}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <td><strong>Raxbar: </strong></td>
                                        <td>{emp?.Buyer.Name}</td>
                                    </tr>
                                </table>
                            </div>
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
