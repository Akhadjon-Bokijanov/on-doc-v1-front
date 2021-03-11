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

const CabinetIndex = ({ match }) => {
    return (
        <div>
            <Row justify="space-around">
               <Col md={5} lg={4}>
                    <RightSidebar />
               </Col>
               <Col md={19} lg={20}>
                    <Route exact path={match.path} component={ CabinetHome } />

                    <Route path={`${match.path}/factura`} component={ FacturaIndex } />

                    <Route path={`${match.path}/empowerment`} component={ EmpowermentIndex } />

                    <Route path={`${match.path}/act`} component={ ActIndexRouter } />

                    <Route path={`${match.path}/contract`} component={ ContractIndexRouter } />

                    <Route path={`${match.path}/tty`} component={ TTYIndexRouter } />

                    <Route path={`${match.path}/notifications`} component={ Notifications } />

                    <Route path={`${match.path}/profile`} component={ ProfileComponent } />
               </Col>
            </Row>
        </div>
    );
};

export default withRouter(CabinetIndex);