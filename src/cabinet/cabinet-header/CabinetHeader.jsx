import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './cabinet-header.style.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import wallet from "../../images/wallet.svg"
import question_mark from "../../images/green-question-mark.svg";
import chat from "../../images/bell-icon.svg";
import eye from "../../images/black-eye.svg";
import left_text from "../../images/left_align-text.svg"
import LanguagesDropdown from '../../components/language-dropdown/locale-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown, Switch } from 'antd';
import FontSizeChanger from "react-font-size-changer";

const { SubMenu } = Menu;


const CabinetHeader = ({ user,match }) => {

    const { t, i18n } = useTranslation()
    const [dropDownVisible, setDropDownVisible] = useState(false)
    

    const settings_menu = (
        <Menu style={{width: 288, right: -32, top: 30}}>
            <SubMenu
            style={{padding: '0px'}} 
            title={<LanguagesDropdown />} icon={null}>
                <Menu.Item onClick={() => {
                        //changeLocale('uz'); 
                        i18n.changeLanguage('uz')
                    }}>
                        <img style={{ width: 18, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> O'zb
                </Menu.Item>
                <Menu.Item onClick={() => {
                        //changeLocale('uz');
                        i18n.changeLanguage('uz-Cyrl')
                    }}>
                        <img style={{ width: 18, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> Ўзб
                </Menu.Item>
                    <Menu.Item onClick={() => {
                        //changeLocale('ru'); 
                        i18n.changeLanguage('ru')
                    }}>
                        <img style={{ width: 18, borderRadius: '50%' }} alt="languange" src="/images/ru.png" /> Pyc
                </Menu.Item>
                    <Menu.Item onClick={() => {
                        //changeLocale('en'); 
                        i18n.changeLanguage('en')
                    }}>
                        <img style={{ width: 18, borderRadius: '50%' }} alt="languange" src="/images/en.png" /> Eng
                </Menu.Item>
            </SubMenu>
            <Menu.Item style={{padding: '12px 18px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={eye} alt="" style={{marginRight: 10}} />
                    <div>Режим для слабовидящих</div>
                    <div>
                        <Switch 
                        //style={{ backgroundColor: '#2B63C0'}} 
                        />
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item style={{ padding: '12px 18px' }}>
                <div id={'chances'} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={left_text} alt="text" style={{ marginRight: 10 }} />
                        <div>
                            {t("Text size")}
                        </div>
                    </div>

                    <div>
                        <FontSizeChanger
                            
                            targets={['#target .resizer']}
                            options={{
                                stepSize: 1,
                                range: 10
                            }}
                            customButtons={{
                                down:<div>-</div>,
                                up: <div>+</div>,
                                style: {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    border: 'none',
                                    height: 22,
                                    width: 30,
                                    marginLeft: 25,
                                    display: 'flex',
                                    alignItems: 'center'
                                     
                                }
                            }}
                        />
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    )




    return (
        // <div className="block">
            <div className="cabinet-header-main-con">
                <div className="ch-sub-container">
                    <div className="ch-user-info-con-1">
                        <div><span className={'username'}>{user.name}</span></div>
                        <div><span className={'tin'}>{user.tin}</span> </div>
                    </div>
                    <div className="ch-user-info-con-2">
                        {/* <div>
                        <LanguagesDropdown />
                    </div> */}
                    <div className="ch-action-container">
                        <Link to='/cabinet/balance'>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <div style={{marginRight: 10}}>
                                <img className="wallet-img" src={wallet} alt=""/>
                            </div>
                            <div>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 7}}>
                                    <div style={{ height: 16,fontSize: 14, color: "#303030"}} >{t("Balansingiz")}</div>
                                    <div style={{ height: 20,fontSize: 18, color: "#2B63C0", fontWeight: "bold"}}>{45000}</div>
                                </div>

                            </div>
                            
                        </div>
                        </Link>
                    </div>
                    <div className="ch-action-container">
                        <div>
                            <Link to="/cabinet/tariffs">
                                <button style={{ cursor: 'pointer', fontSize: 12 }} className="custom-primary-btn">{t("Tarif aktivlashtiring")}</button>
                            </Link>
                        </div>
                    </div>
                        <div className="ch-action-container">
                            <img src={chat} alt=""/>
                        </div>
                        <div className="ch-action-container">
                            <img src={question_mark} alt=""/>
                        </div>
                        <div className="ch-action-container">
                            <Dropdown 
                            overlay={settings_menu} 
                            trigger={["click"]}
                            onVisibleChange={setDropDownVisible}
                            visible={dropDownVisible}
                            >
                                <FontAwesomeIcon icon="tools" style={{fontSize: 18}} />
                            </Dropdown>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(CabinetHeader)
