import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../common/home/home.component';
import ActForm from '../act/create/create.component';
import ActView from '../act/view/view.component';

const ActIndexRouter = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc="act" />} />
            <Route exact path={`${match.path}/create`} component={ ActForm } />
            <Route exact path={`${match.path}/edit/:actId`} component={ ActForm } />
            <Route exact path={`${match.path}/view/:actId`} component={ ActView } />
        </div>
    )
}

export default ActIndexRouter
