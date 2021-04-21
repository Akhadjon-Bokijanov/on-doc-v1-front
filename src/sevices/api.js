import axios from "axios";
import {API_HOST} from "../env";
import {getToken} from "./tokenService";

const token =getToken();
const axiosInstance = axios.create({
    baseURL:API_HOST,
    headers:{
        Authorization:token ? `Bearer ${token}` : undefined
    }
})

export default axiosInstance;