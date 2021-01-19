import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './left-sidebar.style.scss';
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';

const LeftSidebar = ({ active })=>{

    return(
        <div className={`side-bar-icons-main-container ${active ? "inactive" : "active"}`}>
                <div className="sidebar-iconsconyainer">
                    <div>
                        <Tooltip placement="left" color="#0075ff" title="Bosh sahifa">
                            <Link to="/home">
                                <FontAwesomeIcon icon="home" />
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="left" color="#0075ff" title="Ma'lumotlar">
                            <Link to="/home/info">
                                <FontAwesomeIcon icon="info-circle" />
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="Kabinet" color="#0075ff" placement="left">
                            <Link to="/cabinet"><FontAwesomeIcon icon="user-cog" /></Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title="Xavfsizlik" color="#0075ff" placement="left">
                            <Link to="/home/certificate"><FontAwesomeIcon icon="certificate" /></Link>
                        </Tooltip>
                        </div>
                    <div><Link to="/home/quality"><FontAwesomeIcon icon="check-square" /></Link></div>
                    <div><Link to="/home/faq"><FontAwesomeIcon icon="question-circle" /></Link></div>
                    <div><Link to="/home/someurl"><FontAwesomeIcon icon="address-card" /></Link></div>
                </div>
            </div>
    )
}

export default LeftSidebar;