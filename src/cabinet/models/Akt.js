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

}