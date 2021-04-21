import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setUser, setUserCompanies } from '../../redux/user/user.action';
import { selectKeyUser, selectUserCompanies } from '../../redux/user/user.selector';
import './choose-company.style.scss';

const ChooseCompany = ({ setCurrentUser, history, user, setUserComps, companies }) => {

    const [loading, setLoading] = useState(false);
    const setChoosenCompany = async (tin, push_to_cabinet=true)=>{
        await axios({
            url: `user/get-company-data?tin=${tin}`,
            method: 'get'
        }).then(res => {
            setLoading(false)
            setCurrentUser(res.data.company)
            if(push_to_cabinet){
                    history.push("/cabinet")
            }

        }).catch(e => {

            console.log(e)

        })
    }

    const { t } = useTranslation();
    

    const [chosen, setChosen] = useState(null);

    useEffect(()=>{

        if(chosen){
            setChoosenCompany(chosen)
        }

    }, [chosen]);

    useEffect(()=>{
        setLoading(true)
        console.log("user,",user)
        axios({
            url: `info/director-company/?tin=${user?.username}`,
            method: 'get',
        }).then(res=>{
            console.log(res);
            if(res.data.success){
                setUserComps(res.data.data)
                setLoading(false)
                if(res.data?.data?.length==1){
                    setChoosenCompany(res.data.data[0].company_tin)
                }
            }else{
                message.error("Serverda xatolik!");
                setLoading(false)
            }
            
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
                {t("Back")}
            </Button>
            <h2 style={{ textAlign: "center" }}>{t("Korxona tanlang")}</h2>
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
                    renderItem={comp => <div onClick={() => setChosen(comp.company_tin)}
                    className="company-card">
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
    setUserComps: data => dispatch(setUserCompanies(data)),
    setCurrentUser: data => dispatch(setUser(data)),
})

const mapStateToProps = createStructuredSelector({
    user: selectKeyUser,
    companies: selectUserCompanies
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChooseCompany));