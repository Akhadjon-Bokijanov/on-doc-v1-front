import SelectMeasureEditor from "../../components/data-sheet-custom-measure-selector/custom-selector.component";
import MeasureViewer from "../../components/data-sheet-custom-measure-selector/measure-viewer";

export class AktProduct {
    "OrdNo"= 0;
    "Name"= "";
    "MeasureId"= "";
    "Count"= "";
    "Summa"= "";
    "TotalSum"= ""
}

export const ConvertDataToGrid = data=>{
    let res = [];
    if(Array.isArray(data)){
        data.forEach(row=>{
            //console.log(row)
            let item = 
            [
                { value: row.OrdNo, readOnly: true},
                { value: row.Name },
                { value: row.MeasureId, valueViewer: MeasureViewer, dataEditor: SelectMeasureEditor },
                { value: row.Count },
                { value: row.Summa },
                { value: row.TotalSum, readOnly: true}
            ]
            res.push(item);
        })
    }
    return res;
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