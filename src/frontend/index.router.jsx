import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import Home from './home/home.component'
import Login from './login/login.component'
import { selectCurrentUser } from '../redux/user/user.selector'

const FrontIndexRouter = ({ match, user }) => {
    console.log(user)
    return (
        <div>
            <Route exact path={`${match.path}`} component={ Home } />
            {/* <Route exact path={`${match.path}/login`} component={ Login } /> */}
            <Route 
                exact 
                path={`${match.path}/login`} 
                render={()=>user ? < Redirect to ="/cabinet" /> : <Login />} 
                />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
})

export default connect(mapStateToProps)(FrontIndexRouter)
