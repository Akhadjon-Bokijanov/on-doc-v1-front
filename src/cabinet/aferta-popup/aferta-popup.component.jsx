import { Modal, Spin, Checkbox, message } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logOut } from '../../redux/user/user.action';
import { selectCurrentUser, selectLoadedKey } from '../../redux/user/user.selector';
import { EIMZOClient } from '../../utils/e-imzo';

const AfertaPopup = ({ user, signOut, loadedKey }) => {

    const { t } = useTranslation() 

    const [afertaText, setAfertaText] = useState("");
    const [isOpen, setIsOpen] = useState(!user?.is_aferta);
    const [okDisable, setOkDisable] = useState(true)

    useEffect(()=>{
        axios({
            url: "info/get-aferta",
            method: "get"
        }).then(res=>{
            if(res.data.success){
                setAfertaText(res.data.data)
            }
        }).catch(ex=>{
            console.log(ex);
        })
    }, [])

    const handleOk = () => {
        setIsOpen(false)
        EIMZOClient.createPkcs7(
            loadedKey.id, 
            afertaText, 
            null, 
            pkcs7=>{

                console.log(JSON.stringify({
                    tin: user.tin ?? user.username,
                    pkcs7: pkcs7
                }))

                axios({
                    url: 'user/set-aferta',
                    method: "post",
                    data: {
                        tin: user.tin ?? user.username,
                        pkcs7: pkcs7
                    }
                }).then(res=>{
                    console.log(res)
                }).catch(ex=>{
                    console.log(ex);
                })
            },
            (e, r)=>{
                message(r);
            },
            (e, r) => {
                message(r);
            },
        )
    }
    const handleCancel = ()=>{
        setIsOpen(false);
        signOut()
    }

    const handleAgree = e=>{
        //console.log(data)
        if(e.target.checked){
            setOkDisable(false)
        }else{
            setOkDisable(true)
        }
    }

    return (
        <div>
            <Modal
                keyboard={false}
                closable={false}
                onCancel={handleCancel}
                onOk={handleOk}
                visible={isOpen}
                okButtonProps={{ disabled: okDisable }}
                title={t("Afertaga rozimisiz?")}
                maskClosable={false}
            >
                <div style={{ top: 0, width: '100%', bottom: 20, height: '60vh', overflowY: 'scroll'}}>
                    {
                        afertaText ?? <Spin />
                    }
                </div>
                
                <br />

                <Checkbox onChange={handleAgree} /><span style={{marginLeft: 20}}>{t("Roziman.")}</span>
            </Modal>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    loadedKey: selectLoadedKey
})
const mapDispatchToProps = dispatch => ({
    signOut: ()=>dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(AfertaPopup)
