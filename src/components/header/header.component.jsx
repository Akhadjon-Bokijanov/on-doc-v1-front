import React, { useState }  from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import './header.style.scss';

import LeftSidebar from '../left-sidebar/left-sidebar.component';

const Header = ()=>{

    const [active, setActive] = useState(false);    
    return(<div><div className="header-main-component-container-main">
        <div className="header-main-component-container">
            <div className="header-main-conatainer">
                <span>
                    <Link to="/">
                        <img className="logo-on-doc-img" src="/assests/logo.png" alt="logo On Doc"/>
                    </Link>
                </span>
                <Hamburger className="burger-main" toggled={active} toggle={setActive} />
            </div>
        </div>
    </div>
    <LeftSidebar active={active} />
</div>
    )
}

export default Header;