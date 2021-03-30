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

