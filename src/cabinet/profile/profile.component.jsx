import React from 'react';
import { Tabs } from 'antd';
import AccountForm from '../account-form/account-form.component';
import UserProducts from '../user-products/user-products.component';
import PasswordChange from '../password-change/password-change.component';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs

const ProfileComponent = ()=>{

    const { t } = useTranslation()

    const handleChange = val=>{
        console.log(val)
    }

    return <div className="factura-data-sheet-container" style={{ margin: 15 }}>
        <Tabs onChange={handleChange} type="card">
            <TabPane tab={t("Kompaniya ma'lumotlari")} key="1">
                <AccountForm />
            </TabPane>
            <TabPane tab={t("Parol o'zgartirish")} key="2">
                <PasswordChange />
            </TabPane>
            <TabPane tab={t("Maxsulotlarim")} key="3">
                <UserProducts />
            </TabPane>
        </Tabs>
    </div>
}

export default ProfileComponent;