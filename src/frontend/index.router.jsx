import React from 'react'
import { connect } from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import Home from './home/home.component'
import Login from '../pages/auth/login/login.component'
import { selectCurrentUser } from '../redux/user/user.selector'
import ChooseCompany from './choose_company/choose-company.component'
import {Col} from "antd";

const FrontIndexRouter = ({ match, user }) => {
    console.log("match",match)
    // let {url}=match;
    return (
        <div>
            <Route render={() => <Redirect to={`/home/choosecompany`} />}></Route>
            <Route exact path={`/home`} component={ Home } />
            <Route
                exact={true}
                path={`/home/choosecompany`}
                component={ChooseCompany}
            />
            {/*<Route */}
            {/*    exact */}
            {/*    path={`${match.path}/login`} */}
            {/*    component={ Login } */}
            {/*    />*/}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
})

export default connect(mapStateToProps)(FrontIndexRouter)
