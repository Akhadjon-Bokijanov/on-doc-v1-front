import React from 'react'
import { Route } from 'react-router-dom'
import FacturaCreateForm from './create/create.component'

const FacturaIndex = ({ match }) => {
    return (
        <div>
            <Route exact path={`${match.path}/create`} component={FacturaCreateForm} />
        </div>
    )
}

export default FacturaIndex
