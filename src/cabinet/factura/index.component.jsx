import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import HomePage from '../common/home/home.component';
import CreateExcelType from './create/create-excel-type.component';
import FacturaCreateForm from './create/create.component'
import FacturaView from "./view/view.component";

const FacturaIndex = ({ match, user }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc={'factura'} addParams={[
                {
                    name: "tin",
                    value: user.tin ?? user.username
                }
            ]} />} />
            <Route exact path={`${match.path}/excel-type-create`} component={CreateExcelType} />
            <Route exact path={`${match.path}/create`} component={FacturaCreateForm} />
            <Route exact path={`${match.path}/view/:facturaId/:status`} component={FacturaView} />
            <Route exact path={`${match.path}/edit/:facturaId`} component={FacturaCreateForm} />
            <Route exact path={`${match.path}/duplicate/:duplicateId`} component={FacturaCreateForm} />

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(FacturaIndex)
