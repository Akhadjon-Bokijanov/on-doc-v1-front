import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../common/home/home.component';
import ConractCreateForm from '../contract/create/create.component';
import ContractView from '../contract/view/view.component';

const ContractIndexRouter = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={() => <HomePage doc="contract" />} />
            <Route exact path={`${match.path}/create`} component={ConractCreateForm} />
            <Route exact path={`${match.path}/edit/:contractId`} component={ConractCreateForm} />
            <Route exact path={`${match.path}/view/:contractId`} component={ContractView} />
        </div>
    )
}

export default ContractIndexRouter
