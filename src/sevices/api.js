import {useContext} from "react";
import axios from 'axios'
import {API_HOST} from "../env";

// const token = localStorage.getItem('bearer_token')
//     const {token} = useContext(UserContext);
const axiosInstance=axios.create({
        baseURL:API_HOST
    })


const token = localStorage.getItem("bearer");
axiosInstance.interceptors.request.use(
    request => {
        request.headers.Authorization =`Bearer ${token}`
        return request;
    },
    error => {
        return error;
    }
);
export default axiosInstance;