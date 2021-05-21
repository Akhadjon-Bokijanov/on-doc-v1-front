
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ClasscodeAjaxSearch from '../../../components/classcodes-ajax-search/classcodes-ajax-search.component'
import DynaGrid from '../../../components/dyna-grid/dyna-grid.component'
import { selectCurrentUser } from '../../../redux/user/user.selector'
import { get_home_config } from '../../../utils/home.config.provider'
//import HomePage from '../../common/home/home.component'
import green_excell from "../../../images/green-excell.svg";

const { Option } = Select;

const UserProducts = ({ user }) => {

    const { t } = useTranslation();
    const [spinning, setSpinning] = useState(false);    
    
    const { title, createTitle, createUrl, gridSourceUrl, gridConfig } = get_home_config("user-products");
    return (
        <div>
            <Spin spinning={spinning}>
                
                <div style={{borderRadius: 12, backgroundColor: '#fff'}}>
                    <div style={{padding: 24}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{fontSize: 16, fontWeight: 500}}>
                                Код / Наименование по Единому классификатору:
                            </div>
                            <div style={{ cursor: 'pointer', color: '#0FBE7B'}}>
                                
                                <img src={green_excell} alt="" style={{marginRight: 8}} />
                                Скачать список товаров
                            </div>
                        </div>
                        <ClasscodeAjaxSearch />
                        <p style={{fontSize: 12, width: 712, marginTop: 8}}>
                            Если в Классификаторе отсутствует нужный Вам товар/услуга, Вы можете воспользоваться опцией «Добавить новый товар или услугу» здесь: <a href="https://tasnif.soliq.uz/classifier/">https://tasnif.soliq.uz/classifier/</a>
                        </p>
                        <DynaGrid
                            
                            hideFilter
                            config={{...gridConfig, dataSourcePath: gridSourceUrl+`?tin=${user.tin}`}}
                        />
                    </div>
                    
                </div>

            </Spin>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(UserProducts)
