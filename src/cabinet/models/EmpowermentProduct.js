import {useState} from "react";
import SelectMeasureEditor from "../../components/data-sheet-custom-measure-selector/custom-selector.component";

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

export const ConverEmpGridToData = (data) => {/*, tin, empId*/
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


export const ConvertEmpProductToGrid=products=>{
    let res = products.map((item,index)=>[
        {value:item.OrdNo,readOnly:true},
        {value:item.Name},
        { value: item.MeasureId, dataEditor: SelectMeasureEditor },
        {value:item.Count}
    ])
    return res;
}
export const ConvertEmpDataToForm=(data)=>{
    let {
        Agent,
        Buyer,
        BuyerTin,
        ContractDoc,
        EmpowermentDoc,
        EmpowermentId,
        // ProductList,
        Seller,
        SellerTin,

    } = data

    let emp = {
        agentTin:Agent.AgentTin,
        agentFio:Agent.Fio,
        buyerName:Buyer.Name,
        buyerAddress:Buyer.Address,
        buyerTin:BuyerTin,
        contractNo:ContractDoc.ContractNo,
        contarctDate:ContractDoc.ContractDate,
        empowermentDateOfExpire:EmpowermentDoc.EmpowermentDateOfExpire,
        empowermentDateOfIssue:EmpowermentDoc.EmpowermentDateOfIssue,
        empowermentNo:EmpowermentDoc.EmpowermentNo,
        empowermentId:EmpowermentId,
        sellerAccount:Seller.Account,
        sellerAccountant:Seller.Accountant,
        sellerAddress:Seller.Address,
        sellerBankId:Seller.BankId,
        sellerDirector:Seller.Director,
        sellerName:Seller.Name,
        sellerTin:SellerTin,
        agentPassportDateOfIssue:Agent.Passport.DateOfIssue,
        agentPassportNumber:Agent.Passport.Number,
        agentPassportIssuedBy:Agent.Passport.IssuedBy
    }
    return emp;
}