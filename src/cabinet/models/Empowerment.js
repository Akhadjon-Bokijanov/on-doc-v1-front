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
        sellerTin
    } = formData;
}

