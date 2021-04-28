import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ClasscodeAjaxSearch from '../../../components/classcodes-ajax-search/classcodes-ajax-search.component'
import { selectCurrentUser } from '../../../redux/user/user.selector'
import HomePage from '../../common/home/home.component'

const { Option } = Select;

const UserProducts = ({ user }) => {

    const { t } = useTranslation();
    const [spinning, setSpinning] = useState(false);    
    
    const handleFetchTasnifSoliq = ()=>{
        setSpinning(true)
        axios({
            url: `classifications/reload?tin=${user.tin??user.username}`,
            method: "GET"
        }).then(res=>{
            setSpinning(false)
            //window.location.reload()
        }).catch(ex=>{
            setSpinning(false)
        })
    }

    return (
        <div>
            <Spin spinning={spinning}>
                <ClasscodeAjaxSearch />
            <HomePage 
            
            hideTabs
                customButton={<div 
                    style={{ cursor: "pointer" }}
                    onClick={handleFetchTasnifSoliq}><span><FontAwesomeIcon icon="sync-alt" /> {t("Synxronizatsiya")}</span></div>}
            doc="user-products"
            addParams={[
                {
                    name: "tin",
                    value: user.tin ?? user.username
                }
            ]}
            />
            </Spin>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(UserProducts)
