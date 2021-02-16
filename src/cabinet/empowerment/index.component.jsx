import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../common/home/home.component';
import EmpowermentForm from './create/create.component';

const EmpowermentIndex = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc="empowerment" />} />
            <Route exact path={`${match.path}/create`} component={EmpowermentForm} />
            <Route exact path={`${match.path}/edit/:empowermentId`} component={EmpowermentForm} />
            <Route exact path={`${match.path}/view/:empId`} component={EmpowermentForm} />
        </div>
    )
}

export default EmpowermentIndex
