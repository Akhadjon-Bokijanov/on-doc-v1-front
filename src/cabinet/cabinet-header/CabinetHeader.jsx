import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './cabinet-header.style.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import wallet from "../../images/wallet.svg"
import settings from "../../images/settings.svg";
import question_mark from "../../images/question_mark.svg";
import chat from "../../images/chat.svg";
import LanguagesDropdown from '../../components/language-dropdown/locale-dropdown';

const CabinetHeader = ({ user }) => {

    const { t } = useTranslation()

    return (
        <div className="cabinet-header-main-con" style={{height:'88px'}}>
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
                        <div style={{ display: 'flex' }}>
                            <img className="wallet-img" src={wallet} alt=""/>
                            <div>
                                <div><strong>{t("Balansingiz")}</strong></div>
                                {45000}
                            </div>
                        </div>
                    </div>
                    <div className="ch-action-container">
                        <div>
                            <Link to="/home/tarrifs">
                                <button className="custom-primary-btn">{t("Tarif aktivlashtiring")}</button>
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
                        <img src={settings} alt=""/>
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
