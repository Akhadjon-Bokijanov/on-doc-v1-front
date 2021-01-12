import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './left-sidebar.style.scss';

const LeftSidebar = ({ active })=>{

    return(
        <div className={`side-bar-icons-main-container ${active ? "inactive" : "active"}`}>
                <div className="sidebar-iconsconyainer">
                    <div><FontAwesomeIcon icon="home" /></div>
                    <div><FontAwesomeIcon icon="info-circle" /></div>
                    <div><FontAwesomeIcon icon="user-cog" /></div>
                    <div><FontAwesomeIcon icon="certificate" /></div>
                    <div><FontAwesomeIcon icon="check-square" /></div>
                    <div><FontAwesomeIcon icon="question-circle" /></div>
                    <div><FontAwesomeIcon icon="address-card" /></div>
                </div>
            </div>
    )
}

export default LeftSidebar;