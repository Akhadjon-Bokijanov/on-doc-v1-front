import {axiosInstanceWthoutToken} from './apiWithoutTokens'

const apiForPass = '/api/v1/login-For-password';
const apiForEKeys = '/site/auth';
export const loginApi = {
    login:(data)=>{
        return axiosInstanceWthoutToken.post(apiForPass,data);
    },
    loginWithEKeys:(data)=>{
        return axiosInstanceWthoutToken.post(apiForEKeys,data)
    }

}