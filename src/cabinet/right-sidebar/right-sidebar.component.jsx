import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import './right-sidebar.style.scss';

const RightSidebar = ({ match }) => {

    console.log(match)

    return (
        <div className="cabiner-right-sidebar-cmain-container">
            <div className="cabiner-right-sidebar-sub-container">
                <div className="cabinet-documents-action-containers-bloks">
                    <Link to="/cabinet">
                        <div className={`action-bloks`}>
                            <FontAwesomeIcon icon="home" /> Bosh sahifa
                        </div>
                    </Link>
                    <Link to="/cabinet/factura">
                        <div className="action-bloks active">
                            <FontAwesomeIcon icon="file-invoice" className="action-icon" /> Faktura
                        </div>
                    </Link>
                    <Link to="/cabinet/contract">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-contract" className="action-icon"/> Shartnoma
                        </div>
                    </Link>
                    <Link to="/cabinet/act">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon={["far", "file-alt"]} className="action-icon"/> Akt
                        </div>
                    </Link>
                    <Link to="/cabinet/empowerment">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-signature" className="action-icon"/>Ishonchnoma
                        </div>
                    </Link>
                    <Link to="/cabinet/tty">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon={["far", "file-archive"]} className="action-icon"/> TTY
                        </div>
                    </Link>
                    <Link to="/cabinet/free-template">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-invoice-dollar"  className="action-icon"/> Erkin hujjat
                        </div>
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default withRouter(RightSidebar);
