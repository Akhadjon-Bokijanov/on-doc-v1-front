import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../common/home/home.component';
import FacturaCreateForm from './create/create.component'
import FacturaView from "./view/view.component";

const FacturaIndex = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} component={HomePage} />
            <Route exact path={`${match.path}/create`} component={FacturaCreateForm} />
            <Route exact path={`${match.path}/view/:facturaId`} component={FacturaView} />
            <Route exact path={`${match.path}/edit/:facturaId`} component={FacturaCreateForm} />

        </div>
    )
}

export default FacturaIndex
