import React, { useState, useEffect } from 'react'
import Datasheet from 'react-datasheet';
import { useTranslation } from 'react-i18next';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import SelectEditor from '../../../components/data-sheet-custom-selector/custom-selector.component';
import { convertProductsToGrid } from '../../../utils/main';
import {
    FullscreenOutlined,
    FullscreenExitOutlined,
} from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setUserProducts } from '../../../redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectToken } from '../../../redux/user/user.selector';
import { connect } from 'react-redux';
import axios from 'axios';
import MeasureViewer from '../../../components/data-sheet-custom-measure-selector/measure-viewer';
import download from "../../../images/download.svg";
import delete_icon from "../../../images/delete-icon.svg";
import add_icon from "../../../images/add-icon.svg";

export const ProductValueRendered = prop => {

    const { value } = prop;
    return <span>{value.CatalogName}</span>
}

const FacturaProductGrid = ({ token, loadProducts, user, getProducts, initialValues }) => {

    useEffect(()=>{
        if(Array.isArray(initialValues)){
            setGrid([
                grid[0],
                ...initialValues
            ])
        }
    }, [initialValues])

    useEffect(()=>{
        axios({
            url: `classifications/index?tin=${user.tin??user.username}`,
            method: 'get'
        }).then(res=>{
            loadProducts(res.data.data)
        }).catch(ex=>{
            console.log(ex);
        })
    }, [])

    
    

    const { t } = useTranslation();

    const [fullView, toglleFullView] = useState(false)
    const [totalSumm, setTotalSumm] = useState(0);
    const [grid, setGrid] = useState([
        [
            { readOnly: true, value: '', width: 50 },
            { value: t('Tovar/xizmat nomi'), readOnly: true, width: 200 },
            { value: t('Tovar/xizmatlar yagona elektron milliy katalog identifikatsiya kodi'), readOnly: true, width: 150 },
            { value: t('Tovar/xizmat shtrix kodi'), readOnly: true, width: 100 },
            { value: t("O'lchov birligi"), readOnly: true, width: 100 },
            { value: t("Miqdori"), readOnly: true, width: 100 },
            { value: t("Narxi"), readOnly: true, width: 100 },
            { value: t("Aksiz soliq (%)"), readOnly: true, width: 100 },
            { value: t("Aksiz soliq, miqdori"), readOnly: true, width: 100 },
            { value: t("Yetkazib berish narxi"), readOnly: true, width: 100 },
            { value: t("QQS (%)"), readOnly: true, width: 100 },
            { value: t("QQS, miqdori"), readOnly: true, width: 100 },
            { value: t("Umumiy summa"), readOnly: true, width: 150 },
        ],
        [
            { readOnly: true, value: 1 },                           //0 ordNo
            { value: "" },                                          //1 product name
            { value: "", dataEditor: SelectEditor, valueViewer: ProductValueRendered },                //2 catalogCode
            { value: "" },                                          //3 shrix code
            { value: "", dataEditor: SelectMeasureEditor, valueViewer: MeasureViewer },        //4 measure
            { value: '' },                                          //5 amount
            { value: "", },                                         //6 price
            { value: '' },                                          //7 aksiz rate
            { value: '', readOnly: true },                          //8 aksiz amount
            { value: '' },                                          //9 delivery cost
            { value: "" },                                          //10 VAT rate
            { value: '', readOnly: true },                          //11 VAT amount
            { value: '', readOnly: true, },                          //12 total
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

    const handleRemoveRow = (rowId) => {
        console.log(rowId)
        
        grid.splice(rowId, 1)
        setGrid([...grid])
        getProducts([...grid])

    }


    const handleImportExecl = (value) => {

        
        if (value.file.status == "done") {

            const { response } = value.file

            // response.excel.forEach((element, index) => {
            //     element[0].value = index + 1;
            //     element[0].readOnly = true;
            //     element[2].dataEditor = SelectEditor;
            //     element[4].dataEditor = SelectMeasureEditor;
            // })

            //setGrid([grid[0], ...response.excel])
            let collector=[];
            if(response.success){
                response.data.forEach((row, index)=>{
                    const { 
                        CatalogCode,
                        ProductCount,
                        ProductDeliverySum,
                        ProductDeliverySumWithVat,
                        ProductFuelRate,
                        ProductFuelSum,
                        ProductMeasureId,
                        ProductName, 
                        ProductSumma,
                        ProductVatRate,
                        ProductVatSum
                    } = row;
                    collector.push(
                        [
                            { readOnly: true, value: index+1 },                           //0 ordNo
                            { value: ProductName },                                          //1 product name
                            { value: {CatalogName: "Hi", CatalogCode}, dataEditor: SelectEditor, valueViewer: ProductValueRendered },                //2 catalogCode
                            { value: "" },                                          //3 shrix code
                            { value: ProductMeasureId, dataEditor: SelectMeasureEditor, valueViewer: MeasureViewer },        //4 measure
                            { value: ProductCount },                                          //5 amount
                            { value: ProductSumma},                                         //6 price
                            { value: ProductFuelRate },                                          //7 aksiz rate
                            { value: ProductFuelSum, readOnly: true },                          //8 aksiz amount
                            { value: ProductDeliverySum },                                          //9 delivery cost
                            { value: ProductVatRate },                                          //10 VAT rate
                            { value: ProductVatSum, readOnly: true },                          //11 VAT amount
                            { value: ProductDeliverySumWithVat, readOnly: true, },                          //12 total
                        ]
                    )
                })
            }
            setGrid([grid[0], ...collector]);
            
        }
    }


    const valueRenderer = cell => cell.value;
    const onCellsChanged = changes => {
        changes.forEach(({ cell, row, col, value }, index) => {
            //this sets changed values
            grid[row][col] = { ...grid[row][col], value };

            //Lets calculate
            let priceamount = parseFloat(grid[row][5].value) * parseFloat(grid[row][6].value);
            let aksizamount = parseFloat(priceamount * grid[row][7].value / 100);

            grid[row][8] = { value: isNaN(aksizamount) ? 0: parseFloat(aksizamount), readOnly: true };

            let vatamout = parseFloat(priceamount * parseFloat(grid[row][10].value) / 100);

            grid[row][11] = { value: isNaN(vatamout)?0:vatamout, readOnly: true }

            let total = !isNaN(priceamount) ? priceamount : 0
            isNaN(aksizamount) ? total = total : total += aksizamount;
            isNaN(vatamout) ? total= total + 0 : total += vatamout;
            isNaN(grid[row][9].value) ? total =  total + 0 : total += +grid[row][9].value

            grid[row][12] = { value: total, readOnly: true }


        });
        setGrid([...grid]);

        grid.shift()
        getProducts(grid)
    };

   

    const handleAddRow = () => {

        const sampleRow = [
            { readOnly: true, value: grid.length }, //0 ordNo
            { value: "" }, //1 product name
            { value: "", dataEditor: SelectEditor, valueViewer: ProductValueRendered }, //2 catalogCode
            { value: "" }, //3 shrix code
            { value: "", dataEditor: SelectMeasureEditor }, //4 measure
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


    return (
        <div className={`factura-data-sheet-container ${fullView ? 'grid-full-view' : null}`}>
            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <Upload
                        headers={{
                            Authorization: "Bearer " + token
                        }}  
                        multiple={false}
                        action={`http://api.onlinefactura.uz/uz/facturas/import-excel`}
                        accept=".xlsx, .xls"
                        name="Files[file]"
                        data={{tin: user.tin}}
                        onChange={handleImportExecl}>
                        <span style={{ cursor: 'pointer',marginRight: 10 }}>
                            <img src={download} alt="download" style={{ marginRight: 9 }} />
                            {t("Exceldan yuklash")}
                        </span>

                    </Upload>
                    <a style={{ color: '#303030', marginLeft: 28 }} target="_blank" href="../../../excels/factura_products.xlsx" download>
                        <span >
                            <img src={download} alt="download" style={{marginRight: 9}}/>
                            {t("Shablonni yuklash")}
                        </span>
                    </a>
                </div>
                {/* <Button
                    type="primary"
                    icon={fullView ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                    onClick={() => toglleFullView(!fullView)}>
                    {fullView ? t("Kichraytirish") : t("Kengaytirish")}
                </Button> */}
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
            <div style={{marginTop: 16, display: 'flex', justifyContent: 'space-between'}}>
                <h3>{t("Total")}: {totalSumm}</h3>
                <div>
                    <span  
                        onClick={() => { if (grid.length > 1) { handleRemoveRow(grid.length - 1) } }}
                        style={{ color: '#2B63C0', fontSize: 16, cursor: 'pointer' }}>
                        <img src={delete_icon} alt="" style={{ marginRight: 10 }}/>
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
                style={{ marginTop: 20, marginRight: 7, width: 220 }}
                type="primary"
                icon={<FontAwesomeIcon
                    style={{ marginRight: 7 }}
                    icon={["far", "plus-square"]} />}
                onClick={handleAddRow}>{t("Qo'shish")}</Button>

            <Button
                size="large"
                style={{ marginTop: 20, width: 220 }}
                danger
                type="primary"
                icon={<FontAwesomeIcon
                    style={{ marginRight: 7 }}
                    icon={["far", "trash-alt"]} />}
                onClick={() => { if (grid.length > 1) { handleRemoveRow(grid.length - 1) } }}>{t("Oxirgi qatorni o'chirish")}</Button> */}
        </div>
    )
}


const mapDispatchToProps = dispatch=>({
    loadProducts: (data)=>dispatch(setUserProducts(data))
})
const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    token: selectToken
})

export default connect(mapStateToProps, mapDispatchToProps)(FacturaProductGrid)
