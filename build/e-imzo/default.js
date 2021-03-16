var lang = document.getElementById("langs").value;
function CalcList(element,row_id) {
    // console.log(element.value);
    console.log("ROW:"+row_id);
    // console.log(element.name);
    // console.log(element.id);
    var reason = "";
    if (isNaN(element.value)) {
        ShowMessage('danger', 'Kiritilgan qiymat raqam emas');
        element.value = "";
    } else {

        var ProductDeliverySumArea = document.getElementById("ProductDeliverySum_"+row_id);
        var ProductVatSumArea = document.getElementById("ProductVatSum_"+row_id);
        var ProductDeliverySumWithVatArea = document.getElementById("ProductDeliverySumWithVat_"+row_id);

        var ProductFuelSumArea = document.getElementById("ProductFuelSum_"+row_id);
        var ProductDeliverySumWithFuelArea = document.getElementById("ProductDeliverySumWithFuel_"+row_id);

        var JsonItems = document.getElementById("items_json").value;
        JsonItems = JSON.parse(JsonItems);
        var JsonMake = JsonItems;
        var ProductCount = 0;
        var ProductSumma = 0;
        var ProductDeliverySum = 0;
        var ProductVatRate = 0;
        var ProductVatSum = 0;
        var ProductDeliverySumWithVat = 0;

        var ProductFuelRate = 0;
        var ProductFuelSum = 0;
        var ProductMeasureId = 0;
        var ProductName ="";
        var ProductDeliverySumWithFuel = 0;

        if(typeof JsonItems[row_id]!== 'undefined') {
            JsonItems = JsonItems[row_id];


            if (typeof JsonItems.ProductName !== 'undefined') {
                ProductName = JsonItems.ProductName;
            }

            if (typeof JsonItems.ProductMeasureId !== 'undefined') {
                ProductMeasureId = JsonItems.ProductMeasureId;
            }

            if (typeof JsonItems.ProductCount !== 'undefined') {
                ProductCount = JsonItems.ProductCount;
            }
            if (typeof JsonItems.ProductSumma !== 'undefined') {
                ProductSumma = JsonItems.ProductSumma;
            }
            if (typeof JsonItems.ProductDeliverySum !== 'undefined') {
                ProductDeliverySum = JsonItems.ProductDeliverySum;
            }
            if (typeof JsonItems.ProductVatRate !== 'undefined') {
                ProductVatRate = JsonItems.ProductVatRate;
                console.log("Qaysi:"+JsonItems.ProductVatRate);
            }
            if (typeof JsonItems.ProductVatSum !== 'undefined') {
                ProductVatSum = JsonItems.ProductVatSum;
            }
            if (typeof JsonItems.ProductDeliverySumWithVat !== 'undefined') {
                ProductDeliverySumWithVat = JsonItems.ProductDeliverySumWithVat;
            }


            if (typeof JsonItems.ProductFuelRate !== 'undefined') {
                ProductFuelRate = JsonItems.ProductFuelRate;
            }
            if (typeof JsonItems.ProductFuelSum !== 'undefined') {
                ProductFuelSum = JsonItems.ProductFuelSum;
            }
            if (typeof JsonItems.ProductDeliverySumWithFuel !== 'undefined') {
                ProductDeliverySumWithFuel = JsonItems.ProductDeliverySumWithFuel;
            }

            switch (element.name) {
                case "ProductCount":
                    ProductCount = element.value;
                    break;
                case "ProductSumma":
                    ProductSumma = element.value;
                    break;
                case "ProductDeliverySum":
                    ProductDeliverySum = element.value;
                    break;
                case "ProductVatRate":
                    ProductVatRate = element.value;
                    break;
                case "ProductVatSum":
                    ProductVatSum= element.value;
                    break;
                case "ProductDeliverySumWithVat":
                    ProductDeliverySumWithVat = element.value;
                    break;
                case "ProductFuelSum":
                    ProductFuelSum = element.value;
                    break;
                case "ProductFuelRate":
                    ProductFuelRate = element.value;
                    ProductFuelSum = ProductSumma * (ProductFuelRate/100);
                    break;
                case "ProductDeliverySumWithFuel":
                    ProductDeliverySumWithFuel = element.value;
                    break;

            }
            var isAksis = document.getElementById('TypeVat').checked;
            ProductDeliverySum = (ProductCount * ProductSumma)+ProductFuelSum;

            ProductDeliverySumWithFuel = ProductDeliverySum + Number(ProductFuelSum);
            ProductVatSum = ProductDeliverySumWithFuel * (ProductVatRate/100);
            ProductDeliverySumWithVat = ProductDeliverySumWithFuel + ProductVatSum;
            // result_sum = ProductSumma * ProductCount;
            // result_tax = result_sum * (ProductVatRate / 100);
            // result_Fuelsum = ProductDeliverySum * (ProductFuelRate/100);
            //
            ProductSumma =  Math.round(ProductSumma*100)/100;
            ProductDeliverySum =  Math.round(ProductDeliverySum*100)/100;
            ProductVatRate =  Math.round(ProductVatRate*100)/100;
            ProductVatSum =  Math.round(ProductVatSum*100)/100;
            ProductDeliverySumWithVat =  Math.round(ProductDeliverySumWithVat*100)/100;
            ProductFuelSum =  Math.round(ProductFuelSum*100)/100;
            ProductFuelRate =  Math.round(ProductFuelRate*100)/100;
            ProductDeliverySumWithFuel =  Math.round(ProductDeliverySumWithFuel*100)/100;
            // result_tax = Math.round(result_tax*100)/100;
            // result_Fuelsum = Math.round(result_Fuelsum*100)/100;
            //
            // result_all_sum = Math.round((Number(result_sum) + Number(result_tax))*100)/100;
            //
            // if(ProductFuelRate==0){
            //     all_fule = 0;
            // } else {
            //     all_fule =  result_Fuelsum + result_all_sum;
            // }

            var new_data = {['ProductName']: ProductName,['ProductSumma']:ProductSumma, ['ProductMeasureId']:ProductMeasureId, ['ProductCount']:ProductCount,['ProductDeliverySum']: ProductDeliverySum,['ProductVatSum']: ProductVatSum,['ProductDeliverySumWithVat']: ProductDeliverySumWithVat,['ProductVatRate']:ProductVatRate,['ProductFuelRate']:ProductFuelRate,['ProductFuelSum']:ProductFuelSum,['ProductDeliverySumWithFuel']:ProductDeliverySumWithFuel};

            JsonMake[row_id] = new_data;
            $("#items_json").val(JSON.stringify(JsonMake));

            ProductDeliverySumArea.innerText = ProductDeliverySum;
            ProductVatSumArea.innerText = ProductVatSum;
            ProductDeliverySumWithVatArea.innerText = ProductDeliverySumWithVat;

            if(isAksis==1) {
                ProductFuelSumArea.innerText = ProductFuelSum;
                ProductDeliverySumWithFuelArea.innerText = ProductDeliverySumWithFuel;
            }
        }
    }
}



function CalcStandart(element,row_id) {
    // console.log(element.value);
    // console.log("ROW:"+row_id);
    // console.log(element.name);
    // console.log(element.id);
    var reason = "";
    if (isNaN(element.value)) {
        ShowMessage('danger', 'Kiritilgan qiymat raqam emas');
        element.value = "";
    } else {

        var ProductDeliverySumArea = document.getElementById("ProductDeliverySum_"+row_id);
        var ProductVatSumArea = document.getElementById("ProductVatSum_"+row_id);
        var ProductDeliverySumWithVatArea = document.getElementById("ProductDeliverySumWithVat_"+row_id);

        var ProductFuelSumArea = document.getElementById("ProductFuelSum_"+row_id);
        var ProductDeliverySumWithFuelArea = document.getElementById("ProductDeliverySumWithFuel_"+row_id);

        var JsonItems = document.getElementById("items_json").value;
        JsonItems = JSON.parse(JsonItems);
        var JsonMake = JsonItems;
        var ProductCount = 0;
        var ProductSumma = 0;
        var ProductDeliverySum = 0;
        var ProductVatRate = 0;
        var ProductVatSum = 0;
        var ProductDeliverySumWithVat = 0;

        var ProductFuelRate = 0;
        var ProductFuelSum = 0;
        var ProductMeasureId = 0;
        var ProductName ="";
        var ProductCatalogName ="";
        var ProductCatalogCode ="";
        var ProductDeliverySumWithFuel = 0;

        if(typeof JsonItems[row_id]!== 'undefined') {
            JsonItems = JsonItems[row_id];


            if (typeof JsonItems.ProductName !== 'undefined') {
                ProductName = JsonItems.ProductName;
            }

            if (typeof JsonItems.ProductCatalogName !== 'undefined') {
                ProductCatalogName= JsonItems.ProductCatalogName;
            }

            if (typeof JsonItems.ProductCatalogCode !== 'undefined') {
                ProductCatalogCode= JsonItems.ProductCatalogCode;
            }

            if (typeof JsonItems.ProductMeasureId !== 'undefined') {
                ProductMeasureId = JsonItems.ProductMeasureId;
            }

            if (typeof JsonItems.ProductCount !== 'undefined') {
                ProductCount = JsonItems.ProductCount;
            }
            if (typeof JsonItems.ProductSumma !== 'undefined') {
                ProductSumma = JsonItems.ProductSumma;
            }
            if (typeof JsonItems.ProductDeliverySum !== 'undefined') {
                ProductDeliverySum = JsonItems.ProductDeliverySum;
            }
            if (typeof JsonItems.ProductVatRate !== 'undefined') {
                ProductVatRate = JsonItems.ProductVatRate;
                // console.log("Qaysi:"+JsonItems.ProductVatRate);
            }
            if (typeof JsonItems.ProductVatSum !== 'undefined') {
                ProductVatSum = JsonItems.ProductVatSum;
            }
            if (typeof JsonItems.ProductDeliverySumWithVat !== 'undefined') {
                ProductDeliverySumWithVat = JsonItems.ProductDeliverySumWithVat;
            }


            if (typeof JsonItems.ProductFuelRate !== 'undefined') {
                ProductFuelRate = JsonItems.ProductFuelRate;
            }
            if (typeof JsonItems.ProductFuelSum !== 'undefined') {
                ProductFuelSum = JsonItems.ProductFuelSum;
            }
            if (typeof JsonItems.ProductDeliverySumWithFuel !== 'undefined') {
                ProductDeliverySumWithFuel = JsonItems.ProductDeliverySumWithFuel;
            }

            switch (element.name) {
                case "ProductCount":
                    ProductCount = element.value;
                    break;
                case "ProductSumma":
                    ProductSumma = element.value;
                    break;
                case "ProductDeliverySum":
                    ProductDeliverySum = element.value;
                    break;
                case "ProductVatRate":
                    ProductVatRate = element.value;
                    break;
                case "ProductVatSum":
                    ProductVatSum= element.value;
                    break;
                case "ProductDeliverySumWithVat":
                    ProductDeliverySumWithVat = element.value;
                    break;
                case "ProductFuelSum":
                    ProductFuelSum = element.value;
                    break;
                case "ProductFuelRate":
                    ProductFuelRate = element.value;
                    ProductFuelRate *=10;
                    ProductFuelSum = ProductSumma * (ProductFuelRate/100);
                    break;
                case "ProductDeliverySumWithFuel":
                    ProductDeliverySumWithFuel = element.value;
                    break;

            }
            // var isAksis = document.getElementById('TypeVat').checked;
            ProductDeliverySum = (ProductCount * ProductSumma)+ProductFuelSum;

            ProductDeliverySumWithFuel = ProductDeliverySum + Number(ProductFuelSum);
            ProductVatSum = ProductDeliverySum * (ProductVatRate/100);
            ProductDeliverySumWithVat = ProductDeliverySum + ProductVatSum;
            // result_sum = ProductSumma * ProductCount;
            // result_tax = result_sum * (ProductVatRate / 100);
            // result_Fuelsum = ProductDeliverySum * (ProductFuelRate/100);
            //
            ProductSumma =  Math.round(ProductSumma*100)/100;
            ProductDeliverySum =  Math.round(ProductDeliverySum*100)/100;
            ProductVatRate =  Math.round(ProductVatRate*100)/100;
            ProductVatSum =  Math.round(ProductVatSum*100)/100;
            ProductDeliverySumWithVat =  Math.round(ProductDeliverySumWithVat*100)/100;
            ProductFuelSum =  Math.round(ProductFuelSum*100)/100;
            ProductFuelRate =  Math.round(ProductFuelRate*100)/100;
            ProductDeliverySumWithFuel =  Math.round(ProductDeliverySumWithFuel*100)/100;
            // result_tax = Math.round(result_tax*100)/100;
            // result_Fuelsum = Math.round(result_Fuelsum*100)/100;
            //
            // result_all_sum = Math.round((Number(result_sum) + Number(result_tax))*100)/100;
            //
            // if(ProductFuelRate==0){
            //     all_fule = 0;
            // } else {
            //     all_fule =  result_Fuelsum + result_all_sum;
            // }

            var new_data = {['ProductName']: ProductName, ['ProductCatalogName']:ProductCatalogName, ['ProductCatalogCode']:ProductCatalogCode, ['ProductSumma']:ProductSumma, ['ProductMeasureId']:ProductMeasureId, ['ProductCount']:ProductCount,['ProductDeliverySum']: ProductDeliverySum,['ProductVatSum']: ProductVatSum,['ProductDeliverySumWithVat']: ProductDeliverySumWithVat,['ProductVatRate']:ProductVatRate,['ProductFuelRate']:ProductFuelRate,['ProductFuelSum']:ProductFuelSum,['ProductDeliverySumWithFuel']:ProductDeliverySumWithFuel};

            JsonMake[row_id] = new_data;
            $("#items_json").val(JSON.stringify(JsonMake));

            ProductDeliverySumArea.innerText = ProductDeliverySum;
            ProductVatSumArea.innerText = ProductVatSum;
            ProductDeliverySumWithVatArea.innerText = ProductDeliverySumWithVat;
            ProductFuelSumArea.innerText = ProductFuelSum;
            // JsonItems.forEach(function(element){
            //     console.log("Index:");
            // });
            var countAll = 0;
            // for(var itesm in JsonItems){
            //         console.log(itesm);
            // }

            // if(isAksis==1) {
            //     ProductFuelSumArea.innerText = ProductFuelSum;
            //     ProductDeliverySumWithFuelArea.innerText = ProductDeliverySumWithFuel;
            // }
        }
    }
}

function GetDataByTin(tin){

    if(tin.length==9){
        if (tin=="201122919") {
            if(lang=="ru") {
                ShowMessage("danger", "Указанный Вами ИНН (201122919) является ИНН Министерство финансов Республики Узбекистан.\n" +
                    "Если вы не отправляете счёт-фактуру в Министерство финансов Республики Узбекистан, укажите, пожалуйста, ИНН соответствующей бюджетной организации.")
            } else {

                ShowMessage("danger", "Ушбу\n" +
                    "201122919 СТИРи Ўзбекистон Республикаси Молия вазирлигига берилган.\n" +
                    "Сиз ҳисобварақ-фактурани Ўзбекистон Республикаси Молия вазирлигига\n" +
                    "юбормаётган бўлсангиз, тегишли бюджет ташкилотининг СТИР\n" +
                    "рақамини танлашингиз сўралади.")
            }
        }
        GetBuyer()
    }
}

function ChangeTypeFactura(type){
    console.log(type);
    if(type==1 || type==4){
        $("#old_factura_area").show();
    } else {
        $("#old_factura_area").hide();
    }
}

function EmpSwitch() {
    var isOneLevel = document.getElementById('EmpSwitcher').checked;
    if(isOneLevel==false){
        // $("#EmpArea").hide();
        $("#EmpArea").addClass("fadeOutDown");
    } else {
        $("#EmpArea").show();
        $("#EmpArea").removeClass("fadeOutDown");
    }
}

function EmpSwitchWithLabel() {
    var isOneLevel = document.getElementById('EmpSwitcher').checked;
    if(isOneLevel==false){
        document.getElementById('EmpSwitcher').checked = true;
        $("#EmpArea").show();
    } else {
        document.getElementById('EmpSwitcher').checked = false;
        // $("#EmpArea").hide();
    }
}

function GetDataByTinV2ForUpdate(tin){


    // SetLoader("BuyerInfoArea");
    $.ajax({
        url: '/api/get-company',
        method: 'POST',
        async: false,
        data: {
            tin: tin
        },
        success: function (data) {

            // data = JSON.parse(data);
            $("#SearchBtn").removeClass("kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info");
            if (data.success == true) {
                var htmls = data.html;
                data = data.data;

                document.getElementById("facturas-buyertin").value = tin;
                document.getElementById("facturas-buyername").value = data.name;
                document.getElementById("facturas-buyeraccount").value = data.account;
                document.getElementById("facturas-buyerbankid").value = data.mfo;
                document.getElementById("facturas-buyeraddress").value = data.address;
                document.getElementById("facturas-buyeroked").value = data.oked;
                document.getElementById("facturas-buyerdistrictid").value = pad(data.ns10Code, 2) + "" + pad(data.ns11Code, 2);
                document.getElementById("facturas-buyerdirector").value = data.director;
                document.getElementById("facturas-buyeraccountant").value = data.accountant;
                document.getElementById("facturas-buyervatregcode").value = data.regCode;
                // document.getElementById("BuyerInfoArea").innerHTML = htmls
            } else {
                document.getElementById("facturas-buyertin").value = "";
                document.getElementById("BuyerInfoArea").innerHTML= "<div class='animated fadeInUp'><div class='alert alert-outline-warning '>"+data.reason+"</div></div>";
            }
        },
        error: function (data) {
            document.getElementById("facturas-buyertin").value = "";
            ShowMessage('danger', 'Tarmoqda xatolik');
        }
    });

}

var old_tin="";

function ChangeStirData(){
    $(".change-info-block-wrapper").addClass("show-block");
    $(".info-block-wrapper").removeClass("show-block");
}

function GetDataByTinV2(tin){

    document.getElementById("BuyerTin").maxLength = "9";
    console.log(tin);
    // if (tin.length>9){
    //     // tin = old_tin;
    //     document.getElementById("BuyerTin").hasValue = old_tin;
    // }

    if(tin.length==9 && old_tin!=tin) {
        old_tin = tin;
        $.ajax({
            url: '/api/get-company',
            method: 'POST',
            // async: false,
            data: {
                tin: tin
            },
            success: function (data) {

                // data = JSON.parse(data);
                $("#SearchBtn").removeClass("kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info");
                if (data.success == true) {
                    var htmls = data.html;
                    data = data.data;

                    document.getElementById("facturas-buyertin").value = tin;
                    document.getElementById("facturas-buyername").value = data.name;
                    document.getElementById("facturas-buyeraccount").value = data.account;
                    document.getElementById("facturas-buyerbankid").value = data.mfo;
                    document.getElementById("facturas-buyeraddress").value = data.address;
                    document.getElementById("facturas-buyeroked").value = data.oked;
                    document.getElementById("facturas-buyerdistrictid").value = pad(data.ns10Code, 2) + "" + pad(data.ns11Code, 2);
                    document.getElementById("facturas-buyerdirector").value = data.director;
                    document.getElementById("facturas-buyeraccountant").value = data.accountant;
                    document.getElementById("facturas-buyervatregcode").value = data.regCode;
                    // document.getElementById("BuyerInfoArea").innerHTML = htmls
                    $(".change-info-block-wrapper").removeClass("show-block");
                    $(".info-block-wrapper").addClass("show-block");
                } else {
                    document.getElementById("facturas-buyertin").value = "";
                    document.getElementById("BuyerInfoArea").innerHTML= "<div class='animated fadeInUp'><p class='help-block help-block-error'>"+data.reason+"</p></div>";
                }
            },
            error: function (data) {
                document.getElementById("facturas-buyertin").value = "";
                ShowMessage('danger', 'Tarmoqda xatolik');
            }
        });
    }

}


function SetLoader(area) {
    document.getElementById(area).innerHTML = '<div class="loader-area"><img src="/img/favicon.png" width="45px" class="ld ld-bounce"></div>';
}

function GetBuyer() {
    var tin = document.getElementById("BuyerTin").value;
    document.getElementById("docs-buyertin").value = tin;
    var element = document.getElementById("SearchBtn");
    element.className +=" kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info";
    $.ajax({
        url: '/api/get-company',
        method: 'POST',
        async : false,
        data:{
            tin:tin
        },
        success: function(data){
            // data = JSON.parse(data);
            $("#SearchBtn").removeClass("kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info");
            if(data.success==true){
                data = data.data;

                document.getElementById("docs-buyername").value = data.name;
                document.getElementById("docs-buyeraccount").value = data.account;
                document.getElementById("docs-buyerbankid").value = data.mfo;
                document.getElementById("docs-buyeraddress").value = data.address;
                document.getElementById("docs-buyeroked").value =data.oked;
                document.getElementById("docs-buyerdistrictid").value = pad(data.ns10Code,2)+""+pad(data.ns11Code,2);
                document.getElementById("docs-buyerdirector").value = data.director;
                document.getElementById("docs-buyeraccountant").value = data.accountant;
                document.getElementById("docs-buyervatregcode").value = data.regCode;
            } else {
                ShowMessage("danger",data.reason)
            }
        },
        error: function(data) {
            $("#SearchBtn").removeClass("kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info");
            ShowMessage('danger','Remote connection failed. Check internet connection !!!');
        }
    });
}



function GetEnviromentDataByTin(tin){
    if(tin.length==9){
        GetEnviromentBuyer()
    }
}

function GetBuyerTinAct(tin){
    if(tin.length==9){
        GetActBuyer();
    }
}

function GetAgentTin(tin){
    if(tin.length==9){
        GetAgentData(tin)
    }
}
function GetAgentData(tin) {
    $.ajax({
        url: '/api/get-agent-tin',
        method: 'POST',
        async : false,
        data:{
            tin:tin
        },
        success: function(data){
            document.getElementById("empowerment-agentfio").value = data.fullName;
            document.getElementById("empowerment-agentpassportnumber").value = data.passSeries+data.passNumber;
            document.getElementById("empowerment-agentpassportdateofissue").value = data.passIssueDate;
            document.getElementById("empowerment-agentpassportissuedby").value = data.passOrg;
        },
        error: function(data) {
            // element.className.replace(/\bkt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info\b/,'');
            ShowMessage('danger','Remote connection failed. Check internet connection !!!');
        }
    });
}


function GetEnviromentBuyer() {
    var tin = document.getElementById("EnvBuyerTin").value;
    document.getElementById("empowerment-sellertin").value = tin;
    var element = document.getElementById("SearchEnvBtn");
    // element.className +=" kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info";
    $.ajax({
        url: '/api/get-company',
        method: 'POST',
        async : false,
        data:{
            tin:tin
        },
        success: function(data){
            // data = JSON.parse(data);
            // $("#SearchBtn").removeClass("kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info");
            // element.className.replace(/\bkt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info\b/,'');
            if(data.success==true){
                data = data.data;

                document.getElementById("empowerment-sellername").value = data.name;
                document.getElementById("empowerment-selleraccount").value = data.account;
                document.getElementById("empowerment-sellerbankid").value = data.mfo;
                document.getElementById("empowerment-selleraddress").value = data.address;
                document.getElementById("empowerment-selleroked").value =data.oked;
                document.getElementById("empowerment-sellerdistrictid").value = pad(data.ns10Code,2)+""+pad(data.ns11Code,2);
                document.getElementById("empowerment-sellerdirector").value = data.director;
                document.getElementById("empowerment-selleraccountant").value = data.accountant;
            } else {
                ShowMessage("danger",data.reason)
            }
        },
        error: function(data) {
            // element.className.replace(/\bkt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info\b/,'');
            ShowMessage('danger','Remote connection failed. Check internet connection !!!');
        }
    });
}

function GetActBuyer() {
    var tin = document.getElementById("acts-buyertin").value;
    document.getElementById('SearchEnvBtn').innerHTML = '<div class="spinner-border text-primary" role="status">\n' +
        '  <span class="sr-only"></span>\n' +
        '</div>';
    document.getElementById('alertArea').innerHTML = '';
    $.ajax({
        url: '/api/get-company',
        method: 'POST',
        // async : false,
        data:{
            tin:tin
        },
        success: function(data){
            document.getElementById('SearchEnvBtn').innerHTML = '<img src="/new_template/images/icon/search.svg" alt="">';
            if(data.success==true){

                data = data.data;
                document.getElementById("acts-buyername").value = data.name;
                var sellerName = document.getElementById("acts-sellername").value ;

                document.getElementById('acts-acttext').value = 'Биз қуйида имзо чекувчилар, '+sellerName+' бир томондан, бундан кейин Пудратчи деб номланади ва '+data.name +', иккинчи томондан, бундан кейин Буюртмачи деб номланади, Буюртмачининг талабларига мувофиқ иш тўлиқ бажарилганлиги тўғрисида далолатнома туздик.';
            } else {
                document.getElementById('alertArea').innerHTML = '<div class="alert alert-danger" role="alert">'+data.reason+'</div>';
            }
        },
        error: function(data) {
            document.getElementById('SearchEnvBtn').innerHTML = '<img src="/new_template/images/icon/search.svg" alt="">';
            document.getElementById('alertArea').innerHTML = '<div class="alert alert-danger" role="alert">Internet aloqasi mavjud emas yoki server javob bermayapti</div>';
        }
    });
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function ShowMessage(type, text) {
    var notify = $.notify(text, {
        type: type,
        allow_dismiss: true,
        newest_on_top: true,
        mouse_over:  true,
        showProgressbar:  false,
        spacing: 10,
        timer: 3000,
        placement: {
            from: 'top',
            align: 'right'
        },
        offset: {
            x: 30,
            y: 30
        },
        delay: 2000,
        z_index: 10000,
        animate: {
            enter: 'animated zoomInDown',
            exit: 'animated zoomOutUp'
        }
    });
}

function SaveReestr(){
    $("#Sendbtn").addClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
    $("#w0").submit();
}

function SaveFactura(){
    $("#Sendbtn").addClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
    var JsonItems = document.getElementById("items_json").value;
    JsonItems = JSON.parse(JsonItems);
    var JsonMake = "";
    var reason="";
    if(typeof JsonItems[1]== 'undefined') {
        reason="Maxsulotlar kiritilmagan";
        JsonMake = JsonItems[1];
    }

    if(reason==""){
        if(typeof JsonMake['ProductName']!=='undefined'){
            reason = "Maxsulot nomini kiriting";
        }
    }
    if(reason==""){
        if(JsonMake['ProductName']==""){
            reason = "Maxsulot nomini kiriting";
        }
    }

    if(reason==""){
        if(typeof JsonMake['ProductMeasureId']!=='undefined'){
            reason = "O`lchov birligini tanalang";
        }
    }
    if(reason==""){
        $("#w0").submit();
    } else {
        ShowMessage('warning',reason)
    }
}

function alertConfirm(_text, success) {
    swal({
        title: 'Предупреждение',
        text: _text,
        // html: true,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
    }).then((result) => {
        if (result.value) {
            success();
        }
    });
};


function alertReject(_text, success) {
    swal({
        title: 'Предупреждение',
        text: _text,
        html: '<textarea id="swal-area" class="swal2-textarea" placeholder="Bekor qilish sababini kiritng"></textarea>',
        // input: 'textarea',
        inputPlaceholder: "Rad etish sababini kiriting",

        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        preConfirm: () => {
            if (document.getElementById('swal-area').value) {
                // Handle return value
            } else {
                swal.showValidationError('Bekor qilish sababini kiritish majburiy')
            }
        }
    }).then((result) => {
        if (result.value) {
            console.log(result.value)
            success();
        }
    });
};

function RejectConfirm(_text, success) {
    swal({
        title: 'Предупреждение',
        text: "Сабабни курсатинг",
        type: 'input',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
    }).then((result) => {
        if (result.value) {
            success();
        }
    });
};

function  alertSuccess( _text ) {
    swal({
        position: 'center',
        type: 'success',
        title: 'Успешно',
        text: _text,
        timer: 5000
    });
};

function alertError( _text ) {
    swal({
        position: 'center',
        type: 'error',
        title: 'Ошибка',
        showCloseButton: true,
        text: _text
    });
};

function getTimestamp(context_url, signature_hex, callback, fail) {
    $.ajax({
        url: '/api/gettimestamp',
        method: 'POST',
        data: {
            signatureHex: signature_hex
        },
        success: function (data) {
            if (data.Success) {
                callback(data.Data);
            } else {
                fail(data.Reason);
            }
        },
        error: function (response) {
            fail(response);
        }
    });
}

function timestamper(signature_hex, callback, fail) {
    getTimestamp("/faktura/ru", signature_hex, callback, fail);
};

function failDsvs(a, b) {
    alert("failDsys:"+ (a ? a : "") + (b ? b : ""));
};

function SendData(id){
    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    // var facturaJson = $("#FacturaJson").val();
    $.ajax({
        type: "POST",
        url: "/api/get-json",
        data: {
            id: id
        },
        success: function (json) {
            var facturaJson = JSON.stringify(json);
            alertConfirm("Вы действительно хотите подписать и отправить эту счет фактуру?", function () {
                EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/doc/send",
                        data: {
                            facturaId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                location.href="/doc";
                            } else {
                                // ShowMessage('danger',json.reason);
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};



function SendFactura(factura_id){
    var keyId = window.localStorage.getItem("auth_key");
    // console.log(keyId);
    // var facturaJson = $("#FacturaJson").val();
    $.ajax({
        type: "POST",
        url: "/api-v2/get-json",
        data: {
            id: factura_id
        },
        success: function (json) {
            var facturaJson = JSON.stringify(json);
            // console.log(facturaJson);
            alertConfirm("Вы действительно хотите подписать и отправить эту счет фактуру?", function () {
                EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/ru/facturas/send",
                        data: {
                            facturaId: factura_id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                location.href="/facturas/view?id="+factura_id;
                            } else {
                                // ShowMessage('danger',json.reason);
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function SendAct(factura_id){
    var keyId = window.localStorage.getItem("auth_key");
    $.ajax({
        type: "POST",
        url: "/api-v2/get-act-json",
        data: {
            id: factura_id
        },
        success: function (json) {
            var facturaJson = JSON.stringify(json);
            alertConfirm("Вы действительно хотите подписать и отправить эту счет фактуру?", function () {
                EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/ru/act/send",
                        data: {
                            actId: factura_id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                location.href="/act/view?id="+factura_id;
                            } else {
                                // ShowMessage('danger',json.reason);
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function SendEmpowerment(id){
    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    // var facturaJson = $("#FacturaJson").val();
    $.ajax({
        type: "POST",
        url: "/api/get-json-emp",
        data: {
            id: id
        },
        success: function (json) {
            var facturaJson = JSON.stringify(json);
            alertConfirm("Вы действительно хотите подписать и отправить ?", function () {
                EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/empowerment/send",
                        data: {
                            facturaId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                location.href="/empowerment";
                            } else {
                                // ShowMessage('danger',json.reason);
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function DelteFac(id) {
    alertConfirm("Вы действительно хотите удалить?", function () {
        location.href="/doc/delete?id="+id;
    });
}


function DelteFactura(id) {
    alertConfirm("Вы действительно хотите удалить?", function () {
        location.href="/facturas/delete?id="+id;
    });
}

function DelteEmp(id) {
    alertConfirm("Вы действительно хотите удалить?", function () {
        location.href="/empowerment/delete?id="+id;
    });
}


function DelteEmpowerment(id) {
    alertConfirm("Вы действительно хотите удалить?", function () {
        location.href="/empowerment/delete?id="+id;
    });
}

function AcceptData(id){

    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    var SellerSign = $("#doc_sign").val();
    // console.log(facturaJson);
    alertConfirm("Вы действительно хотите принять этот счёт-фактуру?", function () {
        EIMZOClient.appendPkcs7Attached(keyId, SellerSign, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/doc/accept-data",
                data: {
                    facturaId: id,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        alertSuccess(json.Reason);
                        location.href="/facturas/view?id="+id;
                    } else {
                        alertError(json.reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });

};

function AcceptFactura(id){

    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    var SellerSign = $("#doc_sign").val();
    console.log(SellerSign);

    $.ajax({
        type: "POST",
        url: "/api-v2/get-signed",
        data: {
            factura_id: id,
        },
        success: function (SellerSign) {
            // console.log(SellerSign);
            alertConfirm("Вы действительно хотите принять этот счёт-фактуру?", function () {
                EIMZOClient.appendPkcs7Attached(keyId, SellerSign, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/uz/facturas/accept-data",
                        data: {
                            facturaId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/facturas/view?id="+id;
                            } else {
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });

};

function AcceptAct(id){

    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    // var SellerSign = $("#doc_sign").val();
    // console.log(SellerSign);

    $.ajax({
        type: "POST",
        url: "/api-v2/get-signed-act",
        data: {
            act_id: id,
        },
        success: function (SellerSign) {
            // console.log(SellerSign);
            alertConfirm("Вы действительно хотите принять этот акт?", function () {
                EIMZOClient.appendPkcs7Attached(keyId, SellerSign, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/uz/act/accept-data",
                        data: {
                            actId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/act/view?id="+id;
                            } else {
                                alertError(json.reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });

};

function AcceptEmpowerment(id){
    var keyId = window.localStorage.getItem("auth_key");
    $.ajax({
        type: "GET",
        url: "/empowerment/get-buyer-sign?id="+id,
        success: function (json) {
            console.log(json);
            if (json.success) {
                alertConfirm("Вы действительно хотите принять этот доверенность?", function () {
                    EIMZOClient.appendPkcs7Attached(keyId, json.data, timestamper, function (pkcs7) {
                        $.ajax({
                            type: "POST",
                            url: "/empowerment/accept-data",
                            data: {
                                facturaId: id,
                                sign: pkcs7
                            },
                            success: function (json) {
                                if (json.Success) {
                                    alertSuccess(json.Reason);
                                    location.href="/empowerment/view?id="+id;
                                } else {
                                    alertError(json.reason);
                                }
                            },
                            error: function (response) {
                                alertError(response);
                            }
                        });
                    }, failDsvs);
                });
            } else {
                alertError(json.reason);
            }
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function RejectedEmpowerment(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    $.ajax({
        type: "POST",
        url: "/api/get-json-emp",
        data: {
            id: id
        },
        success: function (json) {
            // json['Notes'] = notes;
            var signData = JSON.stringify({ Empowerment: json, Notes: notes });
            console.log(signData);
            alertConfirm("Вы действительно хотите отклонить этот доверенность?", function () {

                EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/empowerment/reject-data",
                        data: {
                            facturaId: id,
                            sign: pkcs7,
                            notes:notes
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href="/empowerment/view?id="+id;
                            } else {
                                alertError(json.Reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function RejectedData(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    $.ajax({
        type: "POST",
        url: "/api/get-json",
        data: {
            id: id
        },
        success: function (json) {
            // json['Notes'] = notes;
            var signData = JSON.stringify({ Factura: json, Notes: notes });
            console.log(signData);
            alertConfirm("Вы действительно хотите отклонить этот счёт-фактуру?", function () {

                EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/doc/reject-data",
                        data: {
                            facturaId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/facturas/view?id"+id;
                            } else {
                                alertError(json.Reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function RejectedFactura(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    $.ajax({
        type: "POST",
        url: "/api-v2/get-json",
        data: {
            id: id
        },
        success: function (json) {
            // json['Notes'] = notes;
            var signData = JSON.stringify({ Factura: json, Notes: notes });
            console.log(signData);
            alertConfirm("Вы действительно хотите отклонить этот счёт-фактуру?", function () {

                EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/uz/facturas/reject-data",
                        data: {
                            facturaId: id,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/facturas/view?id="+id;
                            } else {
                                alertError(json.Reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function RejectedAct(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    $.ajax({
        type: "POST",
        url: "/api-v2/get-act-json",
        data: {
            id: id
        },
        success: function (json) {
            // json['Notes'] = notes;


            alertReject("Вы действительно хотите отклонить этот акт?", function () {
                var notes = document.getElementById('swal-area').value;
                // console.log(notes);
                var signData = JSON.stringify({ Act: json, Notes: notes });
                EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/uz/act/reject-data",
                        data: {
                            actId: id,
                            notes:notes,
                            sign: pkcs7
                        },
                        success: function (json) {
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/act/view?id="+id;
                            } else {
                                alertError(json.Reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function CancelEmpData(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    // {"FacturaId":"5d24457313181100016b3286","SellerTin":"200523221"}
    var signData = document.getElementById("CaneledValue").value;

    console.log(signData);
    alertConfirm("Вы действительно хотите отменить этот доверенность?", function () {

        EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/empowerment/canceled-data",
                data: {
                    facturaId: id,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        alertSuccess(json.Reason);
                        location.href = "/empowerment/index";
                    } else {
                        alertError(json.Reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
};

function CancelFacturaData(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    // {"FacturaId":"5d24457313181100016b3286","SellerTin":"200523221"}
    var signData = document.getElementById("CaneledValue").value;

            console.log(signData);
            alertConfirm("Вы действительно хотите отменить этот счёт-фактуру?", function () {

        EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/doc/canceled-data",
                data: {
                    facturaId: id,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        alertSuccess(json.Reason);
                        location.href = "/doc/index";
                    } else {
                        alertError(json.Reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
};



function CancelFactura(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    // {"FacturaId":"5d24457313181100016b3286","SellerTin":"200523221"}
    var signData = document.getElementById("CaneledValue").value;

    console.log(signData);
    alertConfirm("Вы действительно хотите отменить этот счёт-фактуру?", function () {

        EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/uz/facturas/canceled-data",
                data: {
                    facturaId: id,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        alertSuccess(json.Reason);
                        location.href = "/facturas/view?id="+id;
                    } else {
                        alertError(json.Reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
};


function CancelAct(id){
    var keyId = window.localStorage.getItem("auth_key");
    var notes = "Bekor qilindi";
    // {"FacturaId":"5d24457313181100016b3286","SellerTin":"200523221"}
    var signData = document.getElementById("CaneledValue").value;

    console.log(signData);
    alertConfirm("Вы действительно хотите отменить этот акт?", function () {

        EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/uz/act/canceled-data",
                data: {
                    actId: id,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        alertSuccess(json.Reason);
                        location.href = "/act/view?id="+id;
                    } else {
                        alertError(json.Reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
};


function AcceptAferta(){

    var keyId = window.localStorage.getItem("auth_key");
    console.log(keyId);
    var facturaJson = $("#Aferta").text();

    EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
        $.ajax({
            type: "POST",
            url: "/api/aferta",
            data: {
                data: pkcs7
            },
            success: function (json) {
                if (json.Success) {
                    location.href="/";
                } else {
                    alertError(json.reason);
                }
            },
            error: function (response) {
                alertError(response);
            }
        });
    }, failDsvs);

};

function SwitchVat(id) {
    var isAksis = document.getElementById('TypeVat').checked;
    var type =0;
    var lang = document.getElementById('langs').value;
    document.getElementById('docs-hasfuel').value = 0;
    if(isAksis==true){
        type = 1;
        document.getElementById('docs-hasfuel').value = 1;
    }
// console.log(lang);
    $.ajax({
        url: "/"+lang+"/doc/switch-type",  //Server script to process data
        type: 'POST',
        data: {'type':type,'id':id},
        success: function(data) {
            if(data.success==true){
                document.getElementById('gridArea').innerHTML = data.html;
            }
        },
        error: function(data){
            data = data.responseJSON;
            alertError(data)
        },


    });

};


function SetTypeFactura(id) {
    var type=1;
    var lang = document.getElementById('langs').value;
    SetLoader('gridArea');
    $.ajax({
        url: "/"+lang+"/api-v2/products-grid",  //Server script to process data
        type: 'POST',
        data: {'type':type,'id':id},
        success: function(data) {
            if(data.success==true){
                document.getElementById('gridArea').innerHTML = data.html;
            }
        },
        error: function(data){
            data = data.responseJSON;
            alertError(data)
        },


    });
}

function SwitchTypeFac(id) {
    var isOneLevel = document.getElementById('CheckOnLevel').checked;
    if(isOneLevel==true){
        $("#SendLevelArea").hide();
    } else {
        $("#SendLevelArea").show();
    }

};

function SwitchSingleSlide(id) {
    var isOneLevel = document.getElementById('CheckOnLevel').checked;
    console.log(isOneLevel);
    if(isOneLevel==true){
        $(".BuyerTinArea").hide();
        $(".SingleSidedTypeArea").show();
    } else {
        $(".BuyerTinArea").show();
        $(".SingleSidedTypeArea").hide();
    }

};

function SaveCompanyUsers(){
    $("#SearchTinBtn").addClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
    $("#w1").submit();
}

function SearchPhysic() {
    $("#SearchTinBtn").addClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
    var tin = document.getElementById('SearchTINinput').value;
    $.ajax({
        url: '/api/saerch-physic',
        type: 'POST',
        data: {'tin':tin},
        success: function(data) {
            $("#SearchTinBtn").removeClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
            if(data.success==true){
                document.getElementById('companyusers-tin').value = tin;
                document.getElementById('resultSearchArea').innerHTML = data.html;
            } else {
                alertError(data.reason);
            }
        },
        error: function(data){
            $("#SearchTinBtn").removeClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
            data = data.responseJSON;
            alertError(data)
        },
    });
}

function AcceptRole(id){
    var facturaJson = document.getElementById("ID"+id).value;
    var keyId = window.localStorage.getItem("auth_key");
    alertConfirm("Вы действительно хотите подписать и разрешит ?", function () {
        EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/api/bind-role",
                data: {
                    id: id,
                    type:1,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        location.href="/company-users";
                    } else {
                        alertError(json.reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
}

function CancelRole(id){
    var facturaJson = document.getElementById("ID"+id).value;
    var keyId = window.localStorage.getItem("auth_key");
    alertConfirm("Вы действительно хотите подписать и отменить разрешения?", function () {
        EIMZOClient.createPkcs7(keyId, facturaJson, timestamper, function (pkcs7) {
            $.ajax({
                type: "POST",
                url: "/api/bind-role",
                data: {
                    id: id,
                    type:0,
                    sign: pkcs7
                },
                success: function (json) {
                    if (json.Success) {
                        location.href="/company-users";
                    } else {
                        alertError(json.reason);
                    }
                },
                error: function (response) {
                    alertError(response);
                }
            });
        }, failDsvs);
    });
}

function BindProvider(){
    var keyId = window.localStorage.getItem("auth_key");
    $.ajax({
        type: "POST",
        url: "/api/get-provider-json",
        success: function (json) {
            var signData = JSON.stringify(json);
            console.log(signData);
            alertConfirm("Вы действительно хотите ?", function () {
                EIMZOClient.createPkcs7(keyId, signData, timestamper, function (pkcs7) {
                    $.ajax({
                        type: "POST",
                        url: "/api/bind-provider",
                        data: {
                            sign: pkcs7
                        },
                        success: function (json) {
                            console.log(json);
                            if (json.Success) {
                                alertSuccess(json.Reason);
                                location.href = "/";
                            } else {
                                alertError(json.Reason);
                            }
                        },
                        error: function (response) {
                            alertError(response);
                        }
                    });
                }, failDsvs);
            });
        },
        error: function (response) {
            alertError(response);
        }
    });
};

function SetAlcoholName() {
    var row_id = "ProductName_"+document.getElementById("val_id").value;
    var id = document.getElementById("val_id").value;
    $("#kt_modal_4").modal('hide');
    document.getElementById(row_id).innerText = document.getElementById("all_name").value;

    var JsonItems = document.getElementById("items_json").value;
    JsonItems = JSON.parse(JsonItems);
    console.log(JsonItems[id]);
    if(typeof JsonItems[id]!== 'undefined') {
        JsonItems[id]["ProductName"] =  document.getElementById("all_name").value;
        document.getElementById("items_json").value = JSON.stringify(JsonItems);
    }

}

function AlcoGeneratForm(id) {
    var langs = document.getElementById('langs').value;
    $.ajax({
        url: "/" +langs+ "/extra/create-form",  //Server script to process data
        type: 'POST',
        // Form data
        data: {'id':id},
        datatype:'json',
        success: function(data) {
            if(data.success==true){
                document.getElementById('AlcoDynamicFormArea').innerHTML =data.html;
                AlcoholName();
            }
        },
        error: function(data){
            swal("Xatolik", data.message, "error");
        },
    });
}

function AlcoholName(){

    var form_items = document.getElementById('form-items').value;
    form_items = JSON.parse(form_items);
    var full_name = "";
    form_items.forEach(function (items) {
        full_name+= document.getElementById("name_"+items).value+"; ";
    });

    document.getElementById("all_name").value = full_name;
}

$(document).ready(function(){


    $(".nav-item").click(function () {
        var tab = $(this).children().attr('aria-controls');
        var key_factura = tab.substr(0,2);
        var type_factura = tab.substr(6,1);
        if(key_factura=="w1"){
            document.getElementById('facturas-facturatype').value=type_factura;
        }
       window.history.replaceState(null, null, "?tab="+tab);
    });



    $("#docs-reestr").change(function(e){
        var formData = new FormData($('#w0')[0]);
        $("#UploadBtn").addClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
        $.ajax({
            url: "/reestr/import-reestr",  //Server script to process data
            type: 'POST',
            // Form data
            data: formData,
            datatype:'json',
            success: function(data) {
                $("#UploadBtn").removeClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
                if(data.success==true){
                    document.getElementById('productItemsArea').innerHTML = data.html;
                    document.getElementById('reestrmain-json_data').value = data.data;
                    // document.getElementById('items_json').value = data.data;
                }
            },
            error: function(data){
                $("#UploadBtn").removeClass("kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light");
                console.log(data);
                data = data.responseJSON;

                swal("Xatolik", data.message, "error");
            },
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    });

});
