import { message } from "antd";
import axios from "axios";
import { EIMZOClient } from "./e-imzo";

export const SignDoc = (key_id, data, doc_type, tin)=>{
    
    //doc_type values:
    //facturas, emp, act

    let url = `${doc_type}/send?tin=${tin}`;
    console.log(data)
    EIMZOClient.createPkcs7(
        key_id, JSON.stringify(data),
        null,
        (pkcs7)=>{
            //send signed file here
            axios({
                url,
                method: 'post',
                data: {
                    Sign: pkcs7
                }
            }).then(res=>{
                message.success("Hujjat imzolandi!")

                if(res.data?.success){
                    return Promise.resolve()
                }else{
                    return Promise.reject(res.data?.reason)
                }
            }).catch(err=>{
                message.error("Hujjat imzolashda xatolik!");
                return Promise.reject(err);
            })
        },
        (e, r)=>{
            //message.error(r);
            return Promise.reject(r);
        }
    )
}

