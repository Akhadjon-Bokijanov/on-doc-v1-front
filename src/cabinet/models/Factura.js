export default class Factura {
    "Version"= 1;
    "FacturaType"= null;
    "SingleSidedType"= null;
    "HasMarking"= true;
    "AgreeToFine"= false;
    "FacturaId"= "";
    "FacturaDoc"= {
        "FacturaNo": null,
        "FacturaDate": null
    }
    "OldFacturaDoc"= {
        "OldFacturaId": null,
        "OldFacturaNo": null,
        "OldFacturaDate": null
    }
    "ContractDoc"= {
        "ContractNo": null,
        "ContractDate": null
    }
    "FacturaEmpowermentDoc"= {
        "AgentFacturaId": null,
        "EmpowermentNo": null,
        "EmpowermentDateOfIssue": null,
        "AgentFio": null,
        "AgentTin": null,
        "AgentPinfl": null
    }
    "ItemReleasedDoc"= {
        "ItemReleasedTin": null,
        "ItemReleasedFio": null,
        "ItemReleasedPinfl": null
    }
    "SellerTin"= null;
    "BuyerTin"= null;
    "Seller"= {
        "Name": null,
        "Account": null,
        "BankId": null,
        "Address": null,
        "Mobile": null,
        "WorkPhone": null,
        "Oked": null,
        "DistrictId": null,
        "Director": null,
        "Accountant": null,
        "VatRegCode": null,
        "BranchCode": null,
        "BranchName": null
    }
    "Buyer"= {
        "Name": null,
        "Account": "",
        "BankId": "",
        "Address": null,
        "Mobile": null,
        "WorkPhone": null,
        "Oked": "",
        "DistrictId": null,
        "Director": null,
        "Accountant": "",
        "VatRegCode": "",
        "BranchCode": "",
        "BranchName": ""
    }
    "ForeignCompany"= {
        "CountryId": null,
        "Name": null,
        "Address": null,
        "Bank": null,
        "Account": null
    }
    "ProductList"=null
}

export const GetFacturaDataToSign = (data, products, FacturaId) => {

    console.log(data)
    let { 
        agentFio,
        agentTin,
        buyerAccount,
        buyerAccountant,
        buyerAddress,
        buyerDirector,
        buyerMfo,
        buyerName,
        buyerTin,
        buyerVatRegCode,
        contractDate,
        contractNo,
        empowermentDateOfIssue,
        empowermentNo,
        facturaDate,
        facturaNo,
        facturaType,
        oldFacturaId,
        oldFacturaNo,
        oldFacturaDate,
        sellerAccount,
        sellerAccountant,
        sellerAddress,
        sellerDirector,
        sellerMfo,
        sellerName,
        sellerTin,
        sellerVatRegCode,
        singleSidedType, 
    } = data

    let Buyer = {
        "Name": buyerName,
        "Account": buyerAccount,
        "BankId": buyerMfo,
        "Address": buyerAddress,
        "Mobile": "",
        "WorkPhone": "",
        "Oked": "",
        "DistrictId": "",
        "Director": buyerDirector,
        "Accountant": buyerAccountant,
        "VatRegCode": buyerVatRegCode,
        "BranchCode": "",
        "BranchName": ""

    }
    let Seller = {
        "Name": sellerName,
        "Account": sellerAccount,
        "BankId": sellerMfo,
        "Address": sellerAddress,
        "Mobile": "",
        "WorkPhone": "",
        "Oked": "",
        "DistrictId": "",
        "Director": sellerDirector,
        "Accountant": sellerAccountant,
        "VatRegCode": sellerVatRegCode,
        "BranchCode": "",
        "BranchName": ""
    }

    let f = new Factura();

    f.OldFacturaDoc = {
        OldFacturaDate: oldFacturaDate,
        OldFacturaId: oldFacturaId,
        OldFacturaNo: oldFacturaNo
    }

    f.SingleSidedType=singleSidedType;
    f.FacturaProductId=FacturaId;
    f.FacturaId=FacturaId;
    f.FacturaType=facturaType
    f.FacturaDoc={
        FacturaDate: facturaDate,
        FacturaNo: facturaNo,
    }
    f.Seller=Seller;
    f.Buyer = Buyer;
    f.BuyerTin = buyerTin;
    f.SellerTin=sellerTin;

    f.ContractDoc={
        ContractDate: contractDate,
        ContractNo: contractNo,
    }
    f.FacturaEmpowermentDoc={
        EmpowermentDateOfIssue: empowermentDateOfIssue,
        EmpowermentNo: empowermentNo,
        AgentFio: agentFio,
        AgentTin: agentTin,
    }
    f.ProductList=products;
    console.log(products)
    return f;
}
//for editing forms
export const FacturaDataToForm = data=>{
    
    let { 
        Buyer, 
        Seller,
        ContractDoc,
        FacturaDoc,
        FacturaEmpowermentDoc,
        FacturaId,
        FacturaProductId,
        ForeignCompany,
        BuyerTin,
        SellerTin,
        ProductList,
        FacturaType,
        OldFacturaDoc,
        SingleSidedType
    } = data;

    let f = {
        agentFio: FacturaEmpowermentDoc.AgentFio,
        agentTin: FacturaEmpowermentDoc.AgentTin,
        buyerAccount: Buyer.Account,
        buyerAccountant: Buyer.Accountant,
        buyerAddress: Buyer.Address,
        buyerDirector: Buyer.Director,
        buyerMfo: Buyer.BankId,
        buyerName: Buyer.Name,
        buyerTin: BuyerTin,
        buyerVatRegCode: Buyer.VatRegCode,
        contractDate: ContractDoc.ContractDate,
        contractNo: ContractDoc.ContractNo,
        empowermentDateOfIssue: FacturaEmpowermentDoc.EmpowermentDateOfIssue,
        empowermentNo: FacturaEmpowermentDoc.EmpowermentNo,
        facturaDate: FacturaDoc.FacturaDate,
        facturaNo: FacturaDoc.FacturaNo,
        facturaType: FacturaType,
        oldFacturaId: OldFacturaDoc.OldFacturaId,
        oldFacturaNo: OldFacturaDoc.OldFacturaNo,
        oldFacturaDate: OldFacturaDoc.OldFacturaDate,
        sellerAccount: Seller.Account,
        sellerAccountant: Seller.Accountant,
        sellerAddress: Seller.Address,
        sellerDirector: Seller.Director,
        sellerMfo: Seller.BankId,
        sellerName: Seller.Name,
        sellerTin: SellerTin,
        sellerVatRegCode: Seller.VatRegCode,
        singleSidedType: SingleSidedType,
    }

    return f;

}



const formProperties = [
    "agentFio",
    "agentTin",
    "buyerAccount",
    "buyerAccountant",
    "buyerAddress",
    "buyerDirector",
    "buyerMfo",
    "buyerName",
    "buyerTin",
    "buyerVatRegCode",
    "contractDate",
    "contractNo",
    "empowermentDateOfIssue",
    "empowermentNo",
    "facturaDate",
    "facturaNo",
    "facturaProductId",
    "facturaType",
    "oldFacturaId",
    "oldFacturaNo",
    "oldFacturaDate",
    "sellerAccount",
    "sellerAccountant",
    "sellerAddress",
    "sellerDirector",
    "sellerMfo",
    "sellerName",
    "sellerTin",
    "sellerVatRegCode",
    "singleSidedType"
]

