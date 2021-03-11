import React from 'react';
import { Tabs } from 'antd';
import AccountForm from '../account-form/account-form.component';
import UserProducts from '../user-products/user-products.component';
import PasswordChange from '../password-change/password-change.component';

const { TabPane } = Tabs

const ProfileComponent = ()=>{

    const handleChange = val=>{
        console.log(val)
    }

    return <div className="factura-data-sheet-container" style={{ margin: 15 }}>
        <Tabs onChange={handleChange} type="card">
            <TabPane tab="Kompaniya ma'lumotlari" key="1">
                <AccountForm />
            </TabPane>
            <TabPane tab="Parol o'zgartirish" key="2">
                <PasswordChange />
            </TabPane>
            <TabPane tab="Maxsulotlarim" key="3">
                <UserProducts />
            </TabPane>
        </Tabs>
    </div>
}

export default ProfileComponent;