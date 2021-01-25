import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'antd';
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './right-sidebar.style.scss';

const RightSidebar = ({ match }) => {

    const [awaitings, setAwaitings] = useState({
        factura: 0,
        contract: 0,
        empowerment: 0,
        act: 0,
        tty: 0,
        freeDoc: 0,
    })

    return (
        <div className="cabiner-right-sidebar-cmain-container">
            <div className="cabiner-right-sidebar-sub-container">
                <div className="cabinet-documents-action-containers-bloks">
                    <Link to="/cabinet">
                        <div className={`action-bloks active`}>
                            <FontAwesomeIcon icon="home" /> Bosh sahifa
                        </div>
                    </Link>
                    <Link to="/cabinet/factura">
                            <div className="action-bloks">
                                <FontAwesomeIcon icon="file-invoice" className="action-icon" /> Faktura
                                <Badge style={{marginLeft: 10}} count={12} />
                            </div>
                    </Link>
                    <Link to="/cabinet/contract">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-contract" className="action-icon"/> Shartnoma
                            <Badge style={{marginLeft: 10}} count={2} />
                        </div>
                    </Link>
                    <Link to="/cabinet/act">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon={["far", "file-alt"]} className="action-icon"/> Akt
                            <Badge style={{marginLeft: 10}} count={4} />
                        </div>
                    </Link>
                    <Link to="/cabinet/empowerment">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-signature" className="action-icon"/>Ishonchnoma
                            <Badge style={{marginLeft: 10}} count={0} />
                        </div>
                    </Link>
                    <Link to="/cabinet/tty">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon={["far", "file-archive"]} className="action-icon"/> TTY
                            <Badge style={{marginLeft: 10}} count={6} />
                        </div>
                    </Link>
                    <Link to="/cabinet/free-template">
                        <div className="action-bloks">
                            <FontAwesomeIcon icon="file-invoice-dollar"  className="action-icon"/> Erkin hujjat
                            <Badge style={{marginLeft: 10}} count={0} />
                        </div>
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default withRouter(RightSidebar);
