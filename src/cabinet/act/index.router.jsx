import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../common/home/home.component';
import ActForm from '../act/create/create.component';
import ActView from '../act/view/view.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';

const ActIndexRouter = ({ match, user }) => {
    return (
        <div>
            <Route exact path={`${match.path}`} render={()=><HomePage doc="act" 
                addParams={[
                    {
                        name: "tin",
                        value: user.tin ?? user.username
                    }
                ]}
            />} />
            <Route exact path={`${match.path}/create`} component={ ActForm } />
            <Route exact path={`${match.path}/edit/:actId`} component={ ActForm } />
            <Route exact path={`${match.path}/view/:actId/:status`} component={ ActView } />
            <Route exact path={`${match.path}/duplicate/:duplicateId`} component={ActForm}/>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(ActIndexRouter)
