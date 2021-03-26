import { Modal, Spin, Checkbox, message } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PROVIDER } from '../../env';
import { logOut } from '../../redux/user/user.action';
import { selectCurrentUser, selectLoadedKey } from '../../redux/user/user.selector';
import { EIMZOClient } from '../../utils/e-imzo';

const BindRoumingPopup = ({ user, signOut, loadedKey }) => {

    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(!user?.is_online);
    const [okDisable, setOkDisable] = useState(true)
    const [afertaText, setAfertaText] = useState();

    useEffect(() => {
        axios({
            url: `info/get-bind-provider?tin=${user.tin ?? user.username}`,
            method: "get"
        }).then(res => {
            
            setAfertaText(JSON.stringify({
                providers: [...res.data.providers, PROVIDER] 
            }))
            
        }).catch(ex => {
            console.log(ex);
        })
    }, [])

    const handleOk = () => {
        setIsOpen(false)
        EIMZOClient.createPkcs7(
            loadedKey.id,
            afertaText,
            null,
            pkcs7 => {

                axios({
                    url: 'user/bind-provider',
                    method: "post",
                    data: {
                        tin: user.tin ?? user.username,
                        sign: pkcs7
                    }
                }).then(res => {
                    console.log(res)
                }).catch(ex => {
                    console.log(ex);
                })
            },
            (e, r) => {
                message(r);
            },
            (e, r) => {
                message(r);
            },
        )
    }
    const handleCancel = () => {
        setIsOpen(false);
        //signOut()
    }

    const handleAgree = e => {
        //console.log(data)
        if (e.target.checked) {
            setOkDisable(false)
        } else {
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
                zIndex={999}
                title={t("Roumingga operatori sifatida qo'shing?")}
                maskClosable={false}
            >
                <div style={{ top: 0, width: '100%', bottom: 20, height: '40vh'}}>
                    {t("Bini rouming operatoringiz sifatida ornating.")}
                </div>

                <br />

                <Checkbox onChange={handleAgree} /><span style={{ marginLeft: 20 }}>{t("Roziman.")}</span>
            </Modal>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    loadedKey: selectLoadedKey
})
const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoumingPopup)
