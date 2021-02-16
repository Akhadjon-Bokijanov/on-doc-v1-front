import { Col, Row } from 'antd'
import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import HomePage from '../cabinet/common/home/home.component'
import RightSidebar from '../cabinet/right-sidebar/right-sidebar.component'
import NotificationForm from './notification/form.component'

const AdminIndexRouter = ({ match }) => {
    return (
        <div>
            <Row justify="space-around">
                <Col md={5} lg={4}>
                    <RightSidebar admin />
                </Col>
                <Col md={19} lg={20}>
                    <Route 
                        exact 
                        path={`${match.path}/notification`} 
                        render={()=><HomePage 
                        doc="notification"
                        hideTabs />} />
                    <Route exact path={`${match.path}/notification/create`} component={ NotificationForm } />
                    <Route exact path={`${match.path}/notification/edit/:notificationId`} component={ NotificationForm } />
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(AdminIndexRouter)
