import axios from "axios";

export const bringdata = {
    getData:(url)=>{
        return axios.get(url);
    }
}