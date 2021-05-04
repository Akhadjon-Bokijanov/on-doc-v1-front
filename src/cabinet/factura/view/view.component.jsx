import React, { useState, useEffect, useRef } from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectLoadedKey } from '../../../redux/user/user.selector';
import axios from 'axios';
import { Button, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import './view.style.scss';
import ReactToPrint from "react-to-print";
import moment from 'moment';
import { measures } from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import { EIMZOClient } from '../../../utils/e-imzo';
import { Link } from 'react-router-dom';
import ViewHeader from "../../../components/viewHeader";

var QRCode = require('qrcode.react');

const FacturaView = ({ match, user, loadedKey }) => {

    const printRef = useRef();
    const [factura, setFactura] = useState();
    const [headFactura,setHeadFactura] = useState();
    const [loading, setLoading] = useState(true);
    const [products,setProducts] = useState();
    const {facturaId,status} = match.params;
    const { t } = useTranslation();

    useEffect(()=>{
        setLoading(false)
        axios({
            url: `facturas/view?FacturaId=${facturaId}&tin=${user.tin ?? user.username}`,
            method: "get"
        }).then(res => {
            if(res.data.success){
                setFactura(res.data.data[0])
                setProducts(res.data.data[0].ProductList.Products)
                setHeadFactura({
                    number:res.data.data[0].FacturaDoc.FacturaNo,
                    contractDate:res.data.data[0].ContractDoc.ContractDate,
                    sender:res.data.data[0].Seller.Name,
                    date:res.data.data[0].FacturaDoc.FacturaDate
                })
                console.log(res.data.data[0])
            }
            setLoading(false)
        }).catch(ex=>{
            console.log(ex);
            setLoading(false)
        })
    },[facturaId, user])
   

    const handleSign = ()=>{
        EIMZOClient.createPkcs7(loadedKey.id,
            JSON.stringify(factura),
            null,
            pkcs7=>{
                axios({
                    url: `facturas/send?tin=${user.tin??user.username}`,
                    method: "post",
                    data: {
                        Sign: pkcs7
                    }
                }).then(res=>{
                    console.log(res)
                }).catch(ex=>{
                    console.log(ex)
                })
            },
            (e, r)=>{
                message.error(r)
            }
            )
    }


    return (
        <Spin spinning={loading}>
            <ViewHeader status={status} signDoc={'factura'} docTitle={'Factura'} data={headFactura} values={factura} docId={facturaId} products={products}/>
            <div className="custom-section-wrapper">
                <ReactToPrint
                    trigger={() => <Button>{t("Chop etish")}</Button>}
                    content={() => printRef.current}
                    documentTitle={`factura-${factura?.FacturaId}`}
                />
                <Button type="primary" onClick={handleSign}>{t("Jonatish")}</Button>
                <Link to={`/cabinet/factura/duplicate/${factura?.FacturaId}`}>
                    <Button type="primary">{t("Duplikat")}</Button>
                </Link>
            <div className="factura-view-page-pdf-container" ref={printRef } >
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <div>
                            <div><strong>ID:</strong> {factura?.FacturaId}</div>
                        {
                                factura?.OldFacturaDoc.OldFacturaId ?
                                <div>
                                    <strong>Eski faktura</strong>
                                        <div><strong>ID:</strong> {factura?.OldFacturaDoc.OldFacturaId}</div>
                                        <div><strong>№:</strong> {factura?.OldFacturaDoc.OldFacturaNo}</div>
                                        <div><strong>Sana:</strong>{moment(factura?.OldFacturaDoc.OldFacturaDate).format("MMMM Do YYYY")}</div>
                                </div>
                                :""
                        }
                    </div>
                    <div style={{width: 300, textAlign:'center'}}>
                        <h4>
                            {t("ContractDate dagi ContractNo sonli shartnomaga FacturaDate dagi FacturaNo sonli", {
                                FacturaDate: moment(factura?.FacturaDoc.FacturaDate).format('MMMM Do YYYY'),
                                FacturaNo: factura?.FacturaDoc.FacturaNo,
                                ContractDate: moment(factura?.ContractDoc.ContractDate).format('MMMM Do YYYY'),
                                ContractNo: factura?.ContractDoc.ContractNo
                                })}
                            </h4>
                            <h2 style={{textTransform: "uppercase", fontWeight: "bold"}}>{t("Faktura")}</h2>
                    </div>
                    <div>
                        <QRCode
                            value={JSON.stringify({ ID: factura?.FacturaId, Doc: "Faktura"})}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <table cellPadding={10}>
                                <tr>
                                    <td>
                                        <strong>Yetkazib beruvchi:</strong>
                                    </td>
                                    <td>
                                        {factura?.Seller.Name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Manzil:</strong>
                                    </td>
                                    <td>
                                        {factura?.Seller.Address}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>STIR:</strong>
                                    </td>
                                    <td>
                                        {factura?.SellerTin}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>QQS royhatdan o'tish kodi:</strong>
                                    </td>
                                    <td>
                                        {factura?.Seller.VatRegCode}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Bank hisobvarg'i:</strong>
                                    </td>
                                    <td>
                                        {factura?.Seller.Account}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>MFO:</strong>
                                    </td>
                                    <td>
                                        {factura?.Seller.BankId}
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
                                        {factura?.Buyer.Name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Manzil:</strong>
                                    </td>
                                    <td>
                                        {factura?.Buyer.Address}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>STIR:</strong>
                                    </td>
                                    <td>
                                        {factura?.BuyerTin}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>QQS royhatdan o'tish kodi:</strong>
                                    </td>
                                    <td>
                                        {factura?.Buyer.VatRegCode}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Bank hisobvarg'i:</strong>
                                    </td>
                                    <td>
                                        {factura?.Buyer.Account}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>MFO:</strong>
                                    </td>
                                    <td>
                                        {factura?.Buyer.BankId}
                                    </td>
                                </tr>
                            </table>
                    </div>
                </div>

                <div style={{ marginTop: 40 }}>
                    <table cellPadding={10} className="product-table">
                        <thead style={{fontSize: 10, textAlign: 'center'}} className="product-table-head">
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
                                {
                                    factura?.ProductList?.HasExcise ?
                                        <th>
                                                Aksiz soliq (%)
                                        </th>
                                :null
                                }
                                {factura?.ProductList?.HasExcise ? <th>
                                    Aksiz soliq, miqdori
                                </th>: null}
                                <th>
                                    Yetkazib berish narxi
                                </th>
                                {factura?.ProductList?.HasVat? <th>
                                    QQS (%)
                                </th> : null}
                                {factura?.ProductList?.HasVat ? <th>
                                    QQS, miqdori
                                </th>:null}
                                <th>
                                    Umumiy summa
                                </th>
                            </tr>
                        </thead>

                        <tbody className="product-list-body">
                            {
                                factura?.ProductList?.Products.map(p=><tr>
                                    <td align="center">{p.OrdNo}</td>
                                    <td>{p.Name}</td>
                                    <td>{p.CatalogCode} - {p.CatalogName}</td>
                                    <td>{measures[p.MeasureId]?.label}</td>
                                    <td align="right">{p.Count}</td>
                                    <td align="right">{p.BaseSumma}</td>
                                    <td align="right">{p.ExciseRate}</td>
                                    <td align="right">{p.ExciseSum}</td>
                                    <td align="right">{p.DeliverySum}</td>
                                    <td align="right">{p.VatRate}</td>
                                    <td align="right">{p.VatSum}</td>
                                    <td align="right">{p.DeliverySumWithVat}</td>
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
                                <td>{factura?.Seller.Director}</td>
                            </tr>
                            <tr>
                                <td><strong>Bosh buxgalter: </strong></td>
                                <td>{factura?.Seller.Accountant}</td>
                            </tr>
                        </table>
                    </div>
                        <div>
                            <table>
                                <tr>
                                    <td><strong>Raxbar: </strong></td>
                                    <td>{factura?.Buyer.Director}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bosh buxgalter: </strong></td>
                                    <td>{factura?.Buyer.Accountant}</td>
                                </tr>
                            </table>
                        </div>
                </div>
               
            </div>

        </div>
        </Spin>
    )
}


const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    loadedKey: selectLoadedKey
})

export default connect(mapStateToProps)(FacturaView)
