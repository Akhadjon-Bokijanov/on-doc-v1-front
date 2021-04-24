import moment from 'moment';
import SelectMeasureEditor from '../components/data-sheet-custom-measure-selector/custom-selector.component';
import SelectEditor from '../components/data-sheet-custom-selector/custom-selector.component';
import i18n from "../translate";

const t = i18n.t.bind(i18n)

export const getFileExtension = filename => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export const FIRST_TTY_GRID_ROW = [
    { readOnly: true, value: "", width: 50 }, //0 ordNo
    { readOnly: true, value: 'Товар/хизмат лар номи*' }, //1 product name
    { readOnly: true, value: "ўлчов бирлиги.*", dataEditor: SelectMeasureEditor }, //2 measure
    { readOnly: true, value: 'миқдори' }, //3 count
    { readOnly: true, value: "Нарҳ*", }, //4 price
    { readOnly: true, value: "Юкнинг умумий қиймати", }, //5 total
    { readOnly: true, value: 'етказиб бериш нарҳи*' }, //6 delivery cost
    { readOnly: true, value: "Юкка доир хужжатлар", }, //7 Docs
    { readOnly: true, value: "Массани аниқлаш усули", }, //8 weight measure method
    { readOnly: true, value: "Юк синфи", }, //9 item class
    { readOnly: true, value: "Масса (брутто)", }, //10 brutto weight
    { readOnly: true, value: "Масса (нетто)", }, //11 netto weight
]

export const FIRST_FACTURA_GRID_ROW = [
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
];

export const FIRST_ACT_GRID_ROW = [
    { readOnly: true, value: '', width: 50 },
    { value: 'Товар/хизмат лар номи*', readOnly: true, width: 200 },
    { value: 'ўлчов бирлиги.*', readOnly: true, width: 100 },
    { value: "миқдори", readOnly: true, width: 100 },
    { value: "Нарҳ*", readOnly: true, width: 100 },
    { value: "Total*", readOnly: true, width: 150 },
];

export const FIRST_CONTRACT_GRID_ROW = [
    { readOnly: true, value: '', width: 50 },
    { value: 'Товар/хизмат лар номи*', readOnly: true, width: 200 },
    { value: 'Товар/хизмат лар Ягона электрон миллий каталоги бўйича идентификация коди*', readOnly: true, width: 150 },
    { value: 'Товар/хизмат штрих коди', readOnly: true, width: 100 },
    { value: 'ўлчов бирлиги.*', readOnly: true, width: 100 },
    { value: "миқдори", readOnly: true, width: 100 },
    { value: "Нарҳ*", readOnly: true, width: 100 },
    { value: "етказиб бериш нарҳи*", readOnly: true, width: 100 },
    { value: "Total*", readOnly: true, width: 150 },
];

export const FIRST_EMPOWERMENT_GRID_ROW = [
    { readOnly: true, value: '', width: 50 },
    { value: 'Товар/хизмат лар номи*', readOnly: true, width: 200 },
    { value: 'ўлчов бирлиги.*', readOnly: true, width: 100 },
    { value: "миқдори", readOnly: true, width: 100 },
]

export const SAMPLE_FACTURA_GRID_ROW = [
    { readOnly: true, value: 1 }, //0 ordNo
    { value: "" }, //1 product name
    { value: "", dataEditor: SelectEditor }, //2 catalogCode
    { value: "" }, //3 shrix code
    { value: "", dataEditor: SelectMeasureEditor }, //4 measure
    { value: '' }, //5 amount
    { value: "", }, //6 price
    { value: '' }, //7 aksiz rate
    { value: '', readOnly: true }, //8 aksiz amount
    { value: '' }, //9 delivery cost
    { value: "" }, //10 VAT rate
    { value: '', readOnly: true }, //11 VAT amount
    { value: '', readOnly: true, }, //12 total
]

export const SAMPLE_CONTRACT_GRID_ROW = [
    { readOnly: true, value: 1 }, //0 ordNo
    { value: "" }, //1 product name
    { value: "", dataEditor: SelectEditor }, //2 catalogCode
    { value: "" }, //3 shrix code
    { value: "", dataEditor: SelectMeasureEditor }, //4 measure
    { value: '' }, //5 amount
    { value: "", }, //6 price
    { value: '' }, //7 delivery cost
    { value: '', readOnly: true, }, //8 total
]

export const convertProductsToGrid = (products, doc = "factura") => {

    let gridProducts;

    switch (doc) {

        case "empowerment":
            {
                gridProducts = products.map(product =>[
                    { readOnly: true, value: product["OrdNo"], width: 50 },
                    { value: product["Name"] },
                    { value: product["MeasureId"], dataEditor: SelectMeasureEditor },
                    { value: product["Count"] },
                ])
                gridProducts.unshift(FIRST_EMPOWERMENT_GRID_ROW);
                return gridProducts
            }
            break;

        case "act":
            {
                gridProducts = products.map(product => {
                    return [
                        { readOnly: true, value: product["ordNo"], width: 50 },
                        { value: product["name"] },
                        { value: product["measureId"], dataEditor: SelectMeasureEditor },
                        { value: product["count"] },
                        { value: product["price"] },
                        { value: parseFloat(product["count"]) * parseFloat(product["price"]), readOnly: true, width: 150 },
                    ]
                })
                gridProducts.unshift(FIRST_ACT_GRID_ROW);
            }
            break;
        case "contract":
            {

                gridProducts = products.map(product => {
                    return [
                        { readOnly: true, value: product["ordNo"] }, //0 ordNo
                        { value: product["name"] }, //1 product name
                        { value: product["catalogCode"], dataEditor: SelectEditor }, //2 catalogCode
                        { value: product["barCode"] }, //3 shrix code
                        { value: product["measureId"], dataEditor: SelectMeasureEditor },
                        { value: product["count"] }, //5 amount
                        { value: product["price"], }, //6 price
                        { value: product["deliverySum"] }, //9 delivery cost
                        {
                            value: product["count"] * product["price"] + parseFloat(product["deliverySum"]),
                            readOnly: true
                        }
                    ]
                })
                gridProducts.unshift(FIRST_CONTRACT_GRID_ROW);
            }
            break;

        case "tty":
            {
                gridProducts = products.map((product, index) => {
                    return [
                        { readOnly: true, value: index + 1, width: 50 }, //0 ordNo
                        { value: product.name }, //1 product name
                        { value: product.measureId, dataEditor: SelectMeasureEditor }, //2 measure
                        { value: product.count }, //3 count
                        { value: product.price }, //4 price
                        { value: product.count * product.price, readOnly: true }, //5 total
                        { value: product.deliveryCost }, //6 delivery cost
                        { value: product.docs, }, //7 Docs
                        { value: product.weightMeasureMethod, }, //8 weight measure method
                        { value: product.itemClass, }, //9 item class
                        { value: product.weightBrut, }, //10 brutto weight
                        { value: product.weightNet, }, //11 netto weight
                    ]
                })
                gridProducts.unshift(FIRST_TTY_GRID_ROW);
            }
            break;

        default:
            {
                gridProducts = products.map(product => {
                    return [
                        { readOnly: true, value: product["ordNo"] }, //0 ordNo
                        { value: product["name"] }, //1 product name
                        { value: product["catalogCode"], dataEditor: SelectEditor }, //2 catalogCode
                        { value: product["barCode"] }, //3 shrix code
                        { value: product["measureId"], dataEditor: SelectMeasureEditor }, //4 measure
                        { value: product["count"] }, //5 amount
                        { value: product["baseSumma"], }, //6 price
                        { value: product["exciseRate"] }, //7 aksiz rate
                        { value: product["exciseSum"], readOnly: true }, //8 aksiz amount
                        { value: product["deliverySum"] }, //9 delivery cost
                        { value: product["vatRate"] }, //10 VAT rate
                        { value: product["vatRate"] * product["baseSumma"], readOnly: true }, //11 VAT amount
                        { value: product["summa"], readOnly: true, }, //12 total
                    ]
                })
                gridProducts.unshift(FIRST_FACTURA_GRID_ROW);
            }

    }




    return gridProducts;
}

const FACTURA_PRODUCT_FIELDS = {
    0: "ordNo",

}

//#region Rich text editr configs
export const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['image', 'link'],

        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'] // remove formatting button
    ],
    imageDrop: true,
}

export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block', 'color', 'background',
    'size', 'align', 'direction', 'indent', 'font', 'script'
];

export const modulesForQuestion = {
    toolbar: [
        ['bold', 'italic', 'underline', ], // toggled buttons
        ['code-block'],
        ['image'],

        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],

        ['clean'] // remove formatting button
    ],
    imageDrop: true,
}

export const formatsForQuestion = [
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'image', 'code-block',
    ]
    //#endregion 


export const getValidFileName = (fileName) => {
    return fileName.replace(/[\/|\\\s:*!?"<>]/g, "_")
}