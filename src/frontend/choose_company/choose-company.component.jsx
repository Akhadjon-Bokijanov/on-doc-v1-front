import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setUserCompanies } from '../../redux/user/user.action';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './choose-company.style.scss';

const ChooseCompany = ({ history, user, setUserComps }) => {


    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);

    useEffect(()=>{
        setLoading(true)
        axios({
            url: `info/director-company/?tin=${user.username}`,
            method: 'get',
        }).then(res=>{
            console.log(res);
            if(res.data.success){
                setCompanies(res.data.data)
                setUserComps(res.data.data)
            }else{
                message.error("Serverda xatolik!");
            }
            setLoading(false)
        }).catch(err=>{
            console.log(err);
            message.error("Serverda xatolik!");
            setLoading(false)
        })
    }, [])


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
            <h2 style={{ textAlign: "center" }}>{t("Korxona tanglang")}</h2>
            <div className="company-card-con">
                <List 
                    grid={{ 
                        gutter: 8,
                        xs: 1,
                        md: 2,
                        lg: 3
                    }}
                    loading={loading}
                    dataSource={companies}
                    renderItem={comp => <div onClick={() => history.push("/cabinet")} className="company-card">
                        <div className="company-name">
                            {comp.company_name}
                        </div>

                        <div className="company-text">
                            <span
                                className="company-tin"
                                style={{ margin: 0, padding: 0 }}
                            >{comp.company_tin}</span>
                            <div>{t("STIR")}</div>
                        </div>

                    </div>}
                />
               
                
            </div>

        </div>
    </div>)
}

const mapDispatchToProps = dispatch=>({
    setUserComps: data => dispatch(setUserCompanies(data))
})

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChooseCompany));