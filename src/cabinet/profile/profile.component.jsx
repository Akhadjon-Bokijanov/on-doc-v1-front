import React, { useState } from 'react';
import { Tabs } from 'antd';
import AccountForm from '../account-form/account-form.component';
import UserProducts from '../user-products/user-products.component';
import PasswordChange from '../password-change/password-change.component';
import { useTranslation } from 'react-i18next';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import ProfileTabs from './profile-tabs.component';

const { TabPane } = Tabs

const ProfileComponent = ({ match, location })=>{

    const { t } = useTranslation()

    const handleChange = val=>{
        console.log(val)
    }


    return <div style={{ margin: 15 }}>
        <h3>{t("Sozlamalar")}</h3>
        <ProfileTabs />        
    <div className="factura-data-sheet-container" >
        <div style={{ paddingTop: 15 }}>
            <Route match={`/cabinet/settings`} component={AccountForm} exact />
            
        </div>
        {/* <Tabs onChange={handleChange} type="card">
            <TabPane tab={t("Kompaniya ma'lumotlari")} key="1">
                <AccountForm />
            </TabPane>
            <TabPane tab={t("Parol o'zgartirish")} key="2">
                <PasswordChange />
            </TabPane>
            <TabPane tab={t("Maxsulotlarim")} key="3">
                <UserProducts />
            </TabPane>
        </Tabs> */}
    </div>
    </div>
}

export default ProfileComponent;