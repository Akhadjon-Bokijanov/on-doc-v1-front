import React, { useState }  from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { Link, withRouter } from 'react-router-dom';
import './header.style.scss';
import LanguagesDropdown from "../language-dropdown/locale-dropdown";

import LeftSidebar from '../left-sidebar/left-sidebar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { logOut } from '../../redux/user/user.action';
import { connect } from 'react-redux';
import {useTranslation} from "react-i18next";

const Header = ({ user, logOut, location})=>{

    const {t} = useTranslation()

    window.onscroll = ()=>setActive(false);
    const [active, setActive] = useState(false);    
    return(<div><div className="header-main-component-container-main">
            <div style={{textAlign: "right", padding: '5px 40px', backgroundColor: 'rgba(0,0,0,0.1)'}}>{t("Call center")}: +998 71 200 11 22</div>
        <div className="header-main-component-container">
            <div className="header-main-conatainer">
                <span>
                    <Link to="/">
                        <img className="logo-on-doc-img" src="/assests/logo.png" alt="logo On Doc" /> <span style={{fontSize: 27, color: 'black', fontWeight: "bold"}}>Online<span style={{ color: "rgb(0,174,255)" }}>Factura</span></span>
                    </Link>
                </span>
                <div className="heasder-actions-con">
                    {
                        user ?
                            <div className="header-action" style={{display: "flex", alignItems: "center"}}>
                                <FontAwesomeIcon className="header-action-icon" icon="wallet" />  <strong style={{marginLeft: 10}}> 40500.00</strong>
                            </div>
                            :null
                    }
                    <LanguagesDropdown />
                    {
                        user ?
                        <div className="header-action">
                            <strong>{t("STIR")}:</strong>  {user.tin}
                        </div>
                        : null
                    }
                    {
                        user ? 
                        <div className="header-action">
                            
                            <Tooltip title={t("Tizimdan chiqish")}>
                                <div style={{cursor: 'pointer'}} onClick={logOut}>
                                    <FontAwesomeIcon icon="sign-in-alt" className="header-action-icon" />
                                </div>
                            </Tooltip>
                        </div>
                        : <div className="header-action">
                                <Tooltip title={t("Tizimga kirish") }>
                                    <Link to="/home/login">
                                        <FontAwesomeIcon icon="sign-in-alt" className="header-action-icon" />
                                    </Link>
                                </Tooltip>
                        </div>
                    }
                    <Hamburger className="burger-main" toggled={active} toggle={setActive} />
                </div>
            </div>
        </div>
    </div>
    <LeftSidebar active={active} />
</div>
    )
}

const mapDispatchToProps = dispatch =>({
    logOut: ()=>dispatch(logOut())
})

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));