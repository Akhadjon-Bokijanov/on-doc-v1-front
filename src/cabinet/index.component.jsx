import { Col, Row } from 'antd';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import FacturaIndex from './factura/index.component';
import RightSidebar from './right-sidebar/right-sidebar.component';
import CabinetHome from './home/home.component';
import EmpowermentIndex from './empowerment/index.component';
import ActIndexRouter from './act/index.router';
import ContractIndexRouter from './contract/index.router';
import TTYIndexRouter from './tty/index.router';
import './create.style.scss';
import Notifications from './notifications/notifications.component';
import ProfileComponent from './profile/profile.component';
import CabinetHeader from './cabinet-header/CabinetHeader';

const CabinetIndex = ({ match }) => {
    const {url} = match
    return (
        <div>
            <Row justify="space-around">
               <Col md={5} lg={4}>
                    <RightSidebar />
               </Col>
               <Col md={19} lg={20}>
                    {/* <Route exact path={url} component={ CabinetHome } /> */}

                    <CabinetHeader/>
                    <Route  exact path={match.path} component={ CabinetHome } />

                    <Route path={`${url}/factura`} component={ FacturaIndex } />

                    <Route path={`${url}/empowerment`} component={ EmpowermentIndex } />

                    <Route path={`${url}/act`} component={ ActIndexRouter } />

                    <Route path={`${url}/contract`} component={ ContractIndexRouter } />

                    <Route path={`${url}/tty`} component={ TTYIndexRouter } />

                    <Route path={`${url}/notifications`} component={ Notifications } />

                    <Route path={`${url}/settings`} component={ ProfileComponent } />
               </Col>
            </Row>
        </div>
    );
};

export default withRouter(CabinetIndex);