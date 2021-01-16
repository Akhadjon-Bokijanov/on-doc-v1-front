import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './right-sidebar.style.scss';

const RightSidebar = () => {
    return (
        <div className="cabiner-right-sidebar-cmain-container">
            <div className="cabiner-right-sidebar-sub-container">
                <div className="cabinet-documents-action-containers-bloks">
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="home" /> Bosh sahifa
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> Faktura
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> Shartnoma
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> Akt
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> Ishonchnoma
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> TTY
                    </div>
                    <div className="action-bloks">
                        <FontAwesomeIcon icon="file-invoice" /> Erkin hujjat
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default RightSidebar
