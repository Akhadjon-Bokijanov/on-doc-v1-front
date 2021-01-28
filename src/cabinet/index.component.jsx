import { Col, Row } from 'antd';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from '../components/header/header.component';
import FacturaIndex from './factura/index.component';
import RightSidebar from './right-sidebar/right-sidebar.component';
import CabinetHome from './home/home.component';
import EmpowermentIndex from './empowerment/index.component';
import ActIndexRouter from './act/index.router';
import ContractIndexRouter from './contract/index.router';

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
               </Col>
            </Row>
        </div>
    );
};

export default withRouter(CabinetIndex);