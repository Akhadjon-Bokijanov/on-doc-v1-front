import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { API_HOST } from '../../../env';

const TTYView = ({ match, user }) => {

    const {ttyId} = match.params;
   

    return (
        <div style={{margin: 15, padding: 20}}>
            <embed 
            width="100%"
            height="600px"
            src={`${API_HOST}/api/v1/ttys/get-pdf/${ttyId}/${user.auth_key}/${user.tin}`} 
            type="application/pdf" />
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(TTYView)
