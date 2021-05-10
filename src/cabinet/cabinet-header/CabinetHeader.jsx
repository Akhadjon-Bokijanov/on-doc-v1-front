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

const CabinetHeader = ({ user,match }) => {

    const { t } = useTranslation()

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
                             <div className="flexible">
                                <img className="wallet-img" src={wallet} alt=""/>
                                <div>
                                    <div><span style={{fontSize:'14px',color:'black'}}>{t("Balansingiz")}</span></div>
                                    <strong style={{fontSize:'18px'}}>150000</strong>
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
                        <FontAwesomeIcon icon="tools" style={{fontSize: 18}} />
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
