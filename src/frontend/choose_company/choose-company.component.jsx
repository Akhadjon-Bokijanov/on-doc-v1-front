import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectUserCompanies } from '../../redux/user/user.selector';
import './choose-company.style.scss';

const ChooseCompany = ({ history, companies }) => {

    return (<div className="choose-company-main-container">
        <div className="choose-company-sub-container">
            <Button
                onClick={() => { history.goBack() }}
                type="primary"

                icon={<FontAwesomeIcon
                    style={{ marginRight: 10 }}
                    icon="arrow-circle-left" />}>
                Back
            </Button>
            <h2 style={{ textAlign: "center" }}>Выберите предприятие</h2>
            <div className="company-card-con">
                {
                    companies.map(comp => <div onClick={() => history.push("/cabinet")} className="company-card">
                        <div className="company-name">
                            {comp.name}
                        </div>

                        <div className="company-text">
                            <span
                                className="company-tin"
                                style={{ margin: 0, padding: 0 }}
                            >{comp.tin}</span>
                            <div>STIR</div>
                        </div>

                    </div>)
                }
                
            </div>

        </div>
    </div>)
}

const mapStateToProps = createStructuredSelector({
    companies: selectUserCompanies
})

export default connect(mapStateToProps)(withRouter(ChooseCompany));