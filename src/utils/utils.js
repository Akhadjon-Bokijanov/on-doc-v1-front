import axios from "axios";

export const Generator = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//TEXT IN [] bracket
export const TextInBracket = text =>{
    return text.match(/\[(.*?)\]/)[1]
}

export const FetchUser = tin=>{
    let data = axios({
        url: `info/contragent-by-tin?tin=${tin}`,
        method: 'get'
    }).then(res=>res.data)

    return data;
}