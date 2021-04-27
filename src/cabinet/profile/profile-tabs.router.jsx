import React from 'react'
import AccountForm from '../account-form/account-form.component';
import UserProducts from '../user-products/user-products.component';
import PasswordChange from '../password-change/password-change.component';
import { Route } from 'react-router';

const ProfileTabsRouter = ({ match }) => {
    return (
        <div>
            <Route path={match.path} exact component={AccountForm} />
            <Route path={`${match.path}/tab-2`} component={UserProducts} exact/>
        </div>
    )
}

export default ProfileTabsRouter
