import axiosInstance from "./api";

const apiForPass = '/api/v1/login-For-password';
const apiForEKeys = '/site/auth';
export const loginApi = {
    login:(data)=>{
        return axiosInstance.post(apiForPass,data);
    },
    loginWithEKeys:(data)=>{
        return axiosInstance.post(apiForEKeys,data)
    }

}