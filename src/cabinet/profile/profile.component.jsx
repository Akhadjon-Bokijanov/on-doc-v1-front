import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from 'react-router';
import ProfileTabs from './profile-tabs.component';
import ProfileTabsRouter from './profile-tabs.router';

const ProfileComponent = ({ match, location })=>{

    const { t } = useTranslation()


    return <div style={{margin: 32}}>
        <h3 style={{fontSize: 32, fontWeight:'bold'}}>{t("Sozlamalar")}</h3>
        <ProfileTabs/>
        <div className="">
            <div style={{paddingTop: 16}}>
                <Route match={`${match.path}`} component={ProfileTabsRouter}/>
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