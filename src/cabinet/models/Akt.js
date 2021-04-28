import moment from 'moment'
export default class Akt {
    "ActId"= "";
    "ActDoc"= {
        "ActNo": "",
        "ActDate": "",
        "ActText": ""
    };
    "ContractDoc"= {
        "ContractNo": "",
        "ContractDate": ""
    };
    "SellerTin"= "";
    "SellerName"= "";
    "BuyerTin"= "";
    "BuyerName"= "";
    "ProductList"= {
        "ActProductId": "",
        "Tin": "",
        "Products": []
    }
}

export const ConvertDataToForm = (data)=>{
    let a ={};
    const { ActDoc, ContractDoc } = data
    a.actDate = moment(ActDoc?.ActDate);
    a.actNo=ActDoc?.ActNo;
    a.actText=ActDoc?.ActText;
    a.buyerName=data?.BuyerName;
    a.buyerTin=data?.BuyerTin
    a.contractDate = moment(ContractDoc?.ContractDate);
    a.contractNo=ContractDoc?.ContractNo
    a.sellerName=data?.SellerName;
    a.sellerTin=data?.SellerTin;

    return a;
}

export const GetActDataToSign = (data, products, actId)=>{
    let {
        actDate,
        actNo,
        actText,
        buyerName,
        buyerTin,
        contractDate,
        contractNo,
        sellerName,
        sellerTin
    } = data;

    let m = new Akt();
    m.ActId=actId;
    m.ActDoc={
        ActDate: actDate,
        ActText: actText,
        ActNo: actNo
    }
    m.BuyerName=buyerName;
    m.BuyerTin=buyerTin;
    m.ContractDoc={
        ContractNo: contractNo,
        ContractDate: contractDate
    }
    m.SellerTin=sellerTin;
    m.SellerName=sellerName;
    m.ProductList={
        ActProductId: actId,
        Tin: sellerTin,
        Products: products
    }
    return m;

}