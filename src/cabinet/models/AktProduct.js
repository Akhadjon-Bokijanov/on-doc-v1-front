export class AktProduct {
    "OrdNo"= 0;
    "Name"= "";
    "MeasureId"= "";
    "Count"= "";
    "Summa"= "";
    "TotalSum"= ""
}

export const ConvertGridToData = data=>{

    //0 ordNo
    //1 product name
    //2 measure
    //3 amount
    //4 price
    //6 total
    let res = [];
    if(Array.isArray(data)){
        //data.shift();
        data.forEach((row, index)=>{
            //console.log("row", row)
            if(index> 0){
                let m = new AktProduct()
                m.OrdNo = row[0].value;
                m.Name = row[1].value;
                m.MeasureId = row[2].value;
                m.Count = row[3].value;
                m.Summa = row[4].value;
                m.TotalSum = row[5].value;

                res.push(m);
            }
        })
    }
    return res;
}