export function DateFormat(dateProp){
    const parsedDate = new Date(dateProp);
    let date = parsedDate.getDate().toString();
    let month = parsedDate.getMonth();
    month = month.toString();
    if(date.length === 1) date = '0'+ date;
    if(month.length === 1) month = '0'+ month;
    const dateStr = date+'-'+month+'-'+parsedDate.getFullYear();
    return dateStr;
}
