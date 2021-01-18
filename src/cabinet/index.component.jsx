import { Col, Row } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/header/header.component';
import FacturaIndex from './factura/index.component';
import RightSidebar from './right-sidebar/right-sidebar.component';

const CabinetIndex = ({ match }) => {
    return (
        <div>
            <Header position="cabinet" />
            <Row justify="space-around">
               <Col md={5} lg={4}>
                    <RightSidebar />
               </Col>
               <Col md={19} lg={20}>
                    <Route path={`${match.path}/factura`} component={FacturaIndex} />
               </Col>
            </Row>
        </div>
    );
};

export default CabinetIndex;