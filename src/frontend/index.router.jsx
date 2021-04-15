import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import Home from './home/home.component'
import Login from './login/login.component'
import { selectCurrentUser } from '../redux/user/user.selector'
import ChooseCompany from './choose_company/choose-company.component'

const FrontIndexRouter = ({ match, user }) => {
    console.log(user)
    return (
        <div>
            <Route exact path={`${match.path}`} component={ Home } />
            {/* <Route exact path={`${match.path}/login`} component={ Login } /> */}
            <Route
                exact={true}
                path={`${match.path}/choosecompany`}
                component={ChooseCompany}
            />
            <Route 
                exact 
                path={`${match.path}/login`} 
                component={ Login } 
                />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
})

export default connect(mapStateToProps)(FrontIndexRouter)
