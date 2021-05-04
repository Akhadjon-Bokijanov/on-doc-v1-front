import { Button, Spin } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import moment from 'moment';
import { measures } from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import ViewHeader from "../../../components/viewHeader";

var QRCode = require('qrcode.react');

const ActView = ({ match, user }) => {

    const {actId,status} = match.params;
    const [act, setAct] = useState();
    const[products,setProducts]=useState();
    const [headAct,setHeadAct] = useState();
    const [loading, setLoading] = useState(true)
    const printRef = useRef();
    const { t } = useTranslation();

    useEffect(()=>{
        axios({
            url: `act/view?ActId=${actId}&tin=${user.tin ?? user.username}`
        }).then(res=>{
            if (res.data.success) {
                setAct(res.data.data[0]);
                setProducts(res.data.data[0].ProductList.Products);
                setHeadAct({
                    number:res.data.data[0].ActDoc.ActNo,
                    contractDate:res.data.data[0].ContractDoc.ContractDate,
                    sender:res.data.data[0].Seller?.Name,
                    date:res.data.data[0].ActDoc.ActDate
                })
            }
            setLoading(false)
        })
    }, [])

    const handleSign = ()=>{

    }

    return (
        <div>
            <Spin spinning={loading}>
                <ViewHeader data={headAct} status={status} signDoc={'act'} docId={actId} docTitle={'Akt'} products={products} values={act}/>
                <div className="custom-section-wrapper">
                    <ReactToPrint
                        trigger={() => <Button>{t("Chop etish")}</Button>}
                        content={() => printRef.current}
                        documentTitle={`act-${act?.FacturaId}`}
                    />
                    <Button type="primary" onClick={handleSign}>{t("Jonatish")}</Button>
                    <Link to={`/cabinet/act/duplicate/${act?.ActId}`}>
                        <Button type="primary">{t("Duplikat")}</Button>
                    </Link>
                    <div className="factura-view-page-pdf-container" ref={printRef} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div><strong>ID:</strong> {act?.ActId}</div>
                            </div>
                            <div style={{ width: 300, textAlign: 'center' }}>
                                <h4>
                                    {t("ContractDate dagi ContractNo sonli shartnomaga FacturaDate dagi FacturaNo sonli", {
                                        FacturaDate: moment(act?.ActDoc.ActDate).format('MMMM Do YYYY'),
                                        FacturaNo: act?.ActDoc.ActNo,
                                        ContractDate: moment(act?.ContractDoc.ContractDate).format('MMMM Do YYYY'),
                                        ContractNo: act?.ContractDoc.ContractNo
                                    })}
                                </h4>
                                <h2 style={{ textTransform: "uppercase", fontWeight: "bold" }}>{t("Akt")}</h2>
                                
                            </div>
                            <div>
                                <QRCode
                                    value={JSON.stringify({ ID: act?.Actid, Doc: "Akt" })}
                                />
                            </div>
                        </div>
                        <div>
                            <p align="justify">
                                {act?.ActDoc.ActText}
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <table cellPadding={10}>
                                    <tr>
                                        <td>
                                            <strong>Yetkazib beruvchi:</strong>
                                        </td>
                                        <td>
                                            {act?.SellerName}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <strong>STIR:</strong>
                                        </td>
                                        <td>
                                            {act?.SellerTin}
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
                                            {act?.BuyerName}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <strong>STIR:</strong>
                                        </td>
                                        <td>
                                            {act?.BuyerTin}
                                        </td>
                                    </tr>
                                    
                                </table>
                            </div>
                        </div>

                        <div style={{ marginTop: 40 }}>
                            <table cellPadding={10} className="product-table">
                                <thead style={{ fontSize: 10, textAlign: 'center' }} className="product-table-head">
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
                                            Miqdori
                                </th>
                                        <th>
                                            Narxi
                                </th>
                                        <th>
                                            Umumiy summa
                                </th>
                                    </tr>
                                </thead>

                                <tbody className="product-list-body">
                                    {
                                        act?.ProductList?.Products.map(p => <tr>
                                            <td align="center">{p.OrdNo}</td>
                                            <td>{p.Name}</td>
                                            <td>{measures[p.MeasureId]?.label}</td>
                                            <td align="right">{p.Count}</td>
                                            <td align="right">{p.Summa}</td>
                                            <td align="right">{p.TotalSum}</td>
                                        </tr>)
                                    }
                                </tbody>

                            </table>
                        </div>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <table>
                                    <tr>
                                        <td><strong>Raxbar: </strong></td>
                                        <td>{act?.SellerName}</td>
                                    </tr>
                                    
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <td><strong>Raxbar: </strong></td>
                                        <td>{act?.BuyerName}</td>
                                    </tr>
                                   
                                </table>
                            </div>
                        </div>

                    </div>

                </div>

            </Spin>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(ActView)
