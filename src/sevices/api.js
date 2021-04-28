import axios from 'axios'
import {message} from "antd";

const guidUrl='info/get-guid'
export const generateId=()=>{
    return axios.get(`${guidUrl}`)
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        try{
            if(error.response.status === 400 ||error.response.status === 401 || error.response.status === 402){
                //localStorage.removeItem("token");
                //window.location.replace("/login");
                message.error("Error status is started with 400")
            }else if(error.response.status>499) {
                message.error("Server Errrrror")
            }
        }catch(err){
            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);


