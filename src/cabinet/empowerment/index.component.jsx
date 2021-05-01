import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../common/home/home.component';
import EmpowermentForm from './create/create.component';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {connect} from "react-redux";
import EmpView from "./view/view.component";
import FacturaCreateForm from "../factura/create/create.component";

const EmpowermentIndex = ({ match, user }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc="empowerment" addParams={[
                {
                    name: "tin",
                    value: user.tin ?? user.username
                }
            ]}/>} />
            <Route exact path={`${match.path}/create`} component={EmpowermentForm} />
            <Route exact path={`${match.path}/edit/:empowermentId`} component={EmpowermentForm} />
            <Route exact path={`${match.path}/view/:empId/:status`} component={EmpView} />
            <Route exact path={`${match.path}/duplicate/:duplicateId`} component={EmpowermentForm} />

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(EmpowermentIndex)
