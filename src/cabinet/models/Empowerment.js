export default class Empowerment {
    "EmpowermentId"= "";
    "EmpowermentDoc"= {
        "EmpowermentNo": "",
        "EmpowermentDateOfIssue": "",
        "EmpowermentDateOfExpire": ""
    };
    "ContractDoc"= {
        "ContractNo": "",
        "ContractDate": ""
    };
    "Agent"= {
        "AgentEmpowermentId": "",
        "AgentTin": "",
        "JobTitle": "",
        "Fio": "",
        "Passport":{
            "Number": "",
            "DateOfIssue": "",
            "IssuedBy": ""
        }
    };
    "SellerTin"= "200523221";
    "BuyerTin"= "505282068";
    "Seller"= {
        "Name": "",
        "Account": "",
        "BankId": "",
        "Address": "",
        "Mobile": "",
        "WorkPhone": "",
        "Oked": "",
        "DistrictId": "",
        "Director": "",
        "Accountant": ""
    }
    "Buyer"= {
        "Name": "",
        "Account": "",
        "BankId": "",
        "Address": "",
        "Mobile": "",
        "WorkPhone": "",
        "Oked": "",
        "DistrictId": "",
        "Director": "",
        "Accountant": ""
    };
    "ProductList"= {
        "EmpowermentProductId": "",
        "Tin": "",
        "Products":[]
    }
}

export const GetEmpowermentDataToSign = (formData, products, empId)=>{
    let {
        agentFio,
        agentJobTitle,
        agentPassportDateOfIssue,
        agentPassportIssuedBy,
        agentPassportNumber,
        agentTin,
        buyerAccount,
        buyerAccountant,
        buyerAddress,
        buyerDirector,
        buyerOked,
        buyerMfo,
        buyerName,
        buyerTin,
        contractDate,
        contractNo,
        empowermentDateOfExpire,
        empowermentDateOfIssue,
        empowermentNo,
        sellerAccount,
        sellerAccountant,
        sellerAddress,
        sellerDirector,
        sellerMfo,
        sellerName,
        sellerOked,
        sellerTin
    } = formData;

    let emp = new Empowerment();
    emp.EmpowermentId=empId;
    emp.EmpowermentDoc={
        EmpowermentDateOfExpire:empowermentDateOfExpire,
        EmpowermentDateOfIssue: empowermentDateOfIssue,
        EmpowermentNo:empowermentNo
    }
    emp.ContractDoc={
        ContractNo:contractNo,
        ContractDate:contractDate
    }
    emp.Agent = {
        AgentTin: agentTin,
        Fio: agentFio,
        JobTitle: agentJobTitle,
        AgentEmpowermentId: empId,
        Passport:{
            DateOfIssue: agentPassportDateOfIssue,
            Number: agentPassportNumber,
            IssuedBy: agentPassportIssuedBy
        }
    }
    emp.SellerTin=sellerTin;
    emp.BuyerTin=buyerTin;
    emp.Seller={
        Name: sellerName,
        Account: sellerAccount,
        BankId: sellerMfo,
        Address: sellerAddress,
        Oked: sellerOked,
        Director: sellerDirector,
        Accountant: sellerAccountant,
    }
    emp.Buyer={
        Name: buyerName,
        Account: buyerAccount,
        BankId: buyerMfo,
        Address: buyerAddress,
        Oked: buyerOked,
        Director: buyerDirector,
        Accountant: buyerAccountant,
    }

    emp.ProductList={
        EmpowermentProductId:empId,
        Tin:sellerTin,
        Products:products
    }

    return emp;
}

const EmpowermentDataToForm=formData=>{
    let {

    } = formData;

    let emp = {

    }
}
