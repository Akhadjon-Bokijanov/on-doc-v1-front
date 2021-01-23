import React, { useState }  from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import './header.style.scss';

import LeftSidebar from '../left-sidebar/left-sidebar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { logOut } from '../../redux/user/user.action';
import { connect } from 'react-redux';

const Header = ({ user, logOut})=>{

    window.onscroll = ()=>setActive(false);
    const [active, setActive] = useState(false);    
    return(<div><div className="header-main-component-container-main">
        <div className="header-main-component-container">
            <div className="header-main-conatainer">
                <span>
                    <Link to="/">
                        <img className="logo-on-doc-img" src="/assests/logo.png" alt="logo On Doc"/>
                    </Link>
                </span>
                <div className="heasder-actions-con">
                    {
                        user ? 
                        <Tooltip title="Tizimdan chiqish">
                            <div style={{cursor: 'pointer'}} onClick={logOut}>
                                <FontAwesomeIcon icon="sign-in-alt" className="header-action-icon" />
                            </div>
                        </Tooltip>
                        : <Tooltip title="Tizimga kirish">
                        <Link to="/home/login">
                            <FontAwesomeIcon icon="sign-in-alt" className="header-action-icon" />
                        </Link>
                    </Tooltip>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);