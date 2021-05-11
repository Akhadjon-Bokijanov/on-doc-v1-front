import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './cabinet-header.style.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import wallet from "../../images/wallet.svg"
import question_mark from "../../images/green-question-mark.svg";
import chat from "../../images/bell-icon.svg";
import LanguagesDropdown from '../../components/language-dropdown/locale-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Dropdown } from 'antd';

const { SubMenu } = Menu;

const CabinetHeader = ({ user,match }) => {

    const { t, i18n } = useTranslation()

    

    const settings_menu = (
        <Menu style={{width: 288, right: -32, top: 30}}>
            <SubMenu title={<LanguagesDropdown />} icon={null}>
                <Menu.Item onClick={() => {
                        //changeLocale('uz'); 
                        i18n.changeLanguage('uz')
                    }}>
                        <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> O'zb
                </Menu.Item>
                <Menu.Item onClick={() => {
                        //changeLocale('uz');
                        i18n.changeLanguage('uz-Cyrl')
                    }}>
                        <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> Ўзб
                </Menu.Item>
                    <Menu.Item onClick={() => {
                        //changeLocale('ru'); 
                        i18n.changeLanguage('ru')
                    }}>
                        <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/ru.png" /> Pyc
                </Menu.Item>
                    <Menu.Item onClick={() => {
                        //changeLocale('en'); 
                        i18n.changeLanguage('en')
                    }}>
                        <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/en.png" /> Eng
                </Menu.Item>
            </SubMenu>
            
        </Menu>
    )


    return (
        <div className="cabinet-header-main-con">
            <div className="ch-sub-container">
                <div className="ch-user-info-con-1">
                    <div><strong>{user.name}</strong></div>
                    <div>{user.tin}</div>
                </div>
                <div className="ch-user-info-con-2">
                    <div>
                        <LanguagesDropdown />
                    </div>
                    <div className="ch-action-container">
                        <Link to='/cabinet/balance'>
                        <div style={{ display: 'flex' }}>
                            <img className="wallet-img" src={wallet} alt=""/>
                            <div>
                                    <div style={{ fontSize: 14, color: "#303030"}} >{t("Balansingiz")}</div>
                                <div style={{ fontSize: 18, color: "#2B63C0", fontWeight: "bold"}}>{45000}</div>
                            </div>
                            </div>
                        </Link>

                    </div>
                    <div className="ch-action-container">
                        <div>
                            <Link to="/cabinet/tariffs">
                                <button style={{cursor:'pointer'}} className="custom-primary-btn">{t("Tarif aktivlashtiring")}</button>
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
                        <Dropdown overlay={settings_menu} trigger={["click"]}>
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
