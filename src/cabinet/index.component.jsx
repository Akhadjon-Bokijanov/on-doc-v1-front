import React from 'react';
import { Route } from 'react-router-dom';
import FacturaCreateForm from './factura/create/create.component';

const CabinetIndex = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}/factura/create`} component={FacturaCreateForm} />
        </div>
    );
};

export default CabinetIndex;