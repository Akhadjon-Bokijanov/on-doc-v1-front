import React, { useState, useEffect } from 'react'
import Datasheet from 'react-datasheet';
import SelectMeasureEditor from '../../../components/data-sheet-custom-measure-selector/custom-selector.component';
import SelectEditor from '../../../components/data-sheet-custom-selector/custom-selector.component';
import { useTranslation } from 'react-i18next';
import { ProductValueRendered } from './product-grid.component';
import GridDateTime from '../../../components/grid-datetime/grid-datetime.component';
import GridDocTypeSelect from '../../../components/grid-doctype-select/grid-doctype-select.component';
import GridSingleSidedTyle from '../../../components/grid-singlesidedtype-select.component/grid-singlesidedtype-select.component';
import GridUserFetcher from '../../../components/grid-user-fetcher-input/grid-user-fetcher-input.component';
import { FetchUser } from '../../../utils/utils';

const BoldRendered = prop =>{

    const {value} = prop;

    return <div style={{textAlign: 'left', fontWeight: 'bold', color: 'black', paddingLeft: 5}}>{value}</div>
}
const SingleSidedFacturaViewer = prop=>{

    const { value } = prop;

    const SINGLE_SIDEDs={
        1: "На физ. лицо",
        2:"На экспорт",
        3:"На импорт",
        4:"Реализация, связанная с гос. секретом",
        5:"Финансовые услуги"
    }

    return <div>{SINGLE_SIDEDs[value]}</div>
}
const DocTypeValueViewer = prop=>{
    const { value } = prop;

    const FACTURA_TYPES = {
        0: "STANDARD",
        1: "QOSHIMCHA",
        2: "HARAJATLARNI QOPLASH",
        3: "TOLOVSIZ",
        4: "TUZATUVCHI",
    }

    return <div>{FACTURA_TYPES[value]}</div>
}
const CreateExcelType = () => {
    const { t } = useTranslation();
    //const [fullView, toglleFullView] = useState(false)
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
            { value: "", dataEditor: SelectMeasureEditor },        //4 measure
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

    const UserRenderer = prop=>{
        
        const { value, col, row } = prop;
        
        console.log(FetchUser(value))
        
        return <div>{value}</div>
    }

    const [docGrid, setDocGrid] = useState([
        [
            { value: t("Hujjat turi"), readOnly: true, valueViewer: BoldRendered },
            { value: 0, dataEditor: GridDocTypeSelect, valueViewer: DocTypeValueViewer },
            { value:"", valueViewer: BoldRendered, readOnly: true, width: 100, },
            { value: t("Faktura raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Faktura sanasi"), valueViewer: BoldRendered, readOnly: true },
            { value: "", dataEditor: GridDateTime },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Shartnoma raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Shartnoma sanasi"), valueViewer: BoldRendered, readOnly: true },
            { value: "", dataEditor: GridDateTime },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: "Eski faktura ID", valueViewer: BoldRendered, readOnly: true },
            { value: "", valueViewer: BoldRendered }
        ],
        [
            { value: "Eski faktura NO", readOnly: true, valueViewer: BoldRendered, },
            { value: "" },
            { value: "", readOnly: true },
            { value: "Eski faktura sanasi", readOnly: true, valueViewer: BoldRendered, },
            { value: "", dataEditor: GridDateTime },
        ],
        [
            { readOnly: true, colSpan: 5, value: t("Tomonlar") }
        ],
        [
            {readOnly: true, value: ""},
            { readOnly: true, value: "" },
            { readOnly: true, value: "" },
            { readOnly: true, value: "Bir tomonli faktura", valueViewer: BoldRendered },
            { value: "", dataEditor: GridSingleSidedTyle, valueViewer: SingleSidedFacturaViewer}
        ],
        [
            { valueViewer: BoldRendered, readOnly: true, colSpan: 2, value: t("Sizning ma'lumotlaringiz") },
            { valueViewer: BoldRendered, readOnly: true, width: 100, value: "" },
            { valueViewer: BoldRendered, readOnly: true, colSpan: 2, value: t("Kontragent ma'lumotlari") }
        ],
        [
            { value: t("STIR"), valueViewer: BoldRendered, readOnly: true },
            { value: "", valueViewer: UserRenderer},
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("STIR"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Nomi"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Nomi"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("QQS tolovchi registratsiya raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("QQS tolovchi registratsiya raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Hisob raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Hisob raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("MFO"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("MFO"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Manzil"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Manzil"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Direktor"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Direktor"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            { value: t("Bosh hisobchi"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Bosh hisobchi"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        [
            {value: "Ishonchnoma", colSpan: 5, readOnly: true}
        ],
        [
            { value: t("Ishonchnoma raqami"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Ishonchnoma sanasi"), valueViewer: BoldRendered, readOnly: true },
            { value: "", dataEditor: GridDateTime }
        ],
        [
            { value: t("STIR"), valueViewer: BoldRendered, readOnly: true },
            { value: "" },
            { value: "", valueViewer: BoldRendered, readOnly: true, width: 100 },
            { value: t("Ma'sul shaxs FIO"), valueViewer: BoldRendered, readOnly: true },
            { value: "" }
        ],
        
    ])
    const valueRenderer = cell => cell.value;
    const onDocCellsChanged = change=>{
        change.forEach(({ cell, row, col, value }, index) => {
            //this sets changed values
            docGrid[row][col] = { ...docGrid[row][col], value };
            
        })
        setDocGrid([...docGrid])
    }
    const onCellsChanged = changes => {
        changes.forEach(({ cell, row, col, value }, index) => {
            //this sets changed values
            grid[row][col] = { ...grid[row][col], value };

            //Lets calculate
            let priceamount = parseFloat(grid[row][5].value) * parseFloat(grid[row][6].value);
            let aksizamount = parseFloat(priceamount * grid[row][7].value / 100);

            grid[row][8] = { value: isNaN(aksizamount) ? 0 : parseFloat(aksizamount), readOnly: true };

            let vatamout = parseFloat(priceamount * parseFloat(grid[row][10].value) / 100);

            grid[row][11] = { value: isNaN(vatamout) ? 0 : vatamout, readOnly: true }

            let total = !isNaN(priceamount) ? priceamount : 0
            isNaN(aksizamount) ? total = total : total += aksizamount;
            isNaN(vatamout) ? total = total + 0 : total += vatamout;
            isNaN(grid[row][9].value) ? total = total + 0 : total += +grid[row][9].value

            grid[row][12] = { value: total, readOnly: true }


        });
        setGrid([...grid]);

        grid.shift()

        //getProducts(grid)

    };

    const onContextMenu = (e, cell, i, j) =>
        cell.readOnly ? e.preventDefault() : null;
    return (
        <div>
            <div className="factura-data-sheet-container" style={{ margin: 15 }}>
                <Datasheet
                    data={docGrid}
                    valueRenderer={valueRenderer}
                    onContextMenu={onContextMenu}
                    onCellsChanged={ onDocCellsChanged }
                />
            </div>
            <div className="factura-data-sheet-container" style={{ margin: 15, overflowX: 'auto' }}>
                <Datasheet
                    data={grid}
                    valueRenderer={valueRenderer}
                    onContextMenu={onContextMenu}
                    onCellsChanged={onCellsChanged}
                />

            </div>
        </div>
        
    )
}

export default CreateExcelType
