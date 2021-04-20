import {useState} from "react";

export default class EmpowermentProduct{
    "OrdNo" = 1;
    "Name" = "";
    "MeasureId" = "";
    "Count"=""
}

const properties=[
    "OrdNo",
    "Name",
    "MeasureId",
    "Count"
];

export const ConverEmpGridToData = (data, tin, empId) => {
    // const [datum,setDatum]=useState([]);
    let res=[];
    let emp = new EmpowermentProduct();
    if (Array.isArray(data)) {
        data.map((row,index)=>{
            if (index!==0){
                properties.map((prop,i)=>{
                    emp[prop]=row[i]?.value;
                })
                res.push({...emp})
            }
        })

    }

    return res;
}

// export const ConvertEmpDataToForm=(products)=>{
//     let resp = products.map(product=>[
//         {value:product.ordNo,readOnly:true},
//         {value:product.Name},
//         {value:product.MeasureId},
//         {value:product.Count}
//     ])
//     return resp;
// }