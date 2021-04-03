import SelectMeasureEditor from "../../components/data-sheet-custom-measure-selector/custom-selector.component";
import SelectEditor from '../../components/data-sheet-custom-selector/custom-selector.component'
import { ProductValueRendered } from '../factura/create/product-grid.component';
export default class FacturaProduct {
    "OrdNo"= 1;
    "CommittentName"= null;
    "CommittentTin"= "";
    "CommittentVatRegCode"= "";
    "CatalogCode"= "";
    "CatalogName"= "";
    "Barcode"= "";
    "Name"= "";
    "Serial"= "";
    "MeasureId"= "";
    "BaseSumma"= "";
    "ProfitRate"= "";
    "Count"="";
    "Summa"= "";
    "DeliverySum"= "";
    "ExciseRate"= "";
    "ExciseSum"= "";
    "VatRate"= "0";
    "VatSum"= "0";
    "DeliverySumWithVat"= "";
    "WithoutVat"= true;
    "Marks"= {
        "ProductType": null,
        "KIZ": [
            
        ],
        "NomUpak": [
            
        ],
        "IdentTransUpak": [
            
        ]
    }
}

const product_property_order = [
    "OrdNo",
    "Name",
    [
        "CatalogCode",
        "CatalogName"
    ],
    "Barcode",
    "MeasureId",
    "Count",
    "BaseSumma",
    "ExciseRate",
    "ExciseSum",
    "DeliverySum",
    "VatRate",
    "VatSum",
    "DeliverySumWithVat"
]

export const ConvertGridToProduct = (data, Tin, FacturaId)=>{

    let res = [];
    let HasVat = false;
    let HasExcise = false;
    let HasCommittent = false;
    let HasMedical = false;

    if(Array.isArray(data)){

        let WithoutVat=false;

        data.forEach(row=>{
            let p = new FacturaProduct();

            product_property_order.forEach((prop, index)=>{
                if(Array.isArray(prop)){
                    prop.forEach(subProp=>{
                        p[subProp]=row[index].value[subProp]
                    })
                }
                else{
                    p[prop] = row[index].value
                }
            })

            if(p.VatRate>0){
                WithoutVat=false;
                HasVat=true;
            }
            if(p.ExciseRate>0){
                HasExcise=true;
            }

            res.push(p)
        })
    }

    return {
        FacturaId,
        Tin,
        HasCommittent,
        HasVat,
        HasMedical,
        HasExcise,
        Products: res
    }

}

export const ConvertProductToGrid = products=>{
    
        let res = products.map(product => [
            { readOnly: true, value: product.OrdNo }, //0 ordNo
            { value: product.Name }, //1 product name
            { value: {classCode: product.CatalogCode, className: product.CatalogName}, dataEditor: SelectEditor, valueViewer: ProductValueRendered }, //2 catalogCode
            { value: product.Barcode }, //3 shrix code
            { value: product.MeasureId, dataEditor: SelectMeasureEditor }, //4 measure
            { value: product.Count }, //5 amount
            { value: product.BaseSumma, }, //6 price
            { value: product.ExciseRate }, //7 aksiz rate
            { value: product.ExciseSum, readOnly: true }, //8 aksiz amount
            { value: product.DeliverySum }, //9 delivery cost
            { value: product.VatRate }, //10 VAT rate
            { value: product.VatSum, readOnly: true }, //11 VAT amount
            { value: product.DeliverySumWithVat, readOnly: true }, //12 total
        ])
        return res
}