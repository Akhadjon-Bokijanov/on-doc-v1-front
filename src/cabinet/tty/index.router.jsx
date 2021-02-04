import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../common/home/home.component'
import TTYForm from '../tty/create/create.component';

const TTYIndexRouter = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc="tty" />} />
            <Route exact path={`${match.path}/create`} component={ TTYForm } />
            <Route exact path={`${match.path}/edit/:ttyId`} component={ TTYForm } />
        </div>
    )
}

export default TTYIndexRouter
