import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './cabinet-header.style.scss';

const CabinetHeader = ({ user }) => {
    return (
        <div className="cabinet-header-main-con">
            <div className="ch-sub-container">
                <div className="ch-user-info-con-1">
                    <div><strong>{user.name}</strong></div>
                    <div>{user.tin}</div>
                </div>
                <div className="ch-user-info-con-2">
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(CabinetHeader)
