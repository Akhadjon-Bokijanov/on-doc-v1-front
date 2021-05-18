import React from 'react'
import AccountForm from '../settings/account-form/account-form.component';
import UserProducts from '../settings/user-products/user-products.component';
import PasswordChange from '../password-change/password-change.component';
import { Route } from 'react-router';
import Account from "../settings/accoount";
import Notify from "../settings/companyInfo";
import CompInfo from "../settings/companyInfo";
import DocFormat from "../settings/documentFormat";

const ProfileTabsRouter = ({ match }) => {
    return (
        <div>
            <Route path={`${match.path}`} exact component={Account} />
            {/*<Route path={match.path} exact component={AccountForm} />*/}
            <Route path={`${match.path}/company_info`} exact component={CompInfo} />
            <Route path={`${match.path}/notify`} component={UserProducts} exact/>
            <Route path={`${match.path}/docFormat`} component={DocFormat} exact/>
        </div>
    )
}

export default ProfileTabsRouter
